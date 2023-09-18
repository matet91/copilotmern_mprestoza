//init express app
const express = require('express');
const router = express.Router();
//init path
const path = require('path');
//create a router for all index files having index.html as optional
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views',  'index.html'));
});

//export router
module.exports = router;