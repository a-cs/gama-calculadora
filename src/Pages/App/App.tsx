/* eslint-disable no-eval */
import { useState} from "react";
import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, LeftContainer, DisplayContainer, RightContainer } from "./style";

function App() {
	const leftContainer = ["7","8","9","4","5","6","1","2","3","0"]
	const rightContainer = ["x", "-", "+"]
	const operators = ['/', 'x', '-', '+']
	const maxDecimalPlaces = 3

	const [displayUpper, setDisplayUpper] = useState("")
	const [displayLower, setDisplayLower] = useState("")
	const [isDecimalDisabled, setIsDecimalDisabled] = useState(false)
	const [decimalPlaces, setDecimalPlaces] = useState(0)
	const [error, setError] = useState(false)

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
				setDecimalPlaces(0)
				if(displayLower === "")
					setDisplayLower(displayLower + "0,")
				else
					setDisplayLower(displayLower + value)
			} else {
				if(displayLower === "0")
					setDisplayLower(value)
				else{
					if(isDecimalDisabled)
						setDecimalPlaces(decimalPlaces + 1)
					setDisplayLower(displayLower + value)
				}
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
				setDecimalPlaces(0)
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
		const formatedString = joinedString.replace(/x/g, "*").replace(/\./g,"").replace(/,/g,".")
		const result:number = eval(formatedString)
		let formatedResult
		if(isNaN(result)){
			setError(true)
			formatedResult = "O valor não é um número"
		} else if (!isFinite(result)){
			setError(true)
			formatedResult = result.toLocaleString("pt-Br")
		}
		else
			formatedResult = String(parseFloat(result.toFixed(maxDecimalPlaces))).replace(/\./g,",")
		setDisplayUpper(joinedString + " =")
		setDisplayLower(formatedResult)
		setIsDecimalDisabled(false)
		setDecimalPlaces(0)
	}

	const clearDisplay = () => {
		setDisplayUpper("")
		setDisplayLower("")
		setIsDecimalDisabled(false)
		setDecimalPlaces(0)
		setError(false)
	}

	const deleteLastValueOnDisplay = () => {
		if(displayLower.slice(-1) === ",")
			setIsDecimalDisabled(false)
		setDisplayLower(displayLower.slice(0, -1))
		if(isDecimalDisabled)
			setDecimalPlaces(decimalPlaces - 1)
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
				disabled = {displayUpper.slice(-1) === "=" || error}
				isOperator
				onClick = {() => deleteLastValueOnDisplay()}
				>
					<FiDelete />
				</NumberButton>
				<NumberButton
				disabled = {error}
				isOperator
				onClick = {() => addValueToDisplay("/")}
				>
					/
				</NumberButton>
				{leftContainer.map(item => (
					<NumberButton
					disabled = {decimalPlaces >= maxDecimalPlaces || error}
					onClick = {() => addValueToDisplay(item)}
					key = {item}
					>
						{item}
					</NumberButton>
				))}
				<NumberButton
					disabled = {isDecimalDisabled || error}
					onClick = {() => addValueToDisplay(",")}
					>
						,
					</NumberButton>
			</LeftContainer>
			<RightContainer>
				{rightContainer.map(item => (
					<NumberButton
					disabled = {error}
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
