import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  render() {

    return (
      <div className="Form">
        <form>
          {this.props.children}
        </form>
      </div>
    )
  }
}

export default Form
