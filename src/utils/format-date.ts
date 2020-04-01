export default function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = (1 + date.getMonth()).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const formattedMinutes = Math.ceil(Math.log10(minutes + 1)) === 1 ? minutes.toString().padStart(2, '0') : minutes;

	if (formattedMinutes === 0) {
		return 'invalid';
	}

	return `${month}/${day}/${year} ${hours}:${formattedMinutes}`;
}
