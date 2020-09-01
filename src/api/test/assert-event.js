module.exports = function (event1, event2) {
  expect(event1.id).toBe(event2.id);
  expect(event1.name).toBe(event2.name);
  expect(event1.eventName).toBe(event2.eventName);
  expect(event1.destination).toBe(event2.destination);
};
