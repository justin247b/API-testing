const express = require('express')
const app = express()
const port = 5000;

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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'
    //'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'
    //apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function newfunction() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Correct this to standard English:\n\nShe no went to the market.",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    
    return response.data.choices[0].text
    console.log(response.data)
  }
// console.log(process.env.OPENAI_API_KEY)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/GrammerCorrection', async (req, res) => {
    const answer = await newfunction()
    res.send(answer)
    
  })
  //console.log(answer)
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
