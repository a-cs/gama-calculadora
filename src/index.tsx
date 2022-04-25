import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App/App';

import { GlobalStyle, theme } from "./globalstyle";
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);