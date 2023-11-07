# 11/7
    Goals:
        - fix randomization of tracks
        - fix auto-play glitch on mobile
        - firebase issue in Russia
        - firefox spotify issue
        - clues
        -
    Notes:
        - added error for firebase issue
        -
        -

# 11/6
    Goals:
        - Make scores and about modals instead of nav links
        - fix randomization of tracks
        -
    Notes:
        - Hid nav during game
        - fixed volume reset issue
        - selected country now says "awaiting selection..." instead of nothing
        - changed nav links to modals
        -

# 11/2
    Goals:
        - fix language glitch
        - hide nav during game
        - fix auto-play glitch on mobile
        - make selected country say none yet
        - fix volume reset between rounds issue
        - firebase not working in some parts of Russia, let the user know
        - firefox spotify playback sdk issue, let user know
        - add clues, dock points
        -
    Notes:
        - made map always in english
        -

# 10/30
    Goals:
        -
    Notes:
        - updated about
        - added analytics
        -

# 10/29
    Goals:
        - move GameEnded on mobile
        - Make better 404 page
        - Add all guesses for GameEnded
        - Add more tracks
        - Improve translation for Ecuador
        - Fix track not autoplaying on mobile
        - Center logo for ico
        - Equalize volume for all tracks / remove loud tracks
        -
    Notes:
        - Added more tracks
        - ico centered
        - translation improved
        -

# 10/28
    Goals:
        - Add logo
        - Make track auto play
        - Make better 404 page
        -
    Notes:
        - Replaced description dropdown with modal
        - Restyled everything below map so now everything fits on screen
        - Changed modal to older DaisyUI version with out dialog tag, for support on older browsers
        - Fixed console warning about https
        -

# 10/26
    Goals:
        - Optimize fetching random track from playlist
        - Improve styling on mobile
        - Move next track button
        - Add logo to Home
        -
    Notes:
        - Successfully deployed using vercel
        - fixed off by one issue on mobile
        - added spinner
        - fixed play again glitch
        -

# 10/24
    Goals:
        -
    Notes:
        - Made env variables for all keys, ids, secrets, etc.

# 10/21
    Goals:
        - move next round button
    Notes:
        -

# 10/20
    Goals:
        - make marker stay on correct guess
        - undo marker issue, find new solution
        -
    Notes:
        - useRef rules
        - marker issue is resolved

# 10/17
    Goals:
        - make map unclickable between rounds
        - make map unclickable until next track is loaded (slow wi-fi)
        - use smaller spotify img
        - move next round button
        - add env variables
        - make logo
        -
    Notes:
        - map is now unclickable between rounds (now just realized that this made the marker not replaceable during rounds, will probably need to revert)
        - made logo
        - updated favicon.ico
        -

# 10/16
    Goals:
        - add navbar
    Notes:
        - bg-info does not have focus
        - added press enter for buttons
        - added nav

# 10/10
    Goals:
        - add navbar
            - homepage, description of the game, how to play, donate button
            - leader board
        - add correct username functionality to high score submission, perhaps with a modal
    Notes:
        - added high score list using firebase's realtime database

# 9/12
    Notes:
        - added current score

# 7/11
    Goals:
        - Add hints for all tracks
            - each game has 3 hints
        - Ensure tracks are unique through multiple games
            - Randomize the playlist?
    Notes:
        -

# 7/10
    Notes:
        - Finished track descriptions (for now)
        - Fixed round incrementing issue

# 7/6
    Goals:
        - Finish adding track descriptions
        - Overlay result over map? Fit everything on screen
    Notes:
        -
# 7/5
    Goals:
        - Finish adding track descriptions
        - Show all guesses and flags at end of game, like GeoGuessr
# 7/4
    Goals:
        - Make the "selected country:" country stay on correct guess
        - Add track descriptions for each track
    Notes:
        - React.Fragment allows you to add a key to an empty fragment
# 7/3
    Notes:
        - conditional rendering is awesome
        - research CSS overlay
