import React, {
  Component
} from 'react'
import _ from 'lodash'

class UsersGridContainer extends Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      patients: []
    }

    if (this.props.patients) {
      this.state.patients = this.props.patients
    }

    this.selectUser = this.selectUser.bind(this)
    this.createGrid = this.createGrid.bind(this)

  }

  selectUser(e) {
    let value = e.target.value
    let name = e.target.name

    console.log(value, name)
  }

  createGrid() {
    const grid = []

    _.each(this.state.patients, (patient) => {
      grid.push(<div> patient.id </div>)
    })


  }

  render() {
    return (
      <div>
        <h2>Patients</h2>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {this.createGrid()}
        </div>
      </div>
    )
  }
}

export default UsersGridContainer
