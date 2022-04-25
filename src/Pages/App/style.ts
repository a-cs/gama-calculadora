import styled from "styled-components";

interface ButtonProps {
	readonly isOperator?: boolean;
}

export const Container = styled.div`
	max-width: 300px;
	margin: 200px auto;
	padding: 32px;
	border-radius: 24px;
	background-color: ${props => props.theme.background};
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 3fr 1fr;
`

export const DisplayContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-auto-columns: 80px;
	grid-auto-rows: 60px;
	overflow: auto;
	color: ${props => props.theme.displayBackgronud};
	font-family: 'Share Tech', sans-serif;
	font-size: 40px;
	text-align: right;
	border: 5px solid ${props => props.theme.resultBackgronud};
	padding: 4px 12px;
`

export const LeftContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-columns: 80px;
	grid-auto-rows: 60px;
	gap: 2px;
`

export const RightContainer = styled.div`
	display: grid;
	grid-row: repeat (5 1fr);
	grid-auto-columns: 80px;
	grid-auto-rows: 60px;
	gap: 2px;
`

export const NumberButton = styled.button<ButtonProps> `
	padding: 8px 12px;
	border-radius: 4px;
	background-color: ${props => props.isOperator ? props.theme.operatorsBackground : props.theme.numberBackground};
	color: ${props => props.theme.numberText};
	font-family: 'Share Tech', sans-serif;
	font-size: 32px;
	font-weight: 700;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	grid-column:${props => props.children === "0" ? "1 / 3": "auto"};
	grid-row: ${props => props.children === "=" ? "4 / span 2": "0"};
	transition: 0.2s;
	&:hover {
		opacity: 0.6;
	}

`