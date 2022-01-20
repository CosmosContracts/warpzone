import { useMemo } from "react"
import { useMultipleTokenBalance } from "@hooks/useTokenBalance"
import { useTokenList } from "@hooks/useTokenList"

export const useGetSupportedAssetsBalancesOnChain = () => {
	const [tokenList] = useTokenList()

	const convertedTokenList = useMemo(
		() => tokenList?.tokens.map(({ symbol }) => symbol),
		[tokenList]
	)

	const [tokenBalances, loadingBalances] =
		useMultipleTokenBalance(convertedTokenList)

	const categorizedBalances = useMemo((): [
		typeof tokenBalances,
		typeof tokenBalances
	] => {
		if (!tokenBalances?.length) {
			const fallbackTokensList =
				convertedTokenList?.map((tokenSymbol) => ({
					balance: 0,
					tokenSymbol
				})) ?? []
			return [[], fallbackTokensList]
		}

		const userTokens = []
		const otherTokens = []

		for (const token of tokenBalances) {
			if (token.balance > 0) {
				userTokens.push(token)
			} else {
				otherTokens.push(token)
			}
		}

		return [userTokens, otherTokens]
	}, [tokenBalances, convertedTokenList])

	return [loadingBalances, categorizedBalances] as const
}
