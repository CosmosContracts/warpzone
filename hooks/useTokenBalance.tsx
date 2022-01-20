import { useRecoilValue } from "recoil"
import { walletState, WalletStatusType } from "../state/atoms/wallet"
import { CW20, useSdk } from "@services/client"
import { unsafelyGetTokenInfo } from "./useTokenInfo"
import { useQuery } from "react-query"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { useMemo } from "react"
import { convertMicroDenomToDenom } from "@utils/conversion"

const DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL = 10000

async function fetchTokenBalance({
	client,
	token: { denom, native, token_address, decimals },
	address
}: {
	client: SigningCosmWasmClient
	token: {
		denom?: string
		token_address?: string
		native?: boolean
		decimals?: number
	}
	address: string
}) {
	if (!denom && !token_address) {
		throw new Error(
			`No denom or token_address were provided to fetch the balance.`
		)
	}

	/*
	 * if this is a native asset or an ibc asset that has juno_denom
	 *  */
	if (native) {
		const coin = await client.getBalance(address, denom)
		const amount = coin ? Number(coin.amount) : 0
		return convertMicroDenomToDenom(amount, decimals)
	}

	/*
	 * everything else
	 *  */
	if (token_address) {
		const balance = await CW20(client).use(token_address).balance(address)
		return convertMicroDenomToDenom(Number(balance), decimals)
	}

	return 0
}

export const useTokenBalance = (tokenSymbol: string) => {
	const { address, status, client } = useRecoilValue(walletState)
	const { data: balance = 0, isLoading } = useQuery(
		[`tokenBalance`, tokenSymbol, address],
		async ({ queryKey: [, symbol] }) => {
			if (symbol) {
				return await fetchTokenBalance({
					client,
					address,
					token: unsafelyGetTokenInfo(symbol)
				})
			}
		},
		{
			enabled: Boolean(tokenSymbol && status === WalletStatusType.connected),
			refetchOnMount: "always",
			refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
			refetchIntervalInBackground: true
		}
	)

	return { balance, isLoading }
}

export const useMultipleTokenBalance = (tokenSymbols?: Array<string>) => {
	const { address, getSignClient, initialized } = useSdk()

	const queryKey = useMemo(
		() => `multipleTokenBalances/${tokenSymbols?.join("+")}`,
		[tokenSymbols]
	)

	const { data, isLoading } = useQuery(
		[queryKey, address],
		async () => {
			const balances = await Promise.all(
				tokenSymbols.map((tokenSymbol) =>
					fetchTokenBalance({
						client: getSignClient(),
						address,
						token: unsafelyGetTokenInfo(tokenSymbol) || {}
					})
				)
			)
			return tokenSymbols.map((tokenSymbol, index) => ({
				tokenSymbol,
				balance: balances[index]
			}))
		},
		{
			enabled: initialized,
			refetchOnMount: "always",
			refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
			refetchIntervalInBackground: false,

			onError(error) {
				console.error("Cannot fetch token balance bc:", error)
			}
		}
	)

	return [data, isLoading] as const
}
