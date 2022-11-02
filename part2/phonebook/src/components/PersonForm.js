const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) =>
  <form onSubmit={addPerson}>
    <div>
      name: <input onChange={handleNameChange} value={newName}/>
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>   

export default PersonForm