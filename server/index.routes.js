const express = require('express');
const router = express.Router();
const { fetchData } = require('./index.controller');

router.get('/api/data', fetchData);

module.exports = router;
