const MongoClient = require('mongodb').MongoClient;

/**
 * Class: DatabaseService
 * The intention of this class is to handle all database operations.
 * There should be no transformation of data from and to events, only sending data
 * to the database and reading it.
 */
class DatabaseService {
  constructor() {
    this.collection = null;
  }
  init() {
    return new Promise((res, rej) => {
      MongoClient.connect(process.env.MONGO_ENDPOINT, {
        useUnifiedTopology: true,
      })
        .then((client) => {
          const db = client.db(process.env.MONGO_DB_NAME);
          this.collection = db.collection('events');
          console.log('Success fully connected to mongo!');
          res();
        })
        .catch((error) => {
          console.log('failed to connect: ', error);
          rej(error);
        });
    });
  }
  async updateEventsEventName(events) {
    if (!events.length) {
      return null;
    }
    try {
      const promises = events.map((event) =>
        this.collection.updateOne(
          {
            _id: event.id,
          },
          {
            $set: { eventName: event.eventName },
          }
        )
      );
      return await Promise.all(promises);
    } catch (e) {
      console.log('updateAll error: ', e.message);
      throw new Error(e.message);
    }
  }
  async findEvents(ids) {
    if (!ids.length) {
      return [];
    }
    try {
      return await this.collection
        .find({
          _id: {
            $in: ids,
          },
        })
        .toArray();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async findEvent(id) {
    if (!id) {
      return null;
    }
    try {
      return await this.collection.findOne({
        _id: id,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async findAndUpdateEvent(id, data) {
    if (!id || !data) {
      return null;
    }
    try {
      return await this.collection.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { returnOriginal: false }
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async insertEvents(events) {
    if (!events.length) {
      return null;
    }
    try {
      return await this.collection.insertMany(
        events.map((event) => event.getMongoJSON())
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async getEventsByEventNames(eventNames) {
    if (!eventNames.length) {
      return null;
    }
    try {
      return await this.collection
        .find({
          eventName: {
            $in: eventNames,
          },
        })
        .toArray();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = DatabaseService;
