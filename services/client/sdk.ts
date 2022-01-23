import {
	CosmWasmClient,
	SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import type { OfflineSigner } from "@cosmjs/proto-signing"
import type { AppConfig } from "../config"

export type WalletLoader = (
	chainId: string,
	addressPrefix?: string
) => Promise<OfflineSigner>

export const loadKeplrWallet = async (
	chainId: string
): Promise<OfflineSigner> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const anyWindow = window as any
	if (!anyWindow.getOfflineSignerAuto) {
		throw new Error("Keplr extension is not available")
	}

	const signer = anyWindow.getOfflineSignerAuto(chainId)

	return await Promise.resolve(signer)
}

// this creates a new connection to a server at URL,
export const createClient = async (
	config: AppConfig,
	signer: OfflineSigner
): Promise<SigningCosmWasmClient> => {
	return await SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
		prefix: config.addressPrefix
	})
}

export const createSimpleClient = (
	config: AppConfig
): Promise<CosmWasmClient> => {
	return CosmWasmClient.connect(config.rpcUrl)
}
