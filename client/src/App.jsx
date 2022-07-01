import React from 'react';
import react, {useState, useEffect} from 'react'
import { useCallback } from 'react';
import CallButton from './components/CallButton';
import Phone from './components/Phone';
import { getPhones, sse } from './lib/ApiClient';

function App() {
  const [ phones, setPhones ] = useState([]);

  const evalSSEClose = useCallback(() => {
    let numCompleted = phones.filter(({status}) => status === 'completed').length
    if (numCompleted === phones.length) {
      sse.close()
    }
  }, [phones])

  useEffect(() => {
    let fetchNumbers = async() => {
      let nums = await getPhones();
      setPhones(nums)
    }
    fetchNumbers()
  }, [])

  useEffect(() => {
    console.log("in useEffect", phones)  // debugging
    function parseMessage(data) {
      console.log('incoming wh data', data)  //debugging
      let {idx, status} = JSON.parse(data)
      console.log("idx, status", idx, status) //debugging
      let newState = phones.map(phoneObj => {
        if (phoneObj.idx === idx && phoneObj.status !== 'completed') {
          return {idx, status, phone: phoneObj.phone}
        }
        return phoneObj
      })
      setPhones(newState)
      evalSSEClose()
    }
    sse.onmessage = e => parseMessage(e.data)
  }, [phones])



  if (!phones) return null

  return (
    <React.Fragment>
      <ul>
        {phones.map(phone => <Phone key={phone.idx} info={phone} />)}
      </ul>
      <CallButton/>
    </React.Fragment>
  );
}

export default App;
