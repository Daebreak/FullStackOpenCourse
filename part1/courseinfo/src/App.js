const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Content = (props) => (
  <div>
    <Part {...props.content.parts[0]}/>
    <Part {...props.content.parts[1]}/>
    <Part {...props.content.parts[2]}/>
  </div>
)

const Total = (props) => (
  <p>Number of exercises {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>

      <Content content={course}/>

      <Total total={course}/>
    </div>
  )
}

export default App