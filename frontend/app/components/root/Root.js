import React, { Component } from 'react'
import './Root.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Button extends Component {
  state = {
    counter: 1
  }
  
  handleClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1 
    }))
  }


  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.counter}
      </button>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <hr />

      <div className="doctors-and-patients">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </div>
  </Router>
)

const Home = ({ match }) => (
  <div>
    <h2>Patients</h2>

    <Route path={`${match.url}/:userId`} component={EditDetails} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)

const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
)

const EditDetails = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default App