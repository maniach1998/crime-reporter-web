import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Home from './components/Home';

function App() {
	return (
		<CssVarsProvider>
			<Home />
		</CssVarsProvider>
	);
}

export default App;
