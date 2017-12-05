# Syz Task

## Tech stack
1. NodeJS + ExpressJS
2. AngularJS
3. HTML5, CSS3/LESS
4. Flexbox Grid
5. Google Map API
6. Google Location Search Autocomplete

## Running Node Server
1. Install & Setup NodeJS in your machine
2. Once node installed, go to the project location in your Command prompt or Terminal & enter *npm install* to insall all the dependencies.
3. Once all node modules are successfully installed, type *node server.js* and enter. The CMD prompt/Terminal should log *App listening on port3000* on the next line.
4. Now on your browser please go to your localhost in the port 3000 - http://localhost:3000/ where you will see all the list of street crimes on Google Map around Syzygy. Loader/Progress bar is applied during the JSON load.

## What's achieved
Created an app plot street crimes from the UK police API on a Google Map

1. Consumed the data from the UK Police API (This can be used for future improvements like restructuring the data, filtering, performace, .etc) - *root/server.js*
2. Created a front end so AngularJS can receive data. -  *root/public/js/controllers/MainController.js*
3. On inital load show data around Syzygy office - http://localhost:3000/
4. Only showing data for the one before the previous month. This is becasue most locations hasn't have the last month data. 
5. Clicking on the marker displays the details of the crime.
6. From the search field, you can select location from the Auto suggest to get crime data for any UK locations. - *root/public/views/index.html*

## What improvements can be made if given more time?

1. Obviously some page style improvements
2. Filtering options like Filter by Crime category, Filter by Month & Year
3. AngularJS directive ng-map can be used to improve the coding. Haven't explored that yet.
4. Map style improvements
5. Would've done unit testing
