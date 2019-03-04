import React, { Component } from "react"

import Input from "../components/Input"
import Button from "../components/Button"

class UserInformationContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        if (this.props.user) {
            this.state.user = {
                ...this.props.user
            }
        } else {
            this.state.user = {
                name: "",
                age: "",
                mailingAddress: "",
                phone: "",
                email: "",
                updatedAt: ""
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
                user: {
                    ...prevState.user,
                    [name]: value
                }
            }),
            () => console.log(this.state.user)
        )
    }

    handleFormSubmit(e) {
        e.preventDefault()
        let userData = this.state.user

        fetch("http://example.com", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data)
            })
        })
    }

    render() {
        return (
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>
                
                <Input
                    inputType={"text"}
                    title={"Full Name"}
                    name={"name"}
                    value={this.state.user.name}
                    placeholder={"Enter your name"}
                    handleChange={this.handleInput}
                />

                <Input
                    inputType={"number"}
                    name={"age"}
                    title={"Age"}
                    value={this.state.user.age}
                    placeholder={"Enter your age"}
                    handleChange={this.handleAge}
                />

                <Input
                    inputType={"text"}
                    name={"address"}
                    title={"Address"}
                    value={this.state.user.mailingAddress}
                    placeholder={"Enter your mailing address"}
                    handleChange={this.handleInput}
                />

                <Input
                    inputType={"text"}
                    name={"phone"}
                    title={"Phone"}
                    value={this.state.user.phone}
                    placeholder={"Enter your phone number"}
                    handleChange={this.handleInput}
                />

                <Input
                    inputType={"text"}
                    name={"email"}
                    title={"Email"}
                    value={this.state.user.email}
                    placeholder={"Enter your email address"}
                    handleChange={this.handleInput}
                />

                <Input
                    inputType={"text"}
                    name={"updated"}
                    title={"Last Updated"}
                    value={this.state.user.updatedAt}
                    handleChange={this.handleInput}
                    readOnly={true}
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

export default UserInformationContainer
