import { useState } from "react"
const { startCalls } = require("../lib/ApiClient")

const CallButton = () => {
  const [buttonClass, setButtonClass] = useState('')
  const [buttonText, setButtonText] = useState('Call')

  const handleClick = () => {
    setButtonClass('disabled')
    setButtonText('Ring Ring')
    startCalls()
  }

  return (
    <button onClick={handleClick} disabled={buttonClass} >{buttonText}</button>
  )
}

export default CallButton