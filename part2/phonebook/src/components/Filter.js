const Filter = ({search, handler}) => {
    return (
      <>
        filter shown with: <input value={search} onChange={handler}/>
      </>
    )
}

export default Filter