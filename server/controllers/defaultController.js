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
  let callArr = []
  for (i = 0; i < 3 ; i++) {
    callArr.push(startCall(req, res, next))
  }
  let respArr = await Promise.all(callArr)
  console.log(respArr)
  respArr.forEach(({id}, idx) => {
    id_map[id] = idx;
    console.log(id_map)
  })
  res.json(respArr)
}

const startCall = async(req, res, next) => {
  let number = PHONE_NUMBERS[current_idx]
  current_idx++
  let reqObj = {
    phone: number,
    webhookURL: webhookURL
  }

  let APIres = await axios.post('http://localhost:4830/call', reqObj)
  return APIres
}

module.exports = getNumbers, startCalls;