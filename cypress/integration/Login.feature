Feature: Login / SignIn Functionality
    I want to test Sign In functionality. That Includes SignIn success as well as SignIn Failure.

    Background:
        Given User navigate to the Login Page

    Scenario: User should be able to Log in when typed right credentials
        When User input Right Login Credentials
        Then User should be logged in

    Scenario: User should be able to see error when typed wrong credentials
        When User input Wrong Login Credentials
        Then User should not be logged in

    Scenario: User should not be able to Log in when typed wrong credentials
        When User Login With Empty Credentials
        Then Login error should be displayed