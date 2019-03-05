import React, { Component } from 'react'
import axios from 'axios'

import Input from "../components/Input"
import Button from "../components/Button"

class LoginContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: {
                color: '',
                text: ''
            }
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {
        let value = e.target.value
        let name = e.target.name
        
        this.setState(
            prevState => ({
                ...prevState,
                [name]: value
            })
        )
    }

    handleFormSubmit(e) {
        e.preventDefault()
        
        const loginData = {
            email: this.state.email,
            password: this.state.password
        }

        axios(
            "/api/login", 
            {
                method: "POST",
                data: JSON.stringify(loginData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
        .then(response => {
            localStorage.setItem('token', response.data)
            location.reload(true)
        })
        .catch(error => {
            this.setState(
                prevState => ({
                    message: {
                        color: 'red',
                        text: error.toString()
                    },
                    email: '',
                    password: ''
                })
            )
        })
    }

    render() {
        return (
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>
                <Input
                    inputType={"text"}
                    name={"email"}
                    title={"Email"}
                    value={this.state.email}
                    handleChange={this.handleInput}
                />

                <Input
                    inputType={"password"}
                    name={"password"}
                    title={"Password"}
                    value={this.state.password}
                    handleChange={this.handleInput}
                />

                <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                    style={buttonStyle}
                />

                <div style={{color: this.state.message.color}}>{this.state.message.text}</div>

            </form>
        )
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
}

export default LoginContainer
