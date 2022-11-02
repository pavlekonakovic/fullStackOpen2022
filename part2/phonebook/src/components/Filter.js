const Filter = ({handleFilterChange, filter}) => 
  <div>
    <form>
      filter shown with <input onChange={handleFilterChange} value={filter} />
    </form>
  </div>

export default Filter