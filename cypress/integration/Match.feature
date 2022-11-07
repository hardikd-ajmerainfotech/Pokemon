Feature: Match Functionality

    Background:
        Given User should be navigate to the "match" Page
         
    Scenario: User should be able to see the matchlist on the page
        When User should on the MatchPage
        Then User able to see MatchList.

    Scenario: User should be successfully added match in MatchList.
        When User should click on the add match button and fill required fields.
        Then Match should be added successsfully in MatchList.
    
    Scenario: User should be unable add match in MatchList.
        When User should click on the add match button and don't fill required fields.
        Then Match should not be add in MatchList.
    Scenario: User should not be able to delete the match from the matchlist.
        When User should click on delete button and disagree button
        Then Match should not be deleted

    Scenario: User should be able to delete the match from the matchlist.
        When User should click on delete button and agree button
        Then Match should be deleted successfully
