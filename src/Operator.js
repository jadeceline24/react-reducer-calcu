import React from 'react'
import { ACTIONS } from './App'


export default function Operator({operation, dispatch}) {
  return (
    <button onClick={()=> dispatch({type: ACTIONS.OPERATOR_DIGIT, payload: {operation}})}>{operation}</button>
  )
}
