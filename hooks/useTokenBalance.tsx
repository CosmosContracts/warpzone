/* eslint-disable consistent-return */
import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { CW20 } from "@services/client"
import { convertMicroDenomToDenom } from "@utils/conversion"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import {
	cosmosWalletState,
	WalletStatusType
} from "../state/atoms/cosmosWallet"
import { unsafelyGetTokenInfo } from "./useTokenInfo"

const DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL = 10_000
const DEFAULT_TOKEN_BALANCE_STALE_TIME = 8_000

const fetchTokenBalance = async ({
	client,
	token: { denom, native, token_address, decimals },
	address
}: {
	address: string
	client: SigningCosmWasmClient
	token: {
		decimals?: number
		denom?: string
		native?: boolean
		token_address?: string
	}
}) => {
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
	const { address, status, client } = useRecoilValue(cosmosWalletState)
	const { data: balance = 0, isLoading } = useQuery(
		[`tokenBalance`, tokenSymbol, address],
		async ({ queryKey: [, symbol] }) => {
			if (symbol) {
				return await fetchTokenBalance({
					address,
					client,
					token: unsafelyGetTokenInfo(symbol)
				})
			}
		},
		{
			enabled: Boolean(tokenSymbol && status === WalletStatusType.connected),
			refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
			refetchIntervalInBackground: true,
			refetchOnMount: "always"
		}
	)

	return { balance, isLoading }
}

export const useMultipleTokenBalance = (tokenSymbols: string[]) => {
	const { address, client, status } = useRecoilValue(cosmosWalletState)

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
						address,
						client,
						token: unsafelyGetTokenInfo(tokenSymbol) || {}
					})
				)
			)

			return tokenSymbols.map((tokenSymbol, index) => ({
				balance: balances[index],
				tokenSymbol
			}))
		},
		{
			enabled: Boolean(tokenSymbols && status === WalletStatusType.connected),
			notifyOnChangeProps: ["data", "error"],
			onError() {
				throw new Error("Error fetching token balance")
			},
			refetchInterval: DEFAULT_TOKEN_BALANCE_REFETCH_INTERVAL,
			refetchIntervalInBackground: false,
			refetchOnMount: "always",
			refetchOnReconnect: true,
			refetchOnWindowFocus: "always",
			retry: false,
			staleTime: DEFAULT_TOKEN_BALANCE_STALE_TIME
		}
	)

	// console.log(data)

	return [data, isLoading] as const
}
