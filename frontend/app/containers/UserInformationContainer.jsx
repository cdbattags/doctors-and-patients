import React, { Component } from 'react'

import _ from 'lodash'
import axios from 'axios'

import Input from '../components/Input'
import Button from '../components/Button'

class UserInformationContainer extends Component {
    
    constructor(props) {
        super(props)

        const state = {
            user: {
                name: "",
                age: "",
                mailingAddress: "",
                phone: "",
                email: "",
                updatedAt: ""
            },
            message: {
                color: '',
                text: ''
            }
        }

        if (this.props.user) {
            state.user = this.props.user
        }

        this.state = state

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        
        // if the user is different then change this
        if (
            nextProps.user &&
            !(nextProps.user.id === prevState.user.id)
        ) {
            return {
                user: nextProps.user
            }
        }

        return null
    }

    handleInput(e) {
        let value = e.target.value
        let name = e.target.name
        
        this.setState(
            (prevState) => ({
                user: {
                    ...prevState.user,
                    [name]: value
                }
            })
        )
    }

    handleFormSubmit(e) {
        e.preventDefault()

        const userData = this.state.user

        axios(
            `/api/users/${this.state.user.id}`,
            {
                method: "POST",
                data: JSON.stringify(userData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
            this.setState({
                message: {
                    color: 'green',
                    text: 'successfully updated user'
                }
            })
        }).catch((error) => {
            this.setState({
                message: {
                    color: 'red',
                    text: error
                }
            })

            console.log(error)
        })
    }

    render() {        
        if (!this.state.user.id) {
            return (<div>nothing here</div>)
        } else {
            return (
                <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                    <Input
                        inputType={"text"}
                        name={"name"}
                        title={"Full Name"}
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
                        handleChange={this.handleInput}
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
                        title={"Update"}
                        style={buttonStyle}
                    />

                    <div style={{color: this.state.message.color}}>{this.state.message.text}</div>

                </form>
            )
        }
        
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
}

export default UserInformationContainer
