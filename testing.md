# Testing

Click [here](README.md) to return to the main project.

Testing of this project was carried out through the following methods:

* Constant review during development using Gitpod's browser previewers and Chrome developer tools.
* User testing of the deployed site when close to completion.
* Manual user story testing during and after the writing of the code.
* Automated testing of the HTML, CSS files using the WC3 validators.
* Automated testing of the JavaScript files using JSHINT.
* Automated testing of site's accessibility using the WAVE accessibility tool.

## Table of Contents

* [Testing During Development](#testing-during-development)
   * [Browser Preview and Chrome Developer Tools](#browser-preview-and-chrome-developer-tools)
   * [Post Deployment](#post-deployment)
   * [Notable Bugs](#notable-bugs)
* [User Story Testing](#manual-user-story-testing)
* [Stakeholder Story Testing](#manual-stakeholder-testing)
* [HTML Validator](#html-validator)
* [CSS Validator](#css-validator)
* [JS Validator](#js-validator)
* [Accessibility Testing](#accessibility-testing)

## Testing During Development

### Browser Preview and Chrome Developer Tools

Visuals/Responsiveness

* Testing while writing the code was carried out using Gitpod's browser preview in order to make sure that elements and styles in particular were displaying as intended.
* While on the temporary browser previews, Google Chrome's developer tools were always in use to check the responsiveness of my pages across a number of screen sizes.

Game logic

The guiding principal I followed when writing the game's JavaScript code was to start very simple and build upwards. This way I was able to be reassured that the vital core functions were working properly before added complexity (such as the 3-player and 4-player) versions of the game were attempted. I used Trello to divide the basic functions into 'sprints', and those were divided into various 'tasks' that could be attempted and tested on an individual level. Each completed task would then usually be assigned to its own git commit so that I had the option to revert to working versions of the code if my game was to break for an unknown reason.

The console on Google Chrome's developer tools became my most important means of testing that each small component or task I working on was functioning as intended - using the *console.log* method:

* Inititally the most basic 2-player version possible was designed purely for the console. Each specific function would announce to the console that it had been called, and all the relevant variable values were logged using template literals to ensure the functions were acting predictably and following on from each other correctly. 
* Only once I was satisfied that the console version of the game was to specification did I feel comfortable amending the functions to manipulate the HTML of the gamepage itself.
* Any time a function was amended in any way at all, be it to introduce extra layers of complexity or to break code down into more legible sections, I would reintroduce the same *console.log* messages as before to ensure that absolutely nothing had changed as a result of the changes I had made.

Bugs were inevitably present at several stages during development, especially given that this was the first project I had produced using JavaScript. These are covered below in **Notable Bugs.**

### Post Deployment

Several of the methods of testing as detailed above were also applied to the live version of the site to ensure that there were no unexpected bugs. On my previous project, I found a few troublesome issues post-deployment that required some time to debug. So for this second project I made sure to deploy the site much earlier to keep on top of any bugs that came in direct contrast to what I was seeing in my development environment.

Once I felt that the project was close to completion, I sent a link to the site to a dozen or so people with instructions to test the site on their available devices. The user testers were given the following instructions:

* Check the rules on the homepage to make sure you understand how to play the game
* Play at least one game on each of the three difficulties
* Make a note in the event that the game does not work as you might expect
* When finished playing, return to the homepage and note down the win vs loss record and the tagline
* Let me know what device and browser was used

This structured approach to user testing was in contrast to the slightly looser approach I took with my first project as I had a clearer definition of what answers I need answering at this stage:

* Can a user who has never played the game before work out easily how to play through my explanation of the rules or context?
* Does the game work properly?
* If any issues appear only for a small number or users, what device or browser may be contributing to this issue?

Some important observations were confirmed through the user testing that I would then ensure was implemented on the project itself:

* It was noted that while it was possible to mute sound effects, this was then reverting to default settings once a new game was started. **This was amended to use local storage.**

*One bug in particular with lagging on my sound effects became evident through deployment of the site, this is covered below in **Notable Bugs.***

### Notable bugs

*Duplicate functions when called by click events*

Through my use of *console.log* messages when developing my console-only version of the game, I noticed the functions assigning values to the user's input (the clicking of a fist or palm icon to denote 0 or 5) were being called twice on the second round of the game. This doubling up of the functions would then occur again for the next round, and so on. Suffice to say that this played havock with my game variables!

I did a bit of research to understand why this was happening, as to me it made no sense that the functions would be called twice. Fortunately the fix was simple to find and implement via the jQuery documentation, as it turns out I simply needed to reset my click events after use. **The .off('click) method fixed the problem by removing the event handler after it had been used, thus allowing it to be used again on the next round.** 

*Mute button*

Introducing sound effects to my project was an unfamiliar process and caused a few issues that needed fixing. I was inititally using my game variable (game.soundsOn = true) to decide at each stage whether the sounds should be played - with false being assigned if a user clicked on the mute button. However once I decided to use local storage to assign a true or false value, sounds stopped working altogether for a while. It was again through the use of *console.log* that I worked out that the issue was to do with the local storage data being exclusively displayed as strings, instead of actual boolean values. **To fix this, I simply rewrote the necessary sections of my code as strings ("true" or "false" instead of true or false)**

One final problem remained once the sounds were back up and running, in that no sounds would play as a default setting for first time visitors to the gamepage. This it turns out was because I had not told my code what to do if the value on local storage was *null*. **This was fixed with the addition of a simple if statement that ensured sounds.On === "true" in this situation.**

*Animation transform bug*

In order to ensure that the hand images were facing the correct direction on higher difficulty versions of the game, I used the CSS property 'transform' to change the rotation and mirror if necessary. This caused a tricky bug in my animation as it had been written to add and remove an animation class (which also contained the transform property), at intervals - producing the illusion of movement from the hands. The competing transforms, as well as the CSS specificity rules, meant that all extra hand images were remaining static during the animation. **This was fixed with help from a video on YouTube (please see acknowledgements in README.md) by using the .animation JS method.**

*Higher difficulty versions displaying minor logic errors*

I inevitably played the game I had created hundreds of times during development and testing, and would always keep an eye out to make sure that the computer was only guessing answers that were logically possible from the inputs it had chosen to make. For example, if any of the computer's inputs were an open palm (5), then it shouldn't logically be guessing 0 on its turn as this answer would not be possible. The idea was that the computer should always have the same chance to guess correctly no matter the difficulty setting, whereas it would become harder for the user to guess correctly the more computer players there were.

While there were no issues on the 2-player version of the game, I did notice that on 3-player the computer was occasionally guessing 15 despite inputting a palm (5) and a fist (0). My if statement was incorrectly written on this occasion to include 15 as a randomly generated option for total inputs of 5 as it included the 4-player version of the game - **this was fixed my rewording the if statement to not include what type of game was being played, but instead focus on the total inputs as a means of determining what answers were possible.**

*Dynamic tagline displaying null for first time users*

Much like my issue with the mute button detailed above, I realised through user testing that the dynamic h2 on the homepage was defaulting to 'null' when a user first entered the site. **This was fixed by including a condition for 'null' in my already existing if statement.** 

*Sound effects on Safari lagging*

A noticeable lag for the sound effects was picked up upon both by myself and other users when playing the game on safari. It was not much, but it was enough to throw off the carefully timed sounds during the game's animation and thus (in my opinion at least) greatly reduce the impact of the animation. The same could be said for the button clicks, the sound effects coming noticeably after a button click had been enacted. This issue was not game-breaking on tablet, laptop or desktops, However it was a really distracting issue on mobile devices - where the lag was so bad that sound effects would pile on top of each other during the animation.

Research online frustratingly did nothing but confirm my suspicion that this issue was mainly routed in iOS, and that nothing in my code was necessarily broken to cause this issue. I did find on a stack overflow post that two lines of code might help the performance.

## Manual User Story Testing

## Manual Stakeholder Testing

## HTML Validator

## CSS Validator

## JS Validator

## Accessibility Testing

[Back to the top](#testing)

[Back to main document](README.md)


### Validator notes
* HTML: 1 warning for empty h2, dismissed as text content is added using Javascript
* CSS: No warnings
* JS: Missing an unnecessary semicolons, ES6 features warnings, undefined variables ($)
* Accessibility: 
    * Errors thrown by empty buttons on index and game
    * Warnings thrown by no page regions (header/footer/nav etc - both pages), possible missed heading (index), possible redundant links (both), no heading structure (game), and underlined text (game).
    * Contrast error thrown by the 'sr-only' psnas
