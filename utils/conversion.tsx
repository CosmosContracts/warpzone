export const protectAgainstNaN = (value: number) =>
	Number.isNaN(value) ? 0 : value

export function convertMicroDenomToDenom(
	value: number | string,
	decimals: number
): number {
	if (decimals === 0) return Number(value)

	return protectAgainstNaN(Number(value) / 10 ** decimals)
}

export function convertDenomToMicroDenom(
	value: number | string,
	decimals: number
): number {
	if (decimals === 0) return Number(value)

	return protectAgainstNaN(
		Number.parseInt(String(Number(value) * 10 ** decimals), 10)
	)
}

export function convertFromMicroDenom(denom: string) {
	return denom?.slice(1).toUpperCase()
}

export function convertToFixedDecimals(value: number | string): string {
	const amount = Number(value)
	return amount > 0.01 ? amount.toFixed(2) : String(amount)
}

export const formatTokenName = (name: string) => {
	if (name) {
		return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
	}

	return ""
}

export const createBalanceFormatter = ({
	maximumFractionDigits = 6,
	...options
}: Omit<
	Parameters<typeof Intl.NumberFormat>[1],
	"currency" | "style"
> = {}) => {
	const formatter = new Intl.NumberFormat("en-US", {
		maximumFractionDigits,
		minimumFractionDigits: 0,
		...options,
		currency: "USD",
		style: "currency"
	})

	return (
		value: number | string,
		{ includeCommaSeparation = false, applyNumberConversion = true } = {}
	) => {
		const formattedValue = formatter.format(value as number).replaceAll("$", "")

		if (includeCommaSeparation) {
			return formattedValue
		}

		const rawValue = formattedValue.replaceAll(",", "")
		if (applyNumberConversion) {
			return Number(rawValue)
		}

		return rawValue
	}
}

export const formatTokenBalance = createBalanceFormatter()

export const dollarValueFormatterWithDecimals = createBalanceFormatter({
	maximumFractionDigits: 2,
	minimumFractionDigits: 2
})

export const dollarValueFormatter = createBalanceFormatter({
	maximumFractionDigits: 2
})
