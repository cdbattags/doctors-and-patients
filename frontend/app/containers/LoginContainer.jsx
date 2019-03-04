import React, { Component } from 'react'
import axios from 'axios'

import Input from "../components/Input"
import Button from "../components/Button"

class LoginContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
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
            }),
            () => console.log(this.state[name])
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
        ).then(response => {
            console.log(response)
            localStorage.setItem('token', response.data)
            location.reload(true)
        }).catch(error => {
            console.log(error)
            this.state = {
                email: "",
                password: ""
            }
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
            </form>
        )
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
}

export default LoginContainer
