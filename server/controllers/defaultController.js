const axios = require('axios')
const SSE = require('express-sse')
const sse = new SSE();

const webhookURL =   `http://localhost:3001/webhookURL`
const PHONE_NUMBERS = [
"13018040009",
"19842068287",
"15512459377",
"19362072765",
"18582210308",
"13018040009",
"19842068287",
"15512459377",
"19362072765"
]

let id_map = {}
let current_idx = 0

const getNumbers = (req, res, next) => {
  let resObj = PHONE_NUMBERS.map((number, ind) => {
    return {
      phone: number,
      idx: ind,
      status: "idle",
    }
  })
  res.json(resObj)
}

const startCalls = async(req, res, next) => {
  let callArr = []
  for (i = 0; i < 3 ; i++) {
    callArr.push(startCall())
  }
  let respArr = await Promise.all(callArr)
  res.json(respArr)
}

const startCall = async(req, res, next) => {
  let ind = current_idx
  current_idx++

  let number = PHONE_NUMBERS[ind]
  let reqObj = {
    phone: number,
    webhookURL: webhookURL
  }
  
  let {data} = await axios.post('http://localhost:4830/call', reqObj)
  
  id_map[data.id] = ind;

  return data
}

const webhookHandler = async(req, res, next) => {
  const {id, status} = req.body
  const phoneIdx = id_map[id]
  const sseData = { idx: phoneIdx, status: status }
  
  sse.send(sseData)

  if (status === 'completed' && current_idx < PHONE_NUMBERS.length) startCall()

  // else reset current_idx to maintain functionality without server restart?
  
  res.status(200).send()
}

module.exports = { sse, getNumbers, startCalls, startCall, webhookHandler };