# 3/29
    Goals:
        - Figure out how to replicate audio glitch reliably
        - Expand flag selection to all options
        - Restrict flag selection to neighboring countries
        -
    Notes:
        - 5050 now chooses any track from description options
        - Renamed SpotifySearch to CoreLogic
        -

# 3/28
    Goals:
        - Fix autoplay glitch
        - Add more tracks
        - Make 5050 choose any flag (perhaps within a certain radius), not just from the 6 chosen.
        -
    Notes:
        - Countries skipped: Brunei, Kosovo (not recognized by Google Maps API), Palestine, Singapore, Vatican City, Equatorial Guinea, Timor-Leste, Kiribati, Tonga, Micronesia, Vanuatu
        -

# 3/27
    Goals:
        - Hide all sensitive info: playlist id, track ids
        - change maps key for dev
        - Add hidden volume slider to level track loudness
        - fix AudioPlayer click?
        - Move state management to zustand
        -
    Notes:
        - Marker not moving on 50/50 after non 50/50 correct guess. Setting isCorrectGuess to false at the start of every round resolves this issue.
        - Moved score to store
        - Audio glitch not resolved
        - Testing smaller map size for mobile
        - modals don't open on my ancient phone with showModal, but it does with the 5050, perhaps update the rest of the modals in that style
        - Trying changing the modals, and fallback color for donate button to test on my older phone
        -

# 3/26
    Goals:
        - Finish 50/50
            - Finish polyline
            - Finish automatic submit
            - testing
            -
    Notes:
        - Changed markerLocation from [0, 0] to null since it is an object
        - Need to define clearer variable names for "markerLocation", "markerRef", etc.
        - Having trouble with state synchronization, probably need to use something for state management
        - zustand seems cool, will make app more manageable
        -

# 3/22
    Goals:
        - Implement autoplay fix
        - Fix button flash for "submit" (fixed by setSelectedCountry(null) in handleNextRound)
        - Add loading state for "start game"
        - Fix styling for scoring on mobile
        - Add back logging for missing preview urls
        - Add hints (50/50?)
        -
    Notes:
        - removed all mentions of "isLoading"
        - Added restrictions to certain websites for Google Maps API key, look into using a separate API key for development
        -

# 3/21
    Goals:
        - Add more tracks
        - Fix autoplay mobile
        - Add hints
        -
    Notes:
        - Made "Secret" file for testing on mobile. Adding "start game" after "play again" so tracks can be fetched
        -

# 3/20
    Goals:
        - Add more tracks
        - Update so that tracks are loaded before "next round", for autoplay on mobile
        - Add hints feature
        - Possibly replace: Ethiopia, Philippines, Cambodia, Afghanistan, Guyana, Malta, Cyprus
        -
    Notes:
        - Countries skipped: Brunei, Kosovo (not recognized by Google Maps API), Palestine, Singapore, Vatican City
        -

# 3/18
    Goals:
        - Update info icon
        - Find better track for Libya
        - Possibly replace: Ethiopia, Philippines, Cambodia, Afghanistan
        -
    Notes:
        - Decided to skip Brunei, possibly remove some other smaller countries.
        -

# 3/17
    Goals:
        - Firestore descriptions are buggy, find fix for occasional missing track or revert to earlier commit
        -
    Notes:
        - Reverted Firestore descriptions
        -

# 3/16
    Goals:
        - Move descriptions to Firestore
        - new lines not working, find fix
        - add more tracks
        - Make playlist id env
        -
    Notes:
        -

# 3/14
    Goals:
        - Add more tracks
        - Add logging for tracks without preview
        - Move Description Options (firestore?)
        - Make Playlist ID an environment variable
        -
    Notes:
        - Removed Finland, because the preview URL is no longer available
        - Missing preview URL was causing the discrepancy with localStorage
        - "One Love" missing preview URL outside of United States
        -

# 3/13
    Goals:
        - Add more tracks
        - Replace Italy track with new one
        - Figure out pagination with Spotify 100 track fetch limit
        -
    Notes:
        -

# 3/12
    Goals:
        - Figure out modal track info issue, (update DaisyUI?)
        - Add more songs
        - Update modals
        -
    Notes:
        -

# 3/11
    Goals:
        - Figure out modal track info issue, (update DaisyUI?)
        - Add more songs
        - Mention information icon in about
        - Add titles for "Submit", "Next Track", and info icon
        -
    Notes:
        -

# 3/8
    Goals:
        - Add more songs
        - Mention information icon in about
        -
    Notes:
        -

# 3/6
    Goals:
        - Add question mark icon
        -
    Notes:
        - added footer
        - adjusted nav, used about instead of question mark icon
        -

# 3/5
    Goals:
        - Pressing enter before selection softlocks the game
        - When the tracks have been exhausted, it always starts with Indonesia (first track)
        - fix warnings in console
        - continue with previous goals
        -
    Notes:
        - Need to decide on method for moving descriptions to firestore. Either make JSON file, fix formatting, write script. Or manually copy and paste.
        - fixed softlock issue
        - updated google maps API link to include "v=quarterly". Marker warning is gone, but still need to update it. Still need to fix loading=async warning
        -

# 3/4
    Goals:
        - add more tracks
        - add image to README
        - add question mark icon, explaining the game
        - move description options to firestore, hide spotify playlist link
        - continue converting javascript to typescript
        - continue testing with jest
        -
    Notes:
        - fixed track repeating issue, using localStorage
        -

# 3/2
    Goals:
        - add more tracks
        - add image to README
        - add question mark icon, explaining the game
        - fix track duplication
        - only one highscore per username
        - move description options to firestore, hide spotify playlist link
        - continue converting javascript to typescript
        - continue testing with jest
        -
    Notes:
        -

# 2/29
    Goals:
        - add more tracks
        - add image to README
        - add question mark icon, explaining the game
        - fix track duplication
        -
    Notes:
        -

# 12/2
    Goals:
        - continue converting javascript to typescript
        - continue testing with jest
        - move description options to firestore
        -
    Notes:
        -

# 12/1
    Goals:
        - start conversion of javascript to typescript
        - start testing with jest
        -
    Notes:
        -

# 11/23
    Goals:
        - set rate limit for all users
        - put character limit for the form
        - move description options to firestore
        -
    Notes:
        - anonymous authentication can help deter abuse, but is not foolproof
        - permanent accounts work even better, but is still not foolproof
        - setting an overall rate limit, seems like the best option for now
        - it seems the firebase's spark plan already sets a limit, but for the alpha version, setting custom limits is a goal
        -

# 11/22
    Goals:
        - add option for users to submit a track
        - add authentication and more secure rules for databases
        -
    Notes:
        - added "add track" feature
        - A popup that comes and goes is called a toast! How neat!
        - having no rules for the database allows potential nefarious behavior such as excessive writes, which may incur billing
        - authentication will let me rate limit users
        -

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
