import React, { useState, useEffect } from 'react'
import axios from 'axios'




const Numbers = ({ person }) =>{
  return (
  <div>
    <h2>Numbers</h2>
      <div>
        {person.map(name => <p>{name.name} {name.number}</p>)}
      </div>
  </div>
  )
}

const Filter = ({ value, onChange }) => {
  return(
  <>
  <form  className ="contact-form" >
  <input value={value} onChange={onChange}/>
  </form>
  </>
  )
}

const Form = ({onClick, personName, number, numberChange, onChange}) => {
  return(
    <div>
      <form  className ="contact-form" onSubmit={onClick}>
        <div>
          <p>Name</p>
           <input value={personName} onChange={onChange} />
        </div>
        <div>
        <p>Number</p>
        <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}




const App = () => {


  
  
  const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filterValue, setNewFilter ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const peopleToShow = showAll ? persons : persons.filter(person => person.name.includes(filterValue));

  
  const addPerson = (event) =>{
  event.preventDefault()
    let newPerson = {
      name:newName,
      number:newNumber
    }

  let test = persons.some(e => e.name === newName);
  test ? alert( `${newName} already exists `) : setPersons(persons.concat(newPerson))
  
  setNewName("")
  setNewNumber("")
  }

  const changeValue = (event) =>{
    setNewName(event.target.value)
  }

  const changeNumberValue = (event) =>{
    setNewNumber(event.target.value)
  }


  const filterSearch = (event) =>{
    //console.log(persons.filter(person => person.name === filterValue))
    setNewFilter(event.target.value)
    setShowAll(false)

    
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'people')

  

  

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={filterSearch}/>
      <Form onClick = {addPerson} 
            personName ={newName} 
            onChange={changeValue}
            number = {newNumber}
            numberChange = {changeNumberValue} />
      <Numbers person = {peopleToShow}/> 
    </div>
  )
}

export default App