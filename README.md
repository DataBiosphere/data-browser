# HCA Data Portal

The HCA Data Portal is an [Angular 5 app](http://angular.io), built with the [Angular CLI tool](https://github.com/angular/angular-cli).


## Prerequisites

1. node 10.16.0
1. npm 6.9.0
1. [git-secrets] must be installed
 
## Development Environment Setup

### 1. Clone the Repo

        git clone https://github.com/HumanCellAtlas/data-browser.git [folder_name]



### 2. Install Client-Side Dependencies


		npm install -g angular-cli

Navigate to the `spa` directory and install client-side dependencies.

		npm install

### 3. Development Server

To start the Angular development server, run the following from the `spa` directory:

		npm start

You can hit the server at `http://localhost:4200`.


### 4. Install git-secrets

If you have push access to the remote, you'll need to install [git-secrets],
   enable the commit hooks for it and configure patterns for AWS and Google:

   ```
   git secrets --install
   git secrets --register-aws
   git secrets --add '[-]----BEGIN.PRIVATE.KEY-----'
   ```



 