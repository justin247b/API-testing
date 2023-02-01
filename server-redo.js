const express = require('express')
const app = express()
const port = 5000

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

correctEnglish()
 async function correctEnglish() {
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Correct this to standard English:\n\nShe no went to the market. She went to they're place",
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
})
  console.log(response.data)
  return response.data.choices[0].text

}

const fs = require('fs');
fs.readFile('Input.txt', 'utf-8', (err, longText) => {
  if (err) throw err;

  console.log(longText);
  //console.log(correctEnglishLongText(longText))
  return correctEnglishLongText2(longText);
})


async function correctEnglishLongText(chunk) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: chunk,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
})
  console.log(response.data)
  return response.data.choices[0].text
}
  
  
  async function correctEnglishLongText2(longText) {
    const chunkSize = 1000;
    let correctedText = "";
    for (let i = 0; i < longText.length; i += chunkSize) {
      const chunk = longText.substring(i, i + chunkSize);
      const correctedChunk = await correctEnglishLongText(chunk);
      correctedText += correctedChunk;
    }
    console.log(correctedText)
    return correctedText;
  }

// keywordExtract()

// async function keywordExtract() {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Extract keywords from this text:\n\nBlack-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha'po Owingeh and P'ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors.",
//     temperature: 0.5,
//     max_tokens: 60,
//     top_p: 1.0,
//     frequency_penalty: 0.8,
//     presence_penalty: 0.0,
//   });
//   console.log(response.data)
//   return response.data.choices[0].text
// }

// jsChatBot()

// async function jsChatBot() {
//   const response = await openai.createCompletion({
//     model: "code-davinci-002",
//     prompt: "You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an object?\nJavaScript chatbot",
//     temperature: 0,
//     max_tokens: 60,
//     top_p: 1.0,
//     frequency_penalty: 0.5,
//     presence_penalty: 0.0,
//     stop: ["You:"],
//   });
//   console.log(response.data)
//   return response.data.choices[0].text
// }

// translateToCode()

// async function translateToCode() {
//   const response = await openai.createCompletion({
//     model: "code-davinci-002",
//     prompt: "##### Translate this function  from Python into Haskell\n### Python\n    \n    def predict_proba(X: Iterable[str]):\n        return np.array([predict_one_probas(tweet) for tweet in X])\n    \n### Haskell",
//     temperature: 0,
//     max_tokens: 54,
//     top_p: 1.0,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//     stop: ["###"],
//   });
//   console.log(response.data)
//   return response.data.choices[0].text
// }

// imageGen()

// async function imageGen() {
//   const response = await openai.createImage({
//     prompt: "White Dachund playing with orange cat",
//     n: 3,
//     size: "1024x1024",
//   });
//   image_url = response.data.data[0].url;
//   console.log(response.data)
//   return response.data.data[0].url

// }



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/GrammerCorrection', async (req, res) => {
    const answer = await correctEnglish()
    res.send(answer)
  })

  app.get('/GrammerCorrectionLong', async (req, res) => {
    const answer = await correctEnglishLongText2()
    res.send(answer)
  })
  
  // app.get('/Keyword', async (req, res) => {
  //   const answer = await keywordExtract()
  //   res.send(answer)
    
  // })

  // app.get('/jschatbot', async (req, res) => {
  //   const answer = await jsChatBot()
  //   res.send(answer)
    
  // })

  // app.get('/translate-to-code', async (req, res) => {
  //   const answer = await translateToCode()
  //   res.send(answer)
    
  // })

  // app.get('/image-gen', async (req, res) => {
  //   const answer = await imageGen()
  //   res.send(answer)
    
  // })




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })