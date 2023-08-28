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

router.get('/upmr', function(req, res) {
  res.render('upmr', '');
})

router.get('/staff', function(req, res) {
  res.render('staff', '');
})

router.get('/faqs', function(req, res) {
  res.render('faqs', '');
})

router.get('/tutorials', function(req, res) {
  res.render('tutorials', '');
})

router.post('/sendDMail', function(req, res) {
  sendDMail.sendQuestion('MSPB Question.', req.body.question);
})


module.exports = router;
