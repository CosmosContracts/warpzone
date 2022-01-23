const truncateHash = (address: string, startLength = 4, endLength = 4) => {
	return `${address.slice(0, Math.max(0, startLength))}...${address.slice(
		Math.max(0, address.length - endLength)
	)}`
}

export default truncateHash
