import { Fragment } from "react"

const Display = ({props, deletePerson}) => {
    return (
      <Fragment>
      {props.map(prop =>
        <li style={{listStyleType:"none"}} key={prop.name}>{prop.name} {prop.number} <button onClick={() => deletePerson(prop.id)}>delete</button></li>
      )}
      </Fragment>
    )
}

export default Display