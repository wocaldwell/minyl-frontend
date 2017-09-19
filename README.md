# miNyl - helping you listen to GOOD music

Is your vinyl record collection getting the best of you? miNyl is a web app for music lovers that helps you manage your analog collection in this "21st Century Digital World" (you got that reference, right?). Search for songs in your collection and keep track of all those records you gotta have. miNyl, helping you listen to GOOD music.

#### Checkout [miNyl](http://www.williamocaldwell.com/minylclient/)!

## This is the miNyl AngularJS client

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This client requires the miNyl django REST database found here: [miNyl database repo](https://github.com/wocaldwell/minyl-backend)

Install [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)

Install http-server:
```
 npm install http-server -g
```

### Installing

Clone repo:

```
git clone https://github.com/wocaldwell/minyl-frontend
```
Install project dependencies:
```
npm install 
```

### Adding Discogs API credentials

This project also accesses information from discogs. Register and get access to Discogs [here](https://www.discogs.com/settings/developers) then set environment variables:

In your environment's `~/.zshrc` or equivalent file set up save this:
```
export DISCOGSKEY="Your key goes here"
export DISCOGSSECRET="Your secret goes here"
```
This client needs [my backend](https://github.com/wocaldwell/minyl-backend) to access the ENVs so check that out for more information. 

### Run project locally:

Run project in browser:

```
http-server
```
In your browser you should see somthing like this:
![myNyl screenshot](images/minyl-screen-shot.png?raw=true)

### Running the tests

No testing suites included in this project.

### Deployment

A [deployment build](https://github.com/wocaldwell/minyl-frontend/tree/adding-client) is included in this repo. This branch includes tweaks to the code for my specific deployment. If issues arise in deployment please let me know.


### Built With

* [Javascript](https://www.javascript.com/) - Main Language
* [AngularJS](https://angularjs.org/) - JS Framework
* [Bootstrap](https://maven.apache.org/) - Frontend Framework


### Authors

* **William Caldwell** - [wocaldwell](https://github.com/wocaldwell)


## Acknowledgments

"Thank you all and GOOD NIGHT!" - Every Musician Ever
