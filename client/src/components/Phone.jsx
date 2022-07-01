const Phone = ({info}) => {
  const {phone, status} = info
  return <div>{phone}: {status}</div>
}

export default Phone