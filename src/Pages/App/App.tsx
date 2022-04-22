import { FiDelete } from "react-icons/fi";

import { Container, NumberButton, NumberContainer, ResultContainer } from "./style";

function App() {
	return (
		<Container>
			<ResultContainer>
				teste
			</ResultContainer>
			<NumberContainer>
				<NumberButton>7</NumberButton>
				<NumberButton>8</NumberButton>
				<NumberButton>9</NumberButton>
				<NumberButton>4</NumberButton>
				<NumberButton>5</NumberButton>
				<NumberButton>6</NumberButton>
				<NumberButton>1</NumberButton>
				<NumberButton>2</NumberButton>
				<NumberButton>3</NumberButton>
				<NumberButton onClick={() => console.log("0")}>0</NumberButton>
				<NumberButton >,</NumberButton>
				<NumberButton ><FiDelete/></NumberButton>
			</NumberContainer>
				<NumberButton>√</NumberButton>
		</Container>
	);
}

export default App;
