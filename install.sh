#!/bin/bash 

# Install mongodb
brew install mongodb-community@4.4

# Run mongodb in background
mongod --dbpath=./data --config /usr/local/etc/mongod.conf --fork