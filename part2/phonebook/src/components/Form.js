import { Fragment } from "react"

const Form = ({prop, handler, label}) => {
    return (
      <Fragment>
        <div>
          {label ? 'name:' : 'number:'} <input value={prop} onChange={handler} />
        </div>
      </Fragment>
    )  
}

export default Form