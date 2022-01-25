import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import type { Window as KeplrWindow } from "@keplr-wallet/types"
import { walletState, WalletStatusType } from "@state/atoms/wallet"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { useRecoilState } from "recoil"
import { configKeplr, testnet } from "services"

export const useConnectWallet = (
	mutationOptions?: Parameters<typeof useMutation>[2]
) => {
	const [{ status }, setWalletState] = useRecoilState(walletState)

	const mutation = useMutation(async () => {
		const anyWindow = window as KeplrWindow
		if (anyWindow && !anyWindow?.keplr) {
			// eslint-disable-next-line no-alert
			alert("Please install Keplr extension and refresh the page.")
			return
		}

		/* set the fetching state */
		setWalletState((value) => ({
			...value,
			client: null,
			state: WalletStatusType.connecting
		}))

		try {
			await anyWindow.keplr?.experimentalSuggestChain(configKeplr(testnet))
			await anyWindow.keplr?.enable(testnet.chainId)

			const offlineSigner = await anyWindow.getOfflineSignerAuto(
				testnet.chainId
			)

			const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
				testnet.rpcUrl,
				offlineSigner
			)

			const [{ address }] = await offlineSigner.getAccounts()
			const key = await anyWindow.keplr?.getKey(testnet.chainId)

			/* successfully update the wallet state */
			setWalletState({
				address,
				client: wasmChainClient,
				key,
				status: WalletStatusType.connected
			})
		} catch (error) {
			/* set the error state */
			setWalletState({
				address: "juno",
				client: null,
				key: null,
				status: WalletStatusType.error
			})

			/* throw the error for the UI */
			throw error
		}
	}, mutationOptions)

	useEffect(() => {
		/* restore wallet connection if the state has been set with the */
		if (testnet?.rpcUrl && status === WalletStatusType.restored) {
			mutation.mutate(null)
		}
	}, [status, mutation])

	useEffect(() => {
		function reconnectWallet() {
			if (status === WalletStatusType.connected) {
				mutation.mutate(null)
			}
		}

		window.addEventListener("keplr_keystorechange", reconnectWallet)
		return () => {
			window.removeEventListener("keplr_keystorechange", reconnectWallet)
		}
	}, [mutation, status])

	return mutation
}
