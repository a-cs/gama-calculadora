/* eslint-disable no-eval */
import { useState } from "react";
import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, LeftContainer, DisplayContainer, RightContainer } from "./style";

function App() {
	const digits = ["7","8","9","4","5","6","1","2","3","0"]
	const operators = ["x", "-", "+"]
	const ops = ['/', 'x', '-', '+', ',']

	const [display, setDisplay] = useState("")
	const [displayResult, setDisplayResult] = useState("")
	const [isDecimal, setIsDecimal] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)

	const addValueToDisplay = (value:string) => {
		if ((ops.includes(value) && display === "" && value !== ",")
			|| ((ops.includes(value) && ops.includes(display.slice(-1)))
			&& value === display.slice(-1)) || ((value === ",") && isDecimal))
			return
		else if ((ops.includes(value) && ops.includes(display.slice(-1))
			&& value !== display.slice(-1)) && value !== ",")
			setDisplay(display.slice(0,-1) + value)
		else {
			if(value ==="," && (display === "" || ops.includes(display.slice(-1))))
				setDisplay(display + "0,")
			else
				setDisplay(display + value)
			if(value === ","){
				setIsDecimal(true)
				setIsDisabled(true)
			}
			if(ops.slice(0, -1).includes(value)){
				setIsDecimal(false)
				setIsDisabled(true)
			}
			else
				setIsDisabled(false)
		}
		console.log(`disabled = ${isDisabled}`)
	}

	const calculate = () => {
		let result
		if (display !== ""){
			result = eval(display.replace(/x/g, "*").replace(/,/g,".")).toString().replace(".",",")
		}
		else
			result = 0
		setDisplayResult(`= ${result}`)
	}

	const clearDisplay = () => {
		setDisplay("")
		setDisplayResult("")
		setIsDecimal(false)
	}

	const deleteLastValueOnDisplay = () => {
		if(display.slice(-1) === ",")
			setIsDecimal(false)
		setDisplay(display.slice(0, -1))
	}
		return (
		<Container>
			<DisplayContainer>
				<div className="display">
					{display || "0"}
				</div>
				<div className="result">
					{displayResult || ""}
				</div>
			</DisplayContainer>
			<LeftContainer>
				<NumberButton
				isOperator
				onClick = {() => clearDisplay()}
				>
					CE
				</NumberButton>
				<NumberButton
				isOperator
				onClick = {() => deleteLastValueOnDisplay()}
				>
					<FiDelete />
				</NumberButton>
				<NumberButton
				isOperator
				onClick = {() => addValueToDisplay("/")}
				>
					/
				</NumberButton>
				{digits.map(digit => (
					<NumberButton
					onClick = {() => addValueToDisplay(digit)}
					key = {digit}
					>
						{digit}
					</NumberButton>
				))}
				<NumberButton
					disabled = {isDecimal}
					onClick = {() => addValueToDisplay(",")}
					>
						,
					</NumberButton>
			</LeftContainer>
			<RightContainer>
				{operators.map(operator => (
					<NumberButton
					isOperator
					onClick = {() => addValueToDisplay(operator)}
					key = {operator}
					>
						{operator}
					</NumberButton>
				))}
				<NumberButton
					disabled = {isDisabled}
					isOperator
					onClick = {() => calculate()}
				>
						=
				</NumberButton>
			</RightContainer>
		</Container>
	);
}

export default App;
