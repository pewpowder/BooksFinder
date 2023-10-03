export const throttle = <T extends (...args: any) => any>(
	fn: T,
	delay: number
) => {
	let isRunning = false;
	return function (...args: Parameters<T>) {
		if (!isRunning) {
			isRunning = true;
			fn(args);

			const timeoutId = setTimeout(() => {
				isRunning = false;
				clearTimeout(timeoutId);
			}, delay);
		}
	};
};
