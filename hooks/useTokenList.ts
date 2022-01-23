import { queryClient } from "@services/client"
import type { String } from "lodash"
import { useQuery } from "react-query"

export type TokenInfo = {
	chain_id: string
	decimals: number
	denom: string
	id: string
	logoURI: string
	name: string
	native: boolean
	symbol: string
	tags: string[]
	ticker: String
	token_address: string
}

export type TokenList = {
	base_token: TokenInfo
	keywords: string[]
	logoURI: string
	name: string
	tags: Record<
		string,
		{
			description: string
			name: string
		}
	>
	timestamp: string
	tokens: TokenInfo[]

	version: {
		major: number
		minor: number
		patch: number
	}
}

export const getCachedTokenList = () =>
	queryClient.getQueryCache().find("@token-list")?.state?.data as
		| TokenList
		| undefined

export const useTokenList = () => {
	const { data, isLoading } = useQuery<TokenList>(
		"@token-list",
		async () => {
			const response = await fetch("/token_list.json")
			return await response.json()
		},
		{
			onError() {
				throw new Error("Error fetching token list")
			},
			refetchInterval: 1_000 * 60,
			refetchIntervalInBackground: true,
			refetchOnMount: false
		}
	)

	return [data, isLoading] as const
}
