import styled from "styled-components";

interface ButtonProps {
	readonly isOperator?: boolean;
}

export const Container = styled.div`
	box-sizing: border-box;
	max-width: 365px;
	height: 500px;
	margin: 25vh auto;
	padding: 32px;
	border-radius: 24px;
	background-color: ${props => props.theme.background};
	display: grid;
	grid-template-rows: 2fr 5fr;
	grid-template-columns: 3fr 1fr;
	@media screen and (max-width: 350px) {
		padding: 32px 12px;
		border-radius: 16px;
	}
`

export const DisplayContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 4;
	grid-auto-columns: 74px;
	grid-auto-rows: 60px;
	overflow: auto;
	color: ${props => props.theme.displayText};
	font-family: 'Share Tech', sans-serif;
	font-size: 40px;
	text-align: right;
	background-color: ${props => props.theme.displayBackground};
	border: 5px solid ${props => props.theme.displayBackground};
	border-radius: 8px 8px 6px 6px;
	padding: 4px 12px;
	margin-bottom: 4px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const LeftContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-columns: 74px;
	grid-auto-rows: 60px;
	gap: 1px 2px;
`

export const RightContainer = styled.div`
	margin-left: 2px;
	display: grid;
	grid-row: repeat (5 1fr);
	grid-auto-columns: 74px;
	grid-auto-rows: 60px;
	row-gap: 1px;
`

export const NumberButton = styled.button<ButtonProps> `
	padding: 8px 12px;
	border-radius: 12px;
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
		opacity: 0.7;
	}
	&:disabled {
		opacity: 0.3;
	}
`