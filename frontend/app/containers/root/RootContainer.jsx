import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'

import './RootContainer.css'

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
        .catch((error) => {
          console.log(error)
          this.token = ''
          localStorage.removeItem('token')
          window.location.assign('/')
        })
    }

    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()

    this.token = ''
    localStorage.removeItem('token')
    window.location.assign('/')

  }

  render() {
    const isLoggedIn = this.token

    if (isLoggedIn) {
      if (this.state.user.type === 'doctor') {
        if (this.state.user.patients.length > 0) {
          return (
            <Router>
              <div>
                <div className="nav-container">
                  <ul>
                    <li>
                      <a href="" onClick={this.logout}>Logout</a>
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
                  <Route exact path="/" render={() => { return <UsersGridContainer patients={this.state.user.patients} /> }} />
                  <Route path="/edit-self" render={() => { return <UserInformationContainer user={this.state.user} /> }} />
                </div>
              </div>
            </Router>
          )
        } else {
          return (<div style={{ padding: '10px' }}>loading, please wait</div>)
        }
      } else {
        return (
          <Router>
            <div>
              <div className="nav-container">
                <ul>
                  <li>
                    <a href="" onClick={this.logout}>Logout</a>
                  </li>
                </ul>
              </div>

              <hr />

              <div className="main-container">
                <Route exact path="/" render={() => { return <UserInformationContainer user={this.state.user} /> }} />
              </div>
            </div>
          </Router>      
        )
      }
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