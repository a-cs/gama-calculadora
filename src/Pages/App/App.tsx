/* eslint-disable no-eval */
import { useState} from "react";
import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, LeftContainer, DisplayContainer, RightContainer } from "./style";

function App() {
	const leftContainer = ["7","8","9","4","5","6","1","2","3","0"]
	const rightContainer = ["x", "-", "+"]
	const operators = ['/', 'x', '-', '+', ',']

	const [display, setDisplay] = useState("")
	const [displayResult, setDisplayResult] = useState("")
	const [isDecimalDisabled, setIsDecimalDisabled] = useState(false)

	const addValueToDisplay = (value:string) => {
		if (operators.includes(value) && display === "" && value !== ",")
			return
		else if (operators.includes(value) && operators.includes(display.slice(-1)) && value === display.slice(-1))
			return
		else if (value === "," && isDecimalDisabled)
			return
		else if (value === "0"
			&& (display === "0" || (operators.slice(0,-1).includes(display.slice(-2,-1))
			&& display.slice(-1) === "0")))
			return
		else if ((operators.includes(value) && operators.includes(display.slice(-1))
			&& value !== display.slice(-1)) && value !== ",")
			setDisplay(display.slice(0,-1) + value)
		else {
			if(value ==="," && (display === "" || operators.includes(display.slice(-1))))
				setDisplay(display + "0,")
			else if ((display === "0" || (operators.slice(0,-1).includes(display.slice(-2,-1)) && display.slice(-1) === "0")) && !operators.includes(value))
				setDisplay(display.slice(0, -1) + value)
			else
				setDisplay(display + value)
			if(value === ",")
				setIsDecimalDisabled(true)
			if(operators.slice(0, -1).includes(value))
				setIsDecimalDisabled(false)
		}
	}

	const calculate = () => {
		if (!operators.includes(display.slice(-1))){
			let result
			if (display !== ""){
				result = eval(display.replace(/x/g, "*").replace(/,/g,".")).toString().replace(".",",")
			}
			else
				result = 0
			setDisplayResult(`= ${result}`)
		}
	}

	const clearDisplay = () => {
		setDisplay("")
		setDisplayResult("")
		setIsDecimalDisabled(false)
	}

	const deleteLastValueOnDisplay = () => {
		if(display.slice(-1) === ",")
			setIsDecimalDisabled(false)
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
				{leftContainer.map(item => (
					<NumberButton
					onClick = {() => addValueToDisplay(item)}
					key = {item}
					>
						{item}
					</NumberButton>
				))}
				<NumberButton
					disabled = {isDecimalDisabled}
					onClick = {() => addValueToDisplay(",")}
					>
						,
					</NumberButton>
			</LeftContainer>
			<RightContainer>
				{rightContainer.map(item => (
					<NumberButton
					isOperator
					onClick = {() => addValueToDisplay(item)}
					key = {item}
					>
						{item}
					</NumberButton>
				))}
				<NumberButton
					disabled = {operators.includes(display.slice(-1))}
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
