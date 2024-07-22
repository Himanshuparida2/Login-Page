import React, { useContext } from 'react'
import NameContext from "../context/name";
function Home() {
  const { state , updateName} = useContext(NameContext);
  return (
    <div>
      i Am Home
      <h2>Hello {state.name}</h2>
    </div>
  )
}

export default Home;
