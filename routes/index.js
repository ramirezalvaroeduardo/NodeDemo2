var express = require('express');
var router = express.Router();
var sendDMail = require('./mailHelper.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MSPB' });
});

router.get('/pvdr', function(req, res) {
  res.render('pvdr', '');
})

router.get('/mgr', function(req, res) {
  res.render('mgr', '');
})

router.get('/staff', function(req, res) {
  res.render('staff', '');
})

router.get('/faqs', function(req, res) {
  res.render('faqs', '');
})

router.post('/sendDMail', function(req, res) {
  sendDMail.sendQuestion('MSPB Question.', req.body.question);
})


module.exports = router;
