const {response} = require('express')

function userExistsResponse() {
    return response.status(400).json({
        message: "user already exists",
        success: false
    })
}

function userSignedUpResponse() {
    return response.status(201).json({
        message: "user signed up",
        success: true
    })
}

function userSignedOutResponse() {
    return response.json({
        success: true,
        message: 'signed out'
    })
}

function userNotFoundResponse() {
    return response.status(404).json({
        message: "user not found",
    })
}

function mustSignInResponse() {
    return response.status(400).json({
        success: false,
        message: "sign in please!"
    })
}

function invalidCredentialsResponse() {
    return response.status(401).json({
        success: false,
        message: 'Username or password incorrect'
    })
}

module.exports = {
    userSignedUpResponse,
    userExistsResponse,
    userNotFoundResponse,
    userSignedOutResponse,
    mustSignInResponse,
    invalidCredentialsResponse,
}
