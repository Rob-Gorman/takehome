import { useState } from "react"
const { startCalls } = require("../lib/ApiClient")

let sse;

const CallButton = () => {
  const [buttonClass, setButtonClass] = useState('')
  const [buttonText, setButtonText] = useState('Call')

  const handleClick = () => {
    setButtonClass('disabled')
    setButtonText('Ring Ring')
    sse = new EventSource(`${URL}stream`) // need to catch error here?
    startCalls()
  }

  return (
    <button onClick={handleClick} disabled={buttonClass} >{buttonText}</button>
  )
}

export default CallButton, sse