const { startCalls } = require("../lib/ApiClient")

const CallButton = () => {
  return (
    <button onClick={startCalls}>Call</button>
  )
}

export default CallButton