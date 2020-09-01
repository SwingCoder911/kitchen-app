class HttpHandler {
  static CODES = {
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    SUCCESS: 200,
  };
  constructor() {}
  static error(res, e) {
    res.status(HttpHandler.CODES.SERVER_ERROR).send(e.message);
  }
  static noResults(res, object = null) {
    if (!object) {
      res.status(HttpHandler.CODES.NOT_FOUND).send('No results found');
      return;
    }
    res.status(HttpHandler.CODES.NOT_FOUND).send(`No ${object} found`);
  }
  static success(res) {
    res.send('success');
  }
  static sendResultList(res, objectList) {
    res.send(objectList.map((object) => object.toDisplayJSON()));
  }
  static sendResultObject(res, object) {
    res.send(object.toDisplayJSON());
  }
}

module.exports = HttpHandler;
