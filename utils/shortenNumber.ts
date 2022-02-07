const shortenNumber = (input: number, digits: number): string => {
	const units = ["K", "M", "B", "t", "q", "Q"]
	const floor = Math.floor(Math.abs(input).toString().length / 3)
	const value = Number(input / 1_000 ** floor)
	if (input === 0) return input.toString()
	if (input < 10_000) return input.toFixed(3)
	return value.toFixed(value > 1 ? digits : 2) + units[floor - 1]
}

export default shortenNumber
