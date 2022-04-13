import { Fragment } from "react"

const Display = ({props}) => {
    return (
      <Fragment>
      {props.map(prop =>
        <li style={{listStyleType:"none"}} key={prop.name}>{prop.name} {prop.number}</li>
      )}
      </Fragment>
    )
}

export default Display