# 5/3/25

    Goals:
        - Find workaround since preview_url is deprecated
        -
    Notes:
        - Solution: scrape all tracks for preview_url and include them in DescriptionHintOptions()
        -

# 8/20

    Goals:
        - optimize playwright tests
        - move jest tests to pre push instead of in vercel
        - Focus on refining track selection, improving hints
        - Create db
        -
    Notes:
        -

# 8/20

    Goals:
        - create and optimize playwright tests
        - move jest tests to pre push instead of in vercel
        - Focus on refining track selection, improving hints
        - Create db
        -
    Notes:
        - Softlock bug in legacy version if there is too short of a duration between map click, "submit", "next round". Need to fix for new version when map is added.
        - videos are still captured in headless mode
        -

# 8/19

    Goals:
        - install playwright, and start with a basic test
        - Focus on refining track selection, improving hints
        - Create db
        -
    Notes:
        -

# 8/1

    Goals:
        - Focus on refining track selection, improving hints
        - Create db
        -
    Notes:
        -

# 7/30

    Goals:
        - Focus on refining track selection, improving hints
        - Create db
        -
    Notes:
        - Music TO REPLACE: Ethiopia (too modern), Kenya (too quiet, not distinct enough), DRC (too loud), Phillipines (needs to be more traditional), Yemen (needs to be more traditional)
        - HINTS THAT NEED IMPROVEMENT: Zambia, Nicaragua
        - Under a million, but possibly keep: Belize (I like the song), Iceland
        -

# 7/26

    Goals:
        - Remove songs that are not unique/old enough to be recognizable as from that country
            - Start with removing all tracks where the country population is less than 1 million
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Move descriptions, hints, links to database
        - Add map in result?
        - Calculate nearest border point in json file for use?
        - Add difficulties
        -
    Notes:
        - Tracks removed, too small population: Seychelles, Samoa, Malta
            - Removed because too modern / not distinct: Oman, Eswatini
            - Music TO REPLACE: Ethiopia (too modern), Kenya (too quiet, not distinct enough), DRC (too loud),
            - GOOD tracks with good hints: Zimbabwe,
            - HINTS THAT NEED IMPROVEMENT: Zambia, Nicaragua
            - Exception for Cabo Verde, small population but song and genre are significant

# 7/26

    Goals:
        - Need to test in slow 3g
        - Integration tests: fetch playlist, playlist length matches description object length
        - Possibly make playlist id an environment variable
        - Remove songs that are not unique/old enough to be recognizable as from that country
            - Start with removing all tracks where the country population is less than 1 million
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        - Tracks removed, too small population: Seychelles, Samoa, Malta
            - Removed because too modern / not distinct: Oman, Eswatini
            - Music TO REPLACE: Ethiopia (too modern), Kenya (too quiet, not distinct enough), DRC (too loud),
            - GOOD tracks with good hints: Zimbabwe,
            - HINTS THAT NEED IMPROVEMENT: Zambia, Nicaragua
            - Exception for Cabo Verde, small population but song and genre are significant

# 7/26

    Goals:
        - Need to test in slow 3g
        - Integration tests: fetch playlist, playlist length matches description object length
        - Possibly make playlist id an environment variable
        - Remove songs that are not unique/old enough to be recognizable as from that country
            - Start with removing all tracks where the country population is less than 1 million
                - Tracks removed, too small population: Seychelles, Samoa, Malta
                - Removed because too modern / not distinct: Oman, Eswatini
                - Music TO REPLACE: Ethiopia (too modern), Kenya (too quiet, not distinct enough), DRC (too loud),
                - GOOD tracks with good hints: Zimbabwe,
                - HINTS THAT NEED IMPROVEMENT: Zambia,
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        -

# 7/25

    Notes:
        - Fixed population
        -

# 7/24

    Goals:
        - Need to test in slow 3g
        - Integration tests: fetch playlist, playlist length matches description object length
        - Possibly make playlist id an environment variable
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        -

# 7/24

    Goals:
        - Need to test in slow 3g
        - Preload hints
        - Make unit test for correct playlist id for legacy version
        - Integration tests: fetch playlist, playlist length matches description object length
        - Possibly make playlist id an environment variable
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Hints table
            - languages, album, and starting letter are too obvious
            - may have to manually go through and record instruments
            - hints can be more vague if there is a compass
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        -

# 7/23

    Goals:
        - Make unit test for correct playlist id
        - Possibly make playlist id an environment variable
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Hints table
            - languages, album, and starting letter are too obvious
            - may have to manually go through and record instruments
            - subregion perhaps
            - hints can be more vague if there is a compass
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        - Genre gives away country name
        - Subregion gives away country name for Australia and New Zealand
        -

# 7/22

    Goals:
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Hints table
            - Make the hints table start with a blurry album and decrease the blurriness each hint
            - Refine hints
            - Release date? Replace first letter?
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        -

# 7/21

    Goals:
        - Start game button enter keyboard click
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Hints table
            - Refine hints
            - Release date? Replace first letter?
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Make multiple countries an answer if song is of a style representative of many countries.
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        -

# 7/20

    Goals:
        - URGENT: Game freezes when trying to fetch tracks when localStorage has played all tracks. New Version only.
        - Start game button enter keyboard click
        - Remove songs that are not unique/old enough to be recognizable as from that country
        - Hints table
            - Manually go through and make changes to descriptions
            - For the hints, the album image often gives it away, possibly use release date instead, or maybe blur the image? Continent could be another hint.
            - Also need a backup of the song or artist name contains the country name.
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        - Add map in result?
        - Calculate nearest border point in json file for use?
        -
    Notes:
        - The first letter hint is too obvious for certain countries like "Z", since there are not many countries that start with Z.
        -

# 7/19

    Goals:
        - Hints table
            - Manually go through and make changes to descriptions
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        -
    Notes:
        -

# 7/18

    Goals:
        - Hints table
            - Manually go through and make changes to descriptions
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Add compass on guess table
        -
    Notes:
        - Generating hints with ChatGPT, seems to work pretty well
        - ChatGPT seems to struggle with multiple tasks at once. Seems to generate hints fine, but when I ask it to also add it as an key value pair to an object, and not mention the country name, it seems to run into issues.
        -

# 7/17

    Goals:
        - Make album clickable to spotify link
        - Read more link
        - Ensure auto play works correctly on mobile
        - Add compass on guess table
        - Hints table
            - Manually go through and make changes to descriptions
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Multiplayer?
        -
    Notes:
        -

# 7/16

    Goals:
        - Ensure auto play works correctly on mobile
        - Add compass on guess table
        - Hints table
            - Manually go through and make changes to descriptions
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Multiplayer?
        -
    Notes:
        -

# 7/15

    Goals:
        - Ensure tracks are exhausted before repeats, also fetch tracks in groups of 3 and ensure auto play works correctly on mobile
        - Add compass on guess table
        - Hints table
            - Manually go through and make changes to descriptions
        - Add a see results button after last round and before play again. Display all guess tables from all rounds
        - Add separate nav: leader board, about, donate
        - Factor distances into scores, perhaps time
        - Multiplayer?
        -
    Notes:
        - Styled cards
        -

# 7/14

    Goals:
        - NewVersion:
            - Show track info on correct guess
            - Add a button (see score?) before the play again button and total score message, that way they can see their results from that round before getting that.
            - Add compass on guess table
            - more refactoring
            - Ensure tracks are exhausted before repeats, also fetch tracks in groups of 3 and ensure auto play works correctly on mobile
            - Hints table
                - Manually go through and make changes to descriptions
            -
        - Legacy:
            - Fix deprecated marker, also need to add map id to env and fix web gl error
            -
        -
    Notes:
        - Fixing the Legacy deprecated marker may take a while, considering abandoning this to focus on the new version
        - Maybe make a see results button that shows all guess tables from all the rounds.
        -

# 7/13

    Goals:
        - NewVersion:
            - Final Score message
            - Add compass on guess table
            - more refactoring
            - Ensure tracks are exhausted before repeats
            - Hints table
                - Manually go through and make changes to descriptions
            -
        - Legacy:
            - Apply loading=async fix to Legacy version
            - Fix deprecated marker
            -
        -
    Notes:
        -

# 7/11

    Goals:
        - NewVersion:
            - Add new loader in guess table
            - Add compass on guess table
            - Figure out "borders" for distance calc (REST Countries API)
            - more refactoring
            - round system
            - Ensure tracks are exhausted before repeats
            - Hints table
                - Manually go through and make changes to descriptions
            -
        - Legacy:
            - Apply loading=async fix to Legacy version
        -
    Notes:
        -

# 7/10

    Goals:
        - NewVersion:
            - more refactoring
            - round system
            - Ensure tracks are exhausted before repeats
            - Hints table
                - Manually go through and make changes to descriptions
            -
        - Legacy:
            - Apply loading=async fix to Legacy version
        -
    Notes:
        -

# 7/9

    Goals:
        - NewVersion:
            - Bring audio player, dropdown, etc. up on the page
            - There are 2 Coordinates types, need to name them differently and move the one from handle Geocoding into types
            - Fix loading=async issue, found this https://github.com/JustFly1984/react-google-maps-api/issues/3334:
                -You must update to the latest version and replace useLoadScript with the newer useJsApiLoader import { useJsApiLoader } from "@react-google-maps/api";
            - more refactoring
            - round system
            - Add landing page, legacy, and new
            -
        -
    Notes:
        -

# 7/8

    Goals:
        - NewVersion:
            - There are 2 Coordinates types, need to name them differently and move the one from handle Geocoding into types
            - Fix loading=async issue, found this https://github.com/JustFly1984/react-google-maps-api/issues/3334:
                -You must update to the latest version and replace useLoadScript with the newer useJsApiLoader import { useJsApiLoader } from "@react-google-maps/api";
            - Make scoring into cold, warm, hot, etc.
            - more refactoring
            - round system
            - Add landing page, legacy, and new
            -
        -
    Notes:
        -

# 7/7

    Goals:
        - NewVersion:
            - Finish react-select adjustments on GuessForm, filtering, auto select top, etc.
            - more refactoring
            - round system
            - hints
            - distance calculation
            - Add landing page, legacy, and new
            -
        -
    Notes:
        - Hints table needs a lot of work. Track title, artist name, album art, description sometimes give away the answer. Need to manually review all of these. Putting this off for now.
        -

# 7/6

    Goals:
        - NewVersion:
            - Türkiye -> Turkey, Côte d'Ivoire -> Ivory Coast
            - put wrong and right guesses with feed back in table
            - more refactoring
            - round system
            - hints
            - distance calculation
            - Add landing page, legacy, and new
            - Highlighted suggestion should stay highlighted even when mouse leaves box
            -
        -
    Notes:
        - react-autosuggest may not be the best choice, looking at react-select and react-autocomplete
        -

# 7/5

    Goals:
        - NewVersion:
            - round system
            - hints
            - distance calculation
            - Add landing page, legacy, and new
            - Highlighted suggestion should stay highlighted even when mouse leaves box
            -
        -
    Notes:
        -

# 7/4

    Goals:
        - NewVersion:
            - round system
            - hints
            - distance calculation
            - All countries in dropdown
            - scroll bar in dropdown
            - Remove already made guesses from dropdown
            - Add landing page, legacy, and new
            - refactor NewVersion
            -
        -
    Notes:
        -

# 7/3

    Goals:
        - NewVersion:
            - flags
            - round system
            - hints
            - distance calculation
            - All countries in dropdown
            - scroll bar in dropdown
            - flags in dropdown
            - styling for list of wrong guesses
            -
        -
    Notes:
        -

# 7/2

    Goals:
        - NewVersion:
            - flags
            - round system
            - hints
            - distance calculation
            - auto select input field
            - simplify key press logic
            -
        -
    Notes:
        - Key press
            - Previous version handled key press logic separately without using a button reference.
            - Updated to use a reference to the play again button for managing focus and triggering click on Enter key press.
        -

# 7/1

    Goals:
        - NewVersion:
            - Get rid of check button, style more similar to foodguessr:
                - select only options from dropdown
                - All countries in dropdown
                - scroll bar in dropdown
                - flags in dropdown
                - list wrong guesses
                - auto play - may need to make adjustments for mobile
                -
            -
        -
    Notes:
        - add state + 1 to force remount
        -

# 6/29

    Goals:
        - NewVersion:
            - Work on play again button
            - Fetch only one track at a time
            - Start working on rounds system
            - Hints
            - Add flags
            - Distance calculation: cold, warm, hot, borders
            -
        -
    Notes:
        -

# 6/28

    Goals:
        - NewVersion:
            - Add multiple guesses
            -
        -
    Notes:
        -

# 6/27

    Goals:
        - NewVersion:
            - Auto suggest countries
            -
        -
    Notes:
        -

# 6/26

    Goals:
        - NewVersion:
            - styling
            - input field
            -
        -
    Notes:
        -

# 6/25

    Goals:
        - NewVersion:
            - Write tests
            -
        -
    Notes:
        -

# 6/24

    Goals:
        - NewVersion:
            - Refactor
            -
        -
    Notes:
        -

# 6/22

    Goals:
        - NewVersion:
            - Continue refactoring
            - Write tests
            - Scoring system
            - Randomization
            - Round system
            -
        -
    Notes:
        -

# 6/21

    Goals:
        - NewVersion folder, start working on new scoring system
        - Continue converting files to TypeScript
        - Add more loading states/spinners for flags(including 5050), album art, selected country
        -
    Notes:
        -

# 6/20

    Goals:
        - Continue converting files to TypeScript
        - Add more loading states/spinners for flags(including 5050), album art, selected country
        -
    Notes:
        - Function type annotation. Example: const function: (variable: type) => void
        -

# 6/19

    Goals:
        - Convert files to TypeScript
        - Update Gabon
        - Add more loading states/spinners for flags(including 5050), album art, selected country
        -
    Notes:
        -

# 6/18

    Goals:
        - Move useEffect in HighScoreList into a hook
        - Make Button Component
        - Input Widget
        - Convert files to TypeScript
        - Update Gabon
        - Find alternative for dangerouslySetInnerHTML
        -
    Notes:
        - dangerouslySetInnerHTML is risky, opens risk of xss attack to users
        -

# 6/17

    Goals:
        - About list component
        - Move useEffect in HighScoreList into a hook
        - Add loading state for HighScoreList
        - Make Button Component
        - Input Widget
        -
    Notes:
        -

# 5/19

    Goals:
        - Gabon preview not available, update/remove it
        - Add share score to social media
        - contact FoodGuessr dev, perhaps structure the scoring system more similar to their game
        - contact Toby on the 28th, to see if the data is ready
        - add Conner's suggestions
        -
    Notes:

# 4/22

    Goals:
        - Gabon preview not available, update/remove it
        -
    Notes:

# 4/11

    Goals:
        - Add a popup for the info icon if the have not seen the popup yet, since most people seem to not click on it
        -
    Notes:
        -

# 4/9

    Goals:
        - Show more detailed results at end
        - Namibia preview url is no longer available, either remove or replace it
        - Fix audio glitch
        -
    Notes:
        - Added more clear comments for columns/rows
        - Fixed audio glitch!?
        -

# 4/6

    Goals:
        - Make map persist for "play again", also perhaps have the map preload but not shown, for "start game"
        - Keep track of all guesses, and show them at the end, perhaps all spotify links, descriptions, flags, etc.
        -
    Notes:
        - Another hint would be helpful, perhaps a circle that narrows it down?
        - Include timer? Factor time into score?
        - Perhaps rework scoring system, draw line to nearest border point, or make the game, incremental by one point (score increases by 1 until you lose)
        -

# 4/5

    Goals:
        - Add more tracks
        - Replace Ethiopia and Cambodia
        - Update Philippines Wiki (or replace) (perhaps automate wiki descriptions)
        -
    Notes:
        - Don't think need to add any more new countries, perhaps start repeating countries
        - Perhaps start mixing in automation of selection of random tracks from Smithsonian Folkways to increase total track number
        - Perhaps use Wikipedia API?
        -

# 4/1

    Goals:
        - Add more tracks
        -
    Notes:
        -

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
