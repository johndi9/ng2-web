# Angular 2+ / Material website

This website is a customized Linkedin designed for mobile/tablet/desktop. 

It is developed with Angular 4 and Google Material and tries to simulate a native behavior.

### Installation

**Make sure you have Node version >= 5.0 and NPM >= 3**

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/johndi9/ng2-web.git

# change directory to our repo
cd ng2-web

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

### Main points

These are some of the main features achieved

* This page fetches a CV json with fresh standard. 
* It uses an internationalization (i18n) library but for the moment only English is supported.
* The data is parsed in the UI with a Typescript Business Object Model.
* The design pattern that will be used for Angular2+ is Redux with unidirectional rendering.
* Used Hammer / Swiper for the gestures.
* Used Material elements in order to achieve a native behavior.
