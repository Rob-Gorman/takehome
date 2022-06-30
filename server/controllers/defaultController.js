const axios = require('axios')
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
  console.log(req.method)
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
  // axios request to API x 3 ===> external function startCall
  // => 3 x `{id}`
  // req.body = `{phone: number, webhookURL: string}`
  // res.body = `{id: num, status: status}`
  // let inProcess = [{API_id: phones_arr_idx}]
  console.log("POST / request processing")
  let callArr = []
  for (i = 0; i < 3 ; i++) {
    callArr.push(startCall())
    console.log('callArr', callArr)
  }
  let respArr = await Promise.all(callArr)
  console.log('respArr', respArr)
  respArr.forEach(({id}, idx) => {
    id_map[id] = idx;
    console.log(id_map)
  })
  res.json(respArr)
}

const startCall = async(req, res, next) => {
  console.log('in startCall')
  let number = PHONE_NUMBERS[current_idx]
  current_idx++
  let reqObj = {
    phone: number,
    webhookURL: webhookURL
  }
  console.log('reqObj', reqObj)

  let APIres = await axios.post('http://localhost:4830/call', reqObj)
  console.log("APIres Body", APIres.data)
  return APIres.data
}

module.exports = { getNumbers, startCalls, startCall };