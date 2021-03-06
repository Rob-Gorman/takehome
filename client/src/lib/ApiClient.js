import axios from 'axios'

const URL = `http://localhost:3001/`

function logError(errorResponse) {
  const response = errorResponse.response;
  
  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else console.error(`Error: ${errorResponse}`)
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export const getPhones = async() => {
  try {
    const {data} = await axios.get(URL);
    return data
  } catch (e) { logError(e) }
}

export const startCalls = async() => {
  try {
    const {data} = await axios.post(URL);
    return data;
  } catch (e) { logError(e) }
}

// Does this go here? Where should it go?
export const initSSE = async () => {
  try {
    return new EventSource(`${URL}stream`)
  } catch (e) { logError(e) }
}