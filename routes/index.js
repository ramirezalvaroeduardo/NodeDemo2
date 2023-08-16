var express = require('express');
var router = express.Router();
var sendDMail = require('./mailHelper.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MSPB' });
});

router.get('/faqs', function(req, res) {
  res.render('faqs', '');
})

router.post('/sendDMail', function(req, res) {
  sendDMail.sendQuestion('MSPB Question.', req.body.question);
})


module.exports = router;
