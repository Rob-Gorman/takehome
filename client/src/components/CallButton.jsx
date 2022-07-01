import { useState } from "react"
const { startCalls, initSSE } = require("../lib/ApiClient")

const CallButton = ({setSSE}) => {
  const [buttonClass, setButtonClass] = useState('')
  const [buttonText, setButtonText] = useState('Call')

  const handleClick = async () => {
    setButtonClass('disabled')
    setButtonText('Ring Ring')
    startCalls()
    initSSE().then(value => setSSE(value))
  }

  return (
    <button onClick={handleClick} disabled={buttonClass} >{buttonText}</button>
  )
}

export default CallButton