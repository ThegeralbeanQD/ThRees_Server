# Welcome to the ThRees API

This is used for keeping track of users and post, it can also be used to track local postcodes and waste collection dates.
![alt text](./test-heroBanner.jpg)

## Installation

Once repository is cloned from the terminal install npm packages `npm install`
The API contains a setup script for a database, but no database is currently connected. You'll need setup a SQL database such as elephantSQL
Get your database URL and create a .env file in the API folder and insert your URL and PORT i.e.

```
DB_URL = postgres://username:password@host/db_name
PORT = 3000
```

In the terminal enter `npm run setup-db` this will which you database connection and populate it with dummy data
Finally run `npm run dev` in the terminal to start your server on your localhost
You will now be able to use the API, use a testing platform to try the API.

## Technologies

* JavaScript
* SQL
* Node
* Express
* Git
* npm

## Process

* Planned the database
* Made skeleton for MVC 
* Made routes for each endpoint
* Add models 

## Wins

* Complete CRUD operations for all endpoints
* MVC structure fully implemented
* Uploading and retrieving images
* Automatic update of next and last collection on retrieval of collection dates


## Contributions

* Mithurssan Santhirakumar (<https://github.com/mithurssan>)
* Gi Ho (<https://github.com/ThegeralbeanQD>)
* Azeem Falade (<https://github.com/ABF22>)

## Licence

* [MIT Licence](https://opensource.org/license/mit/)