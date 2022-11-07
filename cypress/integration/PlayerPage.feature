Feature: PlayerPage Functionality
    Background:
        Given User should be navigate to the "player" Page

    Scenario: User should be able to see all player list.
        When User should visit the PlayerPage.
        Then User able to see PlayerList.

    Scenario: User should be successfully added player in playerList.
        When User should click on the add player button and fill required fields.
        Then Player should be added successsfully in playerList.    
    
    Scenario: User should be unable to add player in playerlist
        When User should click on the add player button and don't fill require fields
        Then Player should not be add in PlayerList
    
    Scenario: User should be able to delete the player from the playerlist.
        When User should click on delete button and agree button
        Then Player should be deleted successfully

    Scenario: User should not be able to delete the player from the playerlist.
        When User should click on delete button and disagree button
        Then Player should not be deleted


