import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calender from './pages/Calender';
import Dashboard from './pages/Dashboard';
import { CalenderProvider } from './context/CalenderContext';

function App() {
	return (
		<CalenderProvider>
			<Router>
				<Routes>
					<Route path='/calender' element={<Calender />} />
					<Route path='/' element={<Calender />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
			</Router>
		</CalenderProvider>
	);
}

export default App;
