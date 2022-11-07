Feature: Register Functionality
    Background: 
        Given User navigate to the Register Page

    Scenario: User should be able to Register when typed right credentials
        When User input Right Register Credentials
        Then User should be Registerd

    Scenario: User should be able to see error when typed wrong credentials
        When User input Wrong Register Credentials
        Then User should not be Registered

    Scenario: User should be able to see all the Input fields for Register functionality
        When User register with empty input filled
        Then fill required field.