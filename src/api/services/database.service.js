const { MongoClient, ObjectId } = require('mongodb');

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
  /**
   * Create and setup the mongo connection
   */
  init() {
    return new Promise((res, rej) => {
      MongoClient.connect(process.env.MONGO_ENDPOINT, {
        useUnifiedTopology: true,
      })
        .then((client) => {
          const db = client.db(process.env.MONGO_DB_NAME);
          this.collection = db.collection('events');
          res();
        })
        .catch((error) => {
          console.log('failed to connect: ', error);
          rej(error);
        });
    });
  }

  /**
   * Method: updateEventsEventName
   * Update the eventNames and eventTimes of a collection of events
   * @param {[events]} events
   */
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
            $set: { eventName: event.eventName, eventTime: event.eventTime },
          }
        )
      );
      return await Promise.all(promises);
    } catch (e) {
      console.log('updateAll error: ', e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Method: findEvents
   * Get set of events from the database based on a list of ids
   * @param {[number]} ids
   */
  async findEvents(ids) {
    if (!ids.length) {
      return [];
    }
    try {
      return await this.collection
        .find({
          _id: {
            $in: ids.map((id) => id),
          },
        })
        .toArray();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  /**
   * Method: findEvent
   * Get event object from the databased using the id
   * @param {number} id
   */
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

  /**
   * Method: findAndUpdateEvent
   * Find an event by id if it exists, then update it.
   * @param {number} id
   * @param {event} data
   */
  async findAndUpdateEvent(id, data) {
    if (!id || !data) {
      return null;
    }
    try {
      const { value: found } = await this.collection.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { returnOriginal: false }
      );
      return found;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: insertEvents
   * Get a series of new event objects and add them all to the database
   * @param {[events]} events
   */
  async insertEvents(events) {
    if (!events.length) {
      return null;
    }
    try {
      return await this.collection.insertMany(events);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: createEvent
   * Create a new event in the database and return the created object
   * @param {event} event
   */
  async createEvent(event) {
    if (!event) {
      return null;
    }
    try {
      const { insertedId } = await this.collection.insertOne(event);
      return ObjectId(insertedId);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Method: getEventsByEventNames
   * Get a set of events by their eventNames
   * @param {[string]} eventNames
   */
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
