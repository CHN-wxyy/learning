import React, { createContext,useContext,useReducer } from 'react';
 
export const countText = createContext({})
export const updateCount = 'updateCount'
const reducer = (state,avtion) => {
  switch (avtion.type) {
    case 'updateCount':
      return avtion.count;
    default:
      return state
  }
}