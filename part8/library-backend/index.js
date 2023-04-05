require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/users')

console.log('connecting to ', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author && args.genre){
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author.id, genres: { $in: args.genre } }).populate('author')

        return books
        
      } else if(args.author){
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author.id }).populate('author')

        return books

      } else if(args.genre){
        const books = await Book.find({ genres: { $in: args.genre } }).populate('author')

        return books
      }

      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    } 
  },
  Author: {
    bookCount: async (root) => 
      await Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      const bookExists = await Book.findOne({ title: args.title })
      
      if(bookExists){
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title
        })
      }
      
      const newAuthor = await Author.findOne({ name: args.author })

      if(!newAuthor){
        const author = new Author({ name: args.author})

        try {
          await author.save()
          const book = new Book({ ...args, author:author._id })
          await book.save()
          return book
        } catch(error) {
          throw new UserInputError(error.message, { invalidArgs: args})
        }
      } else {
        const book = new Book({ ...args, author: newAuthor._id})

        try{
          await book.save()
        } catch(error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      if(!author) return null

      try{
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name }, { born: args.setBornTo }, { new: true }
        )

        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if( !user || args.password !== process.env.PASSWORD ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
