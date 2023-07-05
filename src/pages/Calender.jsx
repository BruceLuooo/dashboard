import { useContext, useState, useEffect } from 'react';
import CalenderHeader from '../components/calender/CalenderHeader';
import Sidebar from '../components/Sidebar';
import CalenderMonth from '../components/calender/CalenderMonth';
import CalenderWeek from '../components/calender/CalenderWeek';
import CalenderContext from '../context/CalenderContext';
import { getMonth, getWeek } from '../utils/util';
import CustomContextMenu from '../components/CustomContextMenu';

function Calender() {
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const [currentWeek, setCurrentWeek] = useState(getWeek(0));
	const [viewSetting, setViewSetting] = useState('month');
	const {
		monthIndex,
		weekIndex,
		setShowModal,
		setMouseRightClick,
		mouseRightClick,
		rightClickPoints,
		setWeekStartTime,
	} = useContext(CalenderContext);

	useEffect(() => {
		const handleClick = () => {
			setMouseRightClick(false);
			setShowModal(false);
			setWeekStartTime(null);
		};
		window.addEventListener('click', handleClick);
		window.addEventListener('contextmenu', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
			window.addEventListener('contextmenu', handleClick);
		};
	}, []);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	useEffect(() => {
		setCurrentWeek(getWeek(weekIndex));
	}, [weekIndex, monthIndex]);

	return (
		<div className='main-container'>
			<Sidebar currentPage={'Calender'} />
			<div className='calender-container'>
				<CalenderHeader
					setting={viewSetting}
					setViewSetting={setViewSetting}
					currentWeek={currentWeek}
				/>
				{viewSetting === 'month' ? (
					<CalenderMonth month={currentMonth} />
				) : (
					<CalenderWeek week={currentWeek} />
				)}
			</div>
			{mouseRightClick && <CustomContextMenu points={rightClickPoints} />}
		</div>
	);
}

export default Calender;
