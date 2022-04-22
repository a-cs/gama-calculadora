import styled from "styled-components";

export const Container = styled.div`
	max-width: 300px;
	margin: 200px auto;
	padding: 32px;
	border-radius: 24px;
	background-color: #484c4d;
	color: #fff;
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 3fr 1fr;
	column-gap: 4px;
`

export const ResultContainer = styled.div`
	grid-column-start: 1;
  	grid-column-end: 4;
	color: #a6aeb0;
	border: 5px solid #a6aeb0;
	font-family: 'Share Tech', sans-serif;
	font-size: 40px;
	padding: 4px 12px;
`

export const NumberContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: 4px;
`

export const NumberButton = styled.button `
	padding: 8px 12px;
	background-color: #4f5465;
	color: #fff;
	font-family: 'Share Tech', sans-serif;
	font-size: 32px;
	font-weight: 700;
	/* display: flex;
	justify-content: center;
	align-items: center; */


`