import React from "react"

const Header = (props) => <h1>{props.name}</h1>

const Parts = (props) => {
  return (
    <li>
      {props.name} {props.exercises}
    </li>
  )
}

const Course = ({parts}) => {
  return (
    <React.Fragment>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {parts.map(part => <Parts key={part.id} name={part.name} exercises={part.exercises}/>)}
      </ul>
    </React.Fragment>
  )
}

const Total = ({parts: [...exercises]}) => {
  return (
  <h3>
    Total of {exercises.reduce((total, sum) => total += sum.exercises, 0)} exercises
  </h3>
  )
}

export {Course, Header, Total}