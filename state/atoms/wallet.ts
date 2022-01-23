/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import type { SigningStargateClient } from "@cosmjs/stargate"
import type { Key } from "@keplr-wallet/types"
import { atom } from "recoil"

export enum WalletStatusType {
	/* the wallet is fully connected */
	connected = "@wallet-state/connected",
	/* connecting to the wallet */
	connecting = "@wallet-state/connecting",
	/* error when tried to connect */
	error = "@wallet-state/error",
	/* nothing happens to the wallet */
	idle = "@wallet-state/idle",
	/* restored wallets state from the cache */
	restored = "@wallet-state/restored"
}

type GeneratedWalletState<
	TClient,
	TStateExtension extends {}
> = TStateExtension & {
	address: string
	client: TClient | null
	status: WalletStatusType
}

type CreateWalletStateArgs<TState = {}> = {
	default: TState
	key: string
}

function createWalletState<TClient = any, TState = {}>({
	key,
	default: defaultState
}: CreateWalletStateArgs<TState>) {
	return atom<GeneratedWalletState<TClient, TState>>({
		dangerouslyAllowMutability: true,
		default: {
			address: "",
			client: null,
			status: WalletStatusType.idle,
			...defaultState
		},
		effects_UNSTABLE: [
			({ onSet, setSelf }) => {
				const CACHE_KEY = `@junoswap/wallet-state/type-${key}`

				const savedValue = localStorage.getItem(CACHE_KEY)

				if (savedValue) {
					try {
						const parsedSavedState = JSON.parse(savedValue)
						if (parsedSavedState?.address) {
							setSelf({
								...parsedSavedState,
								client: null,
								status: WalletStatusType.restored
							})
						}
					} catch {
						throw new Error("No wallet could be fetched from cache.")
					}
				}

				onSet((newValue, oldValue) => {
					const isReset = !newValue.address && (oldValue as any)?.address

					if (isReset) {
						localStorage.removeItem(CACHE_KEY)
					} else {
						localStorage.setItem(
							CACHE_KEY,
							/* let's not store the client in the cache */
							JSON.stringify({ ...newValue, client: null, status: null })
						)
					}
				})
			}
		],
		key
	})
}

export const walletState = createWalletState<
	SigningCosmWasmClient,
	{ key?: Key }
>({
	default: {
		key: null
	},
	key: "internal-wallet"
})

export const ibcWalletState = createWalletState<
	SigningStargateClient,
	{
		/* ibc wallet is connected */
		tokenSymbol?: string
	}
>({
	default: {
		tokenSymbol: null
	},
	key: "ibc-wallet"
})
