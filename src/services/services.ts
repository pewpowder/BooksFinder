export const throttle = <T extends (...args: Parameters<T>) => any>(
	fn: T,
	delay: number
) => {
	let isRunning = false;
	let savedCall: (() => void) | null = null;

	return function (...args: Parameters<T>) {
		if (isRunning) {
			savedCall = () => fn(...args);
			return;
		}

		fn(...args);
		isRunning = true;

		const timerId = setTimeout(() => {
			if (savedCall) {
				savedCall();
				savedCall = null;
			}
			isRunning = false;
			clearTimeout(timerId);
		}, delay);
	};
};
