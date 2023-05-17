import { useEffect, useState } from 'react';

interface LongPressHandlers {
	onMouseDown: () => void;
	onMouseUp: () => void;
	onMouseLeave: () => void;
	onTouchStart: () => void;
	onTouchEnd: () => void;
}

export default function useLongPress(callback = () => { /* */ }, ms = 300): LongPressHandlers {
	const [startLongPress, setStartLongPress] = useState(false);

	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;

		if (startLongPress) {
			timerId = setTimeout(callback, ms);
		} else if (timerId) {
			clearTimeout(timerId);
		}

		return () => {
			if (timerId) clearTimeout(timerId);
		};
	}, [callback, ms, startLongPress]);

	return {
		onMouseDown: () => setStartLongPress(true),
		onMouseUp: () => setStartLongPress(false),
		onMouseLeave: () => setStartLongPress(false),
		onTouchStart: () => setStartLongPress(true),
		onTouchEnd: () => setStartLongPress(false),
	};
}
