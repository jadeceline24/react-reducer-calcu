import React from "react";
import { useReducer } from "react";
import Digits from "./Digits";
import Operator from "./Operator";

export const ACTIONS = {
  ADD_DIGIT : 'addDigit',
  DEL_DIGIT : 'delDigit',
  OPERATOR_DIGIT: 'operator',
  CLEAR_DIGIT : 'clearDigit',
  EVALUATE: 'evaluate',
}

function reducer(state, {type, payload}){
  switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOp: payload.digit,
            overwrite: false,
          }
        }
        if (payload.digit === "0" && state.currentOp === "0") {
          return state
        }
        if (payload.digit === "." && state.currentOp.includes(".")) {
          return state
        }
  
        return {
          ...state,
          currentOp: `${state.currentOp || ""}${payload.digit}`,
        }
      case ACTIONS.OPERATOR_DIGIT:
        if (state.currentOp == null && state.prevOp == null) {
          return state
        }
  
        if (state.currentOp == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
  
        if (state.prevOp == null) {
          return {
            ...state,
            operation: payload.operation,
            prevOp: state.currentOp,
            currentOp: null,
          }
        }
  
        return {
          ...state,
          prevOp: evaluate(state),
          operation: payload.operation,
          currentOp: null,
        }
      case ACTIONS.CLEAR_DIGIT:
        return {}
      case ACTIONS.DEL_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOp: null,
          }
        }
        if (state.currentOp == null) return state
        if (state.currentOp.length === 1) {
          return { ...state, currentOp: null }
        }
  
        return {
          ...state,
          currentOp: state.currentOp.slice(0, -1),
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOp == null ||
          state.prevOp == null
        ) {
          return state
        }
  
        return {
          ...state,
          overwrite: true,
          prevOp: null,
          operation: null,
          currentOp: evaluate(state),
        }
        default:
        return 
    }
  }
      
  

function evaluate({currentOp, prevOp, operation}){
  const prev = parseFloat(prevOp)
  const current = parseFloat(currentOp)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
      default:
      break
  }

  return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOp, prevOp, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-val">{formatOperand(prevOp)}{operation}</div>
        <div className="current-val">{formatOperand(currentOp)}</div>
      </div>
      
        <button className="clear" onClick={()=>dispatch({type:ACTIONS.CLEAR_DIGIT})}>AC</button>
        <button onClick={()=>dispatch({type:ACTIONS.DEL_DIGIT})}>DEL</button>
        <Operator operation={'÷'} dispatch={dispatch} />
        <Digits digit={'1'} dispatch={dispatch} />
        <Digits digit={'2'} dispatch={dispatch} />
        <Digits digit={'3'} dispatch={dispatch} />
        <Operator operation={'*'} dispatch={dispatch} />
        <Digits digit={'4'} dispatch={dispatch} />
        <Digits digit={'5'} dispatch={dispatch} />
        <Digits digit={'6'} dispatch={dispatch} />
        <Operator operation={'+'} dispatch={dispatch} />
        <Digits digit={'7'} dispatch={dispatch} />
        <Digits digit={'8'} dispatch={dispatch} />
        <Digits digit={'9'} dispatch={dispatch} />
        <Operator operation={'-'} dispatch={dispatch} />
        <Digits digit={'.'} dispatch={dispatch} />
        <Digits digit={'0'} dispatch={dispatch} />
        <button className="equals"onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>

      
    </div>
  );
}

export default App;
