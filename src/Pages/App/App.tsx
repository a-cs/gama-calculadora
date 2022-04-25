/* eslint-disable no-eval */
import { useState } from "react";
import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, LeftContainer, DisplayContainer, RightContainer } from "./style";

function App() {
	const digits = ["7","8","9","4","5","6","1","2","3","0",","]
	const operators = ["x", "-", "+"]
	const ops = ['/', 'x', '-', '+', ',']

	const [display, setDisplay] = useState("")
	const [displayResult, setDisplayResult] = useState("")

	const addValueToDisplay = (value:string) => {
		if ((ops.includes(value) && display === "")
			|| ((ops.includes(value) && ops.includes(display.slice(-1)))
			&& value === display.slice(-1)))
			return
		if ((ops.includes(value) && ops.includes(display.slice(-1))
			&& value !== display.slice(-1)))
			setDisplay(display.slice(0,-1) + value)
		else
			setDisplay(display + value)
	}

	const calculate = () => {
		setDisplayResult(`= ${eval(display.replace("x", "*")).toString()}`)
	}

	const clearDisplay = () => {
		setDisplay("")
		setDisplayResult("")
	}

	const deleteLastValueOnDisplay = () => {
			setDisplay(display.slice(0, -1))
	}
		return (
		<Container>
			<DisplayContainer>

				{display || "0"}
				<br/>
				{displayResult || ""}
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
