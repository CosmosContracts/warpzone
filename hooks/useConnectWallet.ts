/* eslint-disable no-console */
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import type { Window as KeplrWindow } from "@keplr-wallet/types"
import { cosmosWalletState, WalletStatusType } from "@state/atoms/cosmosWallet"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { useRecoilState } from "recoil"
import { configKeplr, testnet } from "services"

export const useConnectWallet = (
	mutationOptions?: Parameters<typeof useMutation>[2]
) => {
	const anyWindow = window as KeplrWindow
	const [{ status }, setWalletState] = useRecoilState(cosmosWalletState)

	const mutation = useMutation(async () => {
		if (anyWindow && !anyWindow?.keplr) {
			// TODO change when error boundary is setup
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
			console.log("Connecting to Keplr ...")
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
			console.log("Succesfully connected to Keplr")
			console.log("Current Wallet:", { address, status })
		} catch {
			/* set the error state */
			setWalletState({
				address: "",
				client: null,
				key: null,
				status: WalletStatusType.error
			})

			/* throw the error for the UI */
			throw new Error("Error while connecting wallet")
		}
	}, mutationOptions)

	useEffect(() => {
		/* restore wallet connection if the state has been set with the */
		if (testnet?.rpcUrl && status === WalletStatusType.restored) {
			mutation.mutate(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

	return mutation
}
