const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var express = require('express');
var app = express();
var content;

app.get('/nlu', async function (req, res) {
  content = req.query.text;
  var result = await analyzer(content);
  res.send(result);
});



app.listen(8000, function () {
  console.log('NLU app listening on port 3000!');
});


const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: 'YOUR_KEY',
  }),
  url: 'URL',
});

async function analyzer(content){
var cont = content;
var res = "Erro";
const analyzeParams = {
  'features': {
    'relations': {}
  },
  'text': cont
};

await naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {

    console.log(JSON.stringify(analysisResults, null, 2));
    res = JSON.stringify(analysisResults, null, 2);

  })
  .catch(err => {

    console.log('error:', err);
  });
return res;
}
