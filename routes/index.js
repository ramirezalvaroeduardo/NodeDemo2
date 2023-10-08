var express = require('express');
var router = express.Router();
var sendDMail = require('./mailHelper');
var qnaHelper = require('./qnaHelper');
var lgnHelper = require('./lgnHelper')

//var app = undefined; 

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('index', { title: 'MSPB' });
  }
});

router.post('/login', function(req, res, next) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('index', { title: 'MSPB' });
  }
});


router.post('/checkPwd', function(req, res) {
    const lgnData = req.body;
    lgnHelper.checkPwd(lgnData.userId, lgnData.inPwd, function(err1, res1){
      if(err1) { console.log("Error...:", err1); return {err: err1};}
      else {   console.log('Res.....:', res1.userId); loggedIn = true; res.render('index', { title: 'MSPB' });} 
    });
})


router.get('/pvdr', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('pvdr', '');
  }
})

router.get('/upmr', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('upmr', '');
  }
})

router.get('/staff', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('staff', '');
  }
})

router.get('/faqs', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    qnaHelper.getQNASL(slConn, function(err, data){
      if (err) {
        console.log('Error grabbing data from DB:', err)
        data = [];
      }
      res.render('faqs', {qnaArray: data});
    });
  }
})

router.get('/docs', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('docs', '');
  }
})

router.get('/tutorials', function(req, res) {
  if(!loggedIn) {
    res.render('login');
  } else {
    res.render('tutorials', '');
  }
})

router.post('/addQuestion', function(req, res) {
  const qnaData = req.body;
  qnaHelper.addQNA(pgPool, qnaData, function(err, data){
    if (err) {
      console.log('Error adding data to DB:', err)
      res.sendStatus(500).end();
    } else {
      res.sendStatus(200).end();
    }
  });
})

router.post('/delQuestion', function(req, res) {
  const qnaData = req.body;
  qnaHelper.delQNA(pgPool, qnaData, function(err, data){
    if (err) {
      console.log('Error removing data from DB:', err)
      res.sendStatus(500).end();
    } else {
      res.sendStatus(200).end();
    }
  });
})

router.post('/updQuestion', function(req, res) {
  const qnaData = req.body;
  qnaHelper.updQNA(pgPool, qnaData, function(err, data){
    if (err) {
      console.log('Error updating data to DB:', err)
      res.sendStatus(500).end();
    } else {
      res.sendStatus(200).end();
    }
  });
})

router.post('/sendDMail', function(req, res) {
  //if (app === undefined) app = require('../app');
  sendDMail.sendQuestion('MSPB Question.', req.body.question);
})


module.exports = router;
