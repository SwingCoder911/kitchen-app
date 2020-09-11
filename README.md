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

## Notes

Create scripts for this!
mongod --dbpath=/data
brew install mongodb-community@4.4
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4
mongod --dbpath=./data --config /usr/local/etc/mongod.conf --fork
ps aux | grep -v grep | grep mongod
npm test -- --coverage --watchAll=false
