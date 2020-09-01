const express = require('express');
const router = express.Router();

const EventsController = require('../controllers/events.controller');

router.post('/:id', EventsController.updateEvent);
router.post('/', EventsController.postEvents);
router.get('/', EventsController.getActiveEvents);
router.get('/historical', EventsController.getHistoricalEvents);
module.exports = router;
