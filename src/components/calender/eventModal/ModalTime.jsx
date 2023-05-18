import { useContext, useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import CalenderContext from '../../../context/CalenderContext';
import clock from '../../../assets/clock.png';
import {
	updateEventTimes,
	updateEndTime,
	calculateTimeDifference,
	getStartTimeSlots,
	getEndTimeSlots,
} from '../../../utils/EventModalUtil';

function ModalTime({ startTime, setStartTime, endTime, setEndTime }) {
	const { daySelected } = useContext(CalenderContext);
	const dropdownRef = useRef(null);

	const [openStartTime, setOpenStartTime] = useState(false);
	const [openEndTime, setOpenEndTime] = useState(false);
	const [timeSlots, setTimeSlots] = useState([]);
	const [endTimeSlots, setEndTimeSlots] = useState([]);
	const [timeDifference, setTimeDifference] = useState(null);

	useEffect(() => {
		setTimeDifference(calculateTimeDifference(endTime, startTime));
	}, [endTime]);

	useEffect(() => {
		setTimeSlots(getStartTimeSlots());
	}, []);

	useEffect(() => {
		setEndTimeSlots(getEndTimeSlots(startTime));
	}, [startTime]);

	useEffect(() => {
		let index = null;

		if (openStartTime) {
			index = timeSlots.findIndex(time => time.format('h:mm A') === startTime);
		} else {
			index = endTimeSlots.findIndex(time => time.format('h:mm A') === endTime);
		}

		if (dropdownRef.current) {
			const scrollPosition = (index - 2) * 41;
			dropdownRef.current.scrollTop = scrollPosition;
		}
	}, [openStartTime, openEndTime]);

	const startTimeModal = () => {
		setOpenStartTime(true);
		setOpenEndTime(false);
	};
	const endTimeModal = () => {
		setOpenEndTime(true);
		setOpenStartTime(false);
	};

	const updateEventStartTime = current => {
		const { newStartTime, newEndTime } = updateEventTimes(
			startTime,
			current,
			timeDifference,
		);

		setStartTime(newStartTime.format('h:mm A'));
		setEndTime(newEndTime.format('h:mm A'));

		setOpenStartTime(false);
	};
	const updateEventEndTime = current => {
		const newEndTime = updateEndTime(endTime, current);
		setEndTime(dayjs(newEndTime).format('h:mm A'));
		setOpenEndTime(false);
	};

	return (
		<div className='modal layout'>
			<img src={clock} alt='' className='modal-image' />
			<div>{daySelected.format('dddd, MMMM DD')}</div>
			<div className='time-period'>
				<div className='time-period-select'>
					<div onClick={startTimeModal}>{startTime}</div>
					<div
						className={`time-period-modal-active ${
							openStartTime && 'underline'
						}`}
					></div>
					{openStartTime && (
						<div className='time-period-modal' ref={dropdownRef}>
							{timeSlots.map((time, index) => (
								<div key={index}>
									<div
										key={time}
										onClick={() => updateEventStartTime(time)}
										className={`time-slots ${
											time.format('h:mm A') ===
												dayjs(startTime, 'h:mm A').format('h:mm A') &&
											'current-selected-time'
										}`}
									>
										{time.format('h:mm A')}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div>-</div>
				<div className='time-period-select'>
					<div onClick={endTimeModal}>{endTime}</div>
					<div
						className={`time-period-modal-active ${openEndTime && 'underline'}`}
					></div>
					{openEndTime && (
						<div className='time-period-modal' ref={dropdownRef}>
							{endTimeSlots.map((time, index) => (
								<div key={index}>
									<div
										key={time}
										onClick={() => updateEventEndTime(time)}
										className={`time-slots  ${
											time.format('h:mm A') ===
												dayjs(endTime, 'h:mm A').format('h:mm A') &&
											'current-selected-time'
										}`}
									>
										{time.format('h:mm A')}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModalTime;
