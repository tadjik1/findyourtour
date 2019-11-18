# FindYourTour

This is single page application that allows users to find activities in Berlin. In current 
setup all activities data is loaded into memory and library called 
[fuse.js](https://fusejs.io/) is used for full-text search. There is also possibility to select
activity from "Special offers" list that is presented for user by default or in case of no 
activities found by user's query.

Application uses [Vue](https://vuejs.org/) and had been bootstrapped with [Vie CLI](https://cli.vuejs.org)
with [webpack](https://webpack.js.org/) for building assets, [Babel](https://babeljs.io/) for 
transpiling Javascript and Vue files and [PostCSS](https://postcss.org/) for preprocessing css by 
adding prefixes for different browsers.
List of supported browsers is located in `.browserlistrc` file, which is backed by 
[browserslist](https://github.com/browserslist/browserslist). 

There is also [ESlint](https://eslint.org/) which is linting source code.

Application has several features:
- search for activities by their names. search can work by partial matching 
(i.e. "reich" will find "Reichstag") and also supports fuzzy search (i.e. "Parlament" will 
find "Parliament", notice typo in search word, there is missing "i" after "l").
- list of special offers which is provided to user by default and in case if no results found
- application supports all modern browsers and screen sizes
- localization use (Vue I18n)[https://kazupon.github.io/vue-i18n/].

Original data (stores in `data/original_data.json`) does not contain images and ids, so there
is a small script that enriches data. Images are downloaded from [Unsplash](https://unsplash.com/)
by using search for tour title. Generated data is in `src/assets` folder.  
Localization file that contains strings located in `src/assets` folder in file called `messages.json`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
