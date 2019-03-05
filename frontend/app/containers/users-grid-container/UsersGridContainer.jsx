import React, {
  Component
} from 'react'
import _ from 'lodash'
import axios from 'axios'

import './UsersGridContainer.css'
import UserInformationContainer from '../UserInformationContainer';

class UsersGridContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      patients: [],
      selectedUser: null
    }

    if (this.props.patients) {
      this.state.patients = this.props.patients
    }

    this.selectUser = this.selectUser.bind(this)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      ...nextProps
    }
  }

  selectUser = (userId) => (e) => {
    e.preventDefault()

    axios
      .get(`/api/users/${userId}`)
      .then((response) => {        
        this.setState(
          (prevState) => ({
            ...prevState,
            selectedUser: response.data
          }),
          () => {}
        )

      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  render() {
    const patients = this.state.patients.map((patient) => {
      return (
        <a href="" key={patient.id} onClick={this.selectUser(patient.id)}>
          {patient.name}
        </a>
      )
    })
    
    return (
      <div>
        <h2>Patients</h2>
        <div className="users-container">
          
          <div className="left-half">
            {patients}
          </div>

          <div className="right-half">
            <UserInformationContainer user={this.state.selectedUser} />
          </div>

        </div>
      </div>
    )
  }
}

export default UsersGridContainer
