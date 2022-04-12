
import React, {useState} from 'react'

const Button = (props) => (
  <button onClick={props.handler}>{props.text}</button>
)

const StatisticLine = (props) => <tr><td><h4>{props.text}: {parseInt(props.value)}</h4></td></tr>

const Statistics = (props) => {
  if (props.total === 0) {
    return <tr><td><h4>No feedback given</h4></td></tr>
  }
  return (
      <React.Fragment>
        <StatisticLine value={props.feedback.good} text='Good'/>
        <StatisticLine value={props.feedback.neutral} text='Neutral'/>
        <StatisticLine value={props.feedback.bad} text='Bad'/>
        <StatisticLine value={props.total} text='All'/>
        <StatisticLine value={(props.total/3)} text='Average'/>
        <StatisticLine value={props.feedback.good/(props.total*0.01)} text='Positive'/>    
      </React.Fragment>
  )
}

function App() {
  const [feedback, setFeedBack] = useState({good: 0, neutral: 0, bad: 0})
  const [total, setTotal] = useState(0)

  const goodFeedBackHandler = () => {
    setFeedBack({...feedback, good: feedback.good + 1})
    setTotal(total + 1)
    console.log('The value of good is', feedback.good + 1)
  }

  const neutralFeedBackHandler = () => {
    setFeedBack({...feedback, neutral: feedback.neutral + 1})
    setTotal(total + 1)
  }
  
  const badFeedBackHandler = () => {
    setFeedBack({...feedback, bad: feedback.bad + 1})
    setTotal(total + 1)
  }

  return (
  <React.Fragment>
    <table cellSpacing='0' cellPadding='0'>
    <thead>
      <tr>
        <th> 
          <h2>Give Feedback</h2>
        </th>
      </tr>
      <tr>
        <td>
          <Button handler={goodFeedBackHandler} text='Good'/>
          <Button handler={neutralFeedBackHandler} text='Neutral'/>
          <Button handler={badFeedBackHandler} text='Bad'/>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td> 
          <h2>Statistics</h2>
        </td>
      </tr>
        <Statistics feedback={feedback} total={total}/>        
    </tbody>
    </table>
  </React.Fragment>
  )
}

export default App;
