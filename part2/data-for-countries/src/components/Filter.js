const Filter = ({value, handleChange}) =>
  <div>
    <form>
      search countries <input onChange={handleChange} value={value} />
    </form>
  </div>

export default Filter