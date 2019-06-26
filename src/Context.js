import React, { Component, createContext } from 'react'
const joi = require('@hapi/joi');
export const userContext = createContext();

const schema = {
    email: joi.string().min(7).required().email(),
    password: joi.string().min(7).required()
}

export default class userContextProvider extends Component {
    state = {
        userInfo: {
            email:'',
            password:'',
            id: Date.now
        },
        errorMessage: ""
    }
    handleInput = (e) => this.setState({userInfo: {...this.state.userInfo, [e.target.name]: e.target.value}});

    validateUser = (obj) => {
        return joi.validate(obj, schema);
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // extract the userinfo part that excludes id prop from this.state.userInfo
        const { userInfo:{ id, ...userValidationInfo } } = this.state
         const {error} = this.validateUser(userValidationInfo)
         if (!!error) this.setState({errorMessage: error})
        
    }
    render() {
        return (
            <userContext.Provider value={{...this.state.userInfo, 
                                        ...this.state.errorMessage, 
                                        handleInput: this.handleInput,
                                        handleSubmit: this.handleSubmit}}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}
