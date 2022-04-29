import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background-color: #272b2e;
		/* height: 100vh; */
	}
`

export const theme ={
	background: "#484c4d",
	displayBackground: "#a6aeb0",
	displayText: "#0f110c",
	operatorsBackground: "#8e27e3",
	operatorsBackgroundDisabled: "#Cc54d7",
	numberBackground: "#4f5465",
	numberText: "#fff"

}
