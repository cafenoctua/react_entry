import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';

import rootReducer from './reducers/index'
import {SELL_MEAT, SELL_VEGETABLE} from './reducers/actionTypes'
import reducerVegetable from './reducers/reducerVegetable';

function App() {

  const initialState = {
    reducerMeat: {numOfMeat: 30},
    reducerVegetable: {numOfVegetable: 25}
  }

  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => dispatch({type: SELL_MEAT})}>SELL meat</button>
        Today's Meat: {state.reducerMeat.numOfMeat}
        <button onClick={() => dispatch({type: SELL_VEGETABLE})}>SELL vegetable</button>
        Today's Vegetable: {state.reducerVegetable.numOfVegetable}
        
      </header>
    </div>
  );
}

export default App;
