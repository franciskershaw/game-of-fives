# Testing

Click [here](README.md) to return to the main project.

Testing of this project was carried out through the following methods:

* Constant review during development using Gitpod's browser previewers and Chrome developer tools.
* Manual user story testing during and after the writing of the code.
* Automated testing of the HTML, CSS files using the WC3 validators.
* Automated testing of the JavaScript files using JSHINT.
* Automated testing of site's accessibility using the WAVE accessibility tool.

## Table of Contents

*Contents here*

## Testing During Development

### Browser Preview and Chrome Developer Tools

Visuals/Responsiveness

* Testing while writing the code was carried out using Gitpod's browser preview in order to make sure that elements and styles in particular were displaying as intended.
* While on the temporary browser previews, Google Chrome's developer tools were always in use to check the responsiveness of my pages across a number of screen sizes.

Game logic

Due to the introduction of JavaScript on this project, the developer tools console became my most important means of testing through the *console.log* method.

* Inititally the most basic 2-player version possible was designed purely for the console. Each specific function was documented, and all the variable values were laid out using template literals to ensure the functions were acting predictably and following on from each other correctly.
* Every single function that was created would begin with a message '*function name* has been called' so that I was sure that everything that was required to run was running when required.
* I also logged the value of the game variables throughout

### Post Deployment

### Notable bugs during development

## Manual User Story Testing

## Manual Stakeholder Testing

## HTML Validator

## CSS Validator

## JS Validator

## Accessibility Testing

[Back to the top - broken link](#Testing)

[Back to main document](README.md)


### General notes
* Make sure to include Trello use (sprints/tasks) as part of the testing document

### Bugs notes
* Mute button not playing sounds as a default setting until the button has been interacted with.
* Getting mute button to work in the first place
* Animation bug (transform issue)

### Validator notes
* HTML: 1 warning for empty h2, dismissed as text content is added using Javascript
* CSS: No warnings
* JS: Missing an unnecessary semicolons, ES6 features warnings, undefined variables ($)
* Accessibility: 
    * Errors thrown by empty buttons on index and game
    * Warnings thrown by no page regions (header/footer/nav etc - both pages), possible missed heading (index), possible redundant links (both), no heading structure (game), and underlined text (game).
    * Contrast error thrown by the 'sr-only' psnas
