import { useMultipleTokenBalance } from "@hooks/useTokenBalance"
import { useTokenList } from "@hooks/useTokenList"
import { useMemo } from "react"

export const useFetchSupportedTokens = () => {
	const [tokenList] = useTokenList()

	const convertedTokenList = useMemo(
		() => tokenList?.tokens.map(({ symbol }) => symbol),
		[tokenList]
	)

	const convertedTokenNameList = useMemo(
		() => tokenList?.tokens.map(({ name }) => name),
		[tokenList]
	)

	const [tokenBalances, loadingBalances] =
		useMultipleTokenBalance(convertedTokenList)

	const categorizedBalances = useMemo((): [typeof tokenBalances] => {
		if (!tokenBalances?.length) {
			const fallbackTokensList =
				convertedTokenList?.map((tokenSymbol) => ({
					balance: 0,
					tokenSymbol
				})) ?? []
			return [fallbackTokensList]
		}

		const userTokens = []

		for (const token of tokenBalances) {
			userTokens.push(token)
		}

		return [userTokens]
	}, [tokenBalances, convertedTokenList])

	return [loadingBalances, categorizedBalances, convertedTokenNameList] as const
}
