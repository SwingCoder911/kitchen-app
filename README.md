# kitchen-app

## Introduction

This is a small app simulating a food order processor. This was built as an interview project for a company. It is meant to display architectural opinions, use of React with hooks, unit tests, data structures, algorithms, and SCSS familiarity.

## Requirements

- Create list view where all active orders can be viewed
  - Create a filter to only find currently "COOKING" orders
  - Create a filter to only find orders that have JUST been cooked in the last N seconds
- Create a list view were all processed/historical orders can be viewed
- Should be able to update all orders
  - Update the order's event state
  - All changes must be communicated to the server
- Have created a README.md that's basically a cover letter for the whole project
- Include instructions on how to run/test code
- Include reasoning behind technologies
- Code should follow community standards for syntax, comments, and style
- Code should have no debugging/logging, TODO's, FIXME's, commented-out code
- Code should have test coverage to ensure quality and safety

## Setup

1. Install app

- Install mongodb `./install.sh`
- Install npm `npm install`

2. Run app

- Open one terminal and run API: `npm run start:api`
- Open another terminal and run Frontend: `npm run start`

3. Test

- Open another terminal and run `npm test -- --coverage --watchAll=false`

## Approach

I wanted to begin this project with a solid hold on the idea of what sort of architectural choices I wanted to make. Several things are important to me when creating this app.

- Separation of concerns
- Abstracted functionality
- Testable functionality
- Clear, readable algorithms
- Storage of values in easily understandable configs

### Server Side

I chose going with MongoDB for the server storage as it's a simple, small engine of storage. As I thought about it, using a simple cache system might have sufficed. If I used a simple cache system, I would have had simplicity on my side and I might not have had to struggle so much in the interim figuring out some of the newer Mongo concepts and I also might not have to install mongodb in the initial process.

That said, MongoDB is a trusted, fleshed out database system that would guarantee me to have all the functionality I needed out of the box. And if this is "production ready", I would want it to run on an actual database. I've used MongoDB enough that it didn't cause me too much headache and I could package it well enough. Of all the database systems I could have gone with, it was the one I was most comfortable with.

#### Database

I wanted to setup the database service so that all that it handled was receiving, storing, and sending of objects and raw data. It shouldn't know anything about any other classes. I wanted the database to handle all database functionality and only database functionality. There should be no guessing of what each method in the database service is doing.

#### Services

I created a set of services that served as a middleman and logic handler for both events and for the event engine itself.
The intention behind the event.service.js was to be the sole place where all transformation of data to and from Event model would happen. Anything going into the service would go in as raw data and come out as raw data. This would ensure data quality and error handling.
The intention bethind the event-engine.service.js was to be the sole place where all the server side socket/event engine stuff would be handled. Engine state, socket event handling, etc.

#### Routes and Controllers

I split these up to provide a method of providing unit tests for controllers. I wanted to have a separate routes file for the events and the event-engine as well as their own dedicated controllers for separations of concerns and testability.

#### Definitions

I created one definition object here where I put all the logic handling for an actual Event object. Anything related to manipulating/getting information about an Event object should be handled within the Event object itself. It should be able to take data from mongodb as well as from the client.

#### Sockets

It took me a while to figure out how I wanted to handle the socket setup. I could have setup a serviceWorker, a separate server port, or any other options. I went with this as it seemed to be the place I'd find the least clash and shortest path to a solution. I think if I were to go another route, I might set up a serviceWorker as the point of the sockets was meant as a short term, alternative method of emitting events to the api. To me, that lacks a permanence and might not be best incorporated with the actual server api itself. However, given the amount of time/familiarity I had, I decided to go with just using the socket inside the server api.

### Client Side

The primary decision here was to decide which framework/technology to use. Should I bring in redux/thunk if I'm going to use React? I decided on going with React because it's the space my head is currently in and it would give me an opportunity to dive into React Hooks. That might have caused more trouble for me as the learning curve behind the jest testing was not trivial due to effects, and the like. I decided to go with Hooks because I wanted to show my ability to use them, learn something relatively new to me, and I actually really like the idea of hooks as a simplification of React even though I'm sad they did away with component classes as I like OO programming.

#### Components

I broke up the app into components that made sense to me to break it down to. I believe in separation of concerns of components so each component should have a clear definition of what it DOES do and what it DOES NOT do. Each component should have it's own test, and style files. One piece I noticed about running through this was how using modular css would have been super helpful and would have prevented some clashing of css. Also, it simplifies decisions about class naming. As I was trying to move quicker through this, I left that behind but saw that it would have been helpful.

#### Libs

Normally I like to have several different types of external functionalities: services, engine, utils, apis. However, I didn't have enough functionality to cover all the things I wanted. I also am a stickler on nameing. This project includes dot notation as well as kebab casing.
Note: I use dot notation to separate library type from library name. I use kebab for multiple words in a file.

#### Models

Like the definitions directory in the server, these models are where the logic and the handling of the Event object belongs. If there were component specific logic around the models, they would be in the respective libs file for the component logic and the Event logic would be in the models file.

#### Shared

Mostly this is where all the shared stuff would go including images if they existed. The shared styles are the only thing that are included here.

#### Configs

This is where all the string and configurations belong for the engine and for the evetns

## Notes

Create scripts for this!
mongod --dbpath=/data
brew install mongodb-community@4.4
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4
mongod --dbpath=./data --config /usr/local/etc/mongod.conf --fork
ps aux | grep -v grep | grep mongod
npm test -- --coverage --watchAll=false
