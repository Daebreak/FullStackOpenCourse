const Filter = ({search, handler}) => {
    return (
      <>
        filter shown with: <input value={search} onChange={handler} id={'filter'}/>
      </>
    )
}

export default Filter