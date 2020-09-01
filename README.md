# kitchen-app

Kitchen app made for interview

## Notes

Create scripts for this!
mongod --dbpath=/data
brew install mongodb-community@4.4
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4
mongod --dbpath=./data --config /usr/local/etc/mongod.conf --fork
ps aux | grep -v grep | grep mongod
