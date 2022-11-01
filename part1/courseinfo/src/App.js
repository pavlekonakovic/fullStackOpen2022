const Header = ({ title }) => {
  return(
    <h1>{title}</h1>
  )
}

const Part = ({ part }) => {
  return(
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ content }) => {
  return(
    <>
      <Part part={content[0]} />
      <Part part={content[1]} />
      <Part part={content[2]} />
    </>
  )
}

const Total = ({ count }) => {
  return(
    <p>Number of exercises {count[0].exercises + count[1].exercises + count[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }
  

  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total count={course.parts}/>
    </div>
  )
}

export default App