# UCSC Boardwalk

UCSC Boardwalk is a MEAN stack app and uses standard setup/configuration tools (NPM and Grunt).

See the following for more details:

- [http://mean.io](http://mean.io)
- [https://www.npmjs.org](https://www.npmjs.org)
- [http://gruntjs.com](http://gruntjs.com)

## Prerequisites
UCSC Boardwalk is an [Angular 2 app](http://angular.io), built with the [Angular CLI tool](https://github.com/angular/angular-cli).

The only prerequisite is [Node 4](https://nodejs.org/en/blog/release/v4.0.0/).

## Environment Setup

### 1. Clone the UCSC Boardwalk Repo

        git clone git@github.com:clevercanary/ucsc-boardwalk.git [folder_name]


### 2. Install Server-Side Dependencies

Use NPM to install server-side dependencies.

		npm install

From the `server` directory, install server-side typings:

		typings install


### 3. Install Client-Side Dependencies

Install Angular CLI if you don't have it already installed. Both of the following steps must be done with npm@3

		npm install -g angular-cli

Navigate to the `spa` directory and install client-side dependencies.

		npm install

### 4. Front End (Only) Development Server

To start the Angular 2 development server, run the following from the `spa` directory:

		npm start

You can hit the server at `http://localhost:4200`. Requests to `http://localhost:4200/api` will be proxied to `http://localhost:3000/api` according to the configuration in `proxy.conf.json`. More information can be found in the [angular-cli repository](https://github.com/angular/angular-cli).

### 5. Back End (Only) Development Server

To start Express, run the following from the root directory:

		grunt workon

This will run the express server on `http://localhost:3000`

## Run Client-Side Tests

Run the following from the `spa` directory:

	npm test
	
This will run once through test-suite using PhantomJS. To run through PhantomJS with a file watcher, you can use:

    npm test:headless

To run the tests through the browser with a file watcher:

    npm test:browser

