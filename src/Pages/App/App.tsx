/* eslint-disable no-eval */
import { useState} from "react";
import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, LeftContainer, DisplayContainer, RightContainer } from "./style";

function App() {
	const leftContainer = ["7","8","9","4","5","6","1","2","3","0"]
	const rightContainer = ["x", "-", "+"]
	const operators = ['/', 'x', '-', '+']

	const [displayUpper, setDisplayUpper] = useState("")
	const [displayLower, setDisplayLower] = useState("")
	const [isDecimalDisabled, setIsDecimalDisabled] = useState(false)

	const addValueToDisplay = (value:string) => {
		if(!operators.includes(value)){
			if(displayUpper.slice(-1) === "="){
				setDisplayUpper("")
				if(value === ","){
					setIsDecimalDisabled(true)
					setDisplayLower("0,")
				}
				else
					setDisplayLower(value)
			} else if(value === "," && !isDecimalDisabled){
				setIsDecimalDisabled(true)
				if(displayLower === "")
					setDisplayLower(displayLower + "0,")
				else
					setDisplayLower(displayLower + value)
			} else {
				if(displayLower === "0")
					setDisplayLower(value)
				else
					setDisplayLower(displayLower + value)
			}
		} else {
			if(!displayLower && displayUpper.slice(-1) === value)
				return
			else if(displayUpper && !displayLower && displayUpper.slice(-1) !== value)
				setDisplayUpper(displayUpper.slice(0, -1) + value)
			else if(displayUpper.slice(-1) === "="){
				setDisplayUpper(displayLower + value)
				setDisplayLower("")
			}
			else{
				if(!displayLower)
				setDisplayUpper(displayUpper + "0" + value)
				else{
					if(displayLower.slice(-1) === ",")
						setDisplayUpper(displayUpper + displayLower.slice(0,-1) + value)
					else
					setDisplayUpper(displayUpper + displayLower + value)
				}
				setDisplayLower("")
				setIsDecimalDisabled(false)
			}
		}
	}

	const calculate = () => {
		const upper = displayUpper
		let lower
		if(displayLower === "")
			lower = "0"
		else if(displayLower.slice(-1) === ",")
			lower = displayLower.slice(0,-1)
		else
			lower = displayLower
		const joinedString = upper + lower
		const result = eval(joinedString.replace(/x/g, "*").replace(/,/g,".")).toLocaleString('pt-BR', {maximumFractionDigits: 20})
		setDisplayUpper(joinedString + " =")
		setDisplayLower(result)
		setIsDecimalDisabled(false)
	}

	const clearDisplay = () => {
		setDisplayUpper("")
		setDisplayLower("")
		setIsDecimalDisabled(false)
	}

	const deleteLastValueOnDisplay = () => {
		if(displayLower.slice(-1) === ",")
			setIsDecimalDisabled(false)
		setDisplayLower(displayLower.slice(0, -1))
	}
		return (
		<Container>
			<DisplayContainer>
				<div className="display">
					{displayUpper || ""}
				</div>
				<div className="result">
					{displayLower || "0"}
				</div>
			</DisplayContainer>
			<LeftContainer>
				<NumberButton
				isOperator
				onClick = {() => clearDisplay()}
				>
					C
				</NumberButton>
				<NumberButton
				disabled = {displayUpper.slice(-1) === "="}
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
					disabled = {displayUpper.slice(-1) === "="}
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
