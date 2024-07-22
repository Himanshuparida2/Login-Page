import React, { Children, useState } from 'react'
import NameContext from './name';


const NameProvider = (props) => {
  const initialState = {
    name: ''
  };

  const [state, setState] = useState(initialState);

  const updateName = async(newName) => {
    setState({ ...state, name: newName });
  };

  return (
    <NameContext.Provider value={{ state, updateName }}>
      {props.children}
    </NameContext.Provider>
  );
};
export default NameProvider;