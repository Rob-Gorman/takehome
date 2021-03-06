import React from 'react';
import {useState, useEffect, useCallback} from 'react'
import CallButton from './components/CallButton';
import Phone from './components/Phone';
import { getPhones } from './lib/ApiClient';

function App() {
  const [ phones, setPhones ] = useState([]);
  const [ sse, setSse ] = useState(null)

  // important to close SSE connection?
  const evalSSEClose = useCallback(() => {
    let numCompleted = phones.filter(({status}) => status === 'completed').length
    if (numCompleted === phones.length) {
      sse.close()
    }
  }, [phones, sse])

  useEffect(() => {
    let fetchNumbers = async() => {
      let nums = await getPhones();
      setPhones(nums)
    }
    fetchNumbers()
  }, [])

  // is this appropriate management of the SSE connection?
  // this App.jsx is getting pretty bloated. Is it time to extract phones to context? redux?
  useEffect(() => {
    if (sse) {
      function parseMessage(data) {
        let {idx, status} = JSON.parse(data)
        let newState = phones.map(phoneObj => {
          if (phoneObj.idx === idx && phoneObj.status !== 'completed') {
            return {idx, status, phone: phoneObj.phone}
          } else return phoneObj
        })

        setPhones(newState)
        evalSSEClose()
      }

      sse.onmessage = e => parseMessage(e.data)
    }
  }, [phones, evalSSEClose, sse])

  if (!phones) return null
  return (
    <React.Fragment>
      <ul>
        {phones.map(phone => <Phone key={phone.idx} info={phone} />)}
      </ul>
      <CallButton setSSE={setSse}/>
    </React.Fragment>
  );
}

export default App;
