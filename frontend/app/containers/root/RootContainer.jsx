import React, { Component } from 'react'

import './RootContainer.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'

import UsersGridContainer from '../users-grid-container/UsersGridContainer'
import LoginContainer from '../LoginContainer'
import UserInformationContainer from '../UserInformationContainer'

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      user: {
        patients: []
      }
    }

    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    if (this.token) {
      axios
        .get('api/me', {
          headers: {
            'Authorization': this.token
          }
        })
        .then((response) => {
          this.setState(
            prevState => ({
              ...prevState,
              user: response.data
            })
          )
        })
    }
  }

  render() {
    const isLoggedIn = this.token

    if (isLoggedIn) {
      return (
        <Router>
          <div>
            <div className="nav-container">
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/edit-self">Edit Yours</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>

            <hr />

            <div className="main-container">
              <Route exact path="/" render={() => { return <UsersGridContainer patients={this.state.user.patients}/> }} />
              <Route path="/edit-self" render={() => { return <UserInformationContainer user={this.state.user} /> }} />
              {/* logout here */}
            </div>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <Route exact path="/" component={LoginContainer} />
        </Router>
      )
    }
  }
}

export default App