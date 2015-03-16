# Angular Boilerplate

An angularjs boilerplate which uses many of the best practices widely recognised within the Angular community.

This boilerplate employs a modular structure that is divided by feature, encouraging an uncoupled and reusable practice.


## Features:

* Angularjs 1.3
* UI router
* Seperate development and production directories for minified / unminified assets
* Gulp for running tasks
* Browser reload
* Sass
* Jasmine and Karma setup and ready for TDD
* Protractor set up and ready for e2e tests

## Gulp tasks

* gulp - inserts dependencies to the index file, starts a watch for updates to any files, starts a server on http://localhost:8080
* gulp production - prepares distribution directory, inserts production dependencies, starts a server on http://localhost:8080
* gulp jshint - runs your js files through jshint


## Directory structure

public >> config = the home of your config environments. Within the env sub directory you'll find development and production files. These house any outside scripts you want to use, such as ui router.

public >> modules = Add your new angular modules here. Each module should include directories for controllers, directives, services, tests and views (html files), as well as a module file, where you can include the name of the module and its dependencies.

Note when you add a new module you will also need to add it to the public >> application.js file, where the app's main module is declared.

public >> templates >> index.html = The main index file that you edit.

public >> modules >> e2etests = The place where you should add your e2e tests. Add your page objects in the pages directory. Add service helpers to the services directory and your actual tests to the page-tests directory.






