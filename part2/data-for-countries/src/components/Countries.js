import Country from './Country'

const Countries = ({countries}) => {
  if(countries.length === 1) {
    return <Country country={countries[0]}/>
  } else if(countries.length <=10){
    return(
      <div>
        {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
      </div>
    )
  } else if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
}

export default Countries