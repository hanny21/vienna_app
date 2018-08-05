# Neighborhood Map - React project
This is my project for Udacity's Front-End Web Developer Nanodegree Program.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Running the app
* clone this repo od download the files
* in your command line use `cd` to navigate to the project folder
* install all project dependencies with `npm install`
* start the development server with `npm start`
* the app will run on `http://localhost:3000/`

## Project Dependencies
* [Google Maps Api](https://developers.google.com/maps/documentation/)
* [Wikipedia Api](https://www.mediawiki.org/wiki/API:Main_page)
* [react-async-script-loader](https://www.npmjs.com/package/react-async-script-loader) for loading the Google Map
* [fetch-jsonp](https://github.com/camsong/fetch-jsonp) for fetching data from Wikipedia API
* [react-icons](https://react-icons.netlify.com/#/) for the hamburger menu icon
* style for Google map is from [Snazzy Maps](https://snazzymaps.com/style/44364/test-marseille)
* web browser: Google Chrome (recommended), Mozilla Firefox
* service worker: the App is using the service worker provided by [Create React App](https://github.com/facebookincubator/create-react-app), this service worker works only in production mode. To run build use `npm run build` command.

## Project Criterias
* Responsiveness - all application components render on-screen in a responsive manner.
* Usability - all application components are usable across modern desktop, tablet, and phone browsers.
* Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
* A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied. Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change).
* Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied. Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
* Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API.
* All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.
* Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page that it didn’t load.
* Application runs without console errors.
* Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
* Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.
* All content-related images include appropriate alternate text that clearly describes the content of the image.
* When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.
* React code follows a reasonable component structure. State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.
* There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.
