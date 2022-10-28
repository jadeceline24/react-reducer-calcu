import React from 'react'
import { ACTIONS } from './App'


export default function Digits({digit, dispatch}) {
  return (
    <button onClick={()=> dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
  )
}
