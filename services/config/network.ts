import type { ChainInfo, Currency } from "@keplr-wallet/types"

export interface AppConfig {
	readonly chainId: string
	readonly chainName: string
	readonly contract: string
	readonly addressPrefix: string
	readonly rpcUrl: string
	readonly httpUrl: string
	readonly token: Currency
	readonly gasPrice: number
	readonly codeId?: number
}

export type NetworkConfigs = {
	readonly [key: string]: AppConfig
	readonly testnet: AppConfig
}

export const getAppConfig = (configs: NetworkConfigs): AppConfig => {
	const network = process.env.REACT_APP_NETWORK
	if (!network) return configs.testnet

	const config = configs[network]
	if (!config) {
		throw new Error(`No configuration found for network ${network}`)
	}

	return config
}

export const configKeplr = (config: AppConfig): ChainInfo => {
	return {
		bech32Config: {
			bech32PrefixAccAddr: `${config.addressPrefix}`,
			bech32PrefixAccPub: `${config.addressPrefix}pub`,
			bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
			bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
			bech32PrefixValAddr: `${config.addressPrefix}valoper`,
			bech32PrefixValPub: `${config.addressPrefix}valoperpub`
		},
		bip44: { coinType: 118 },
		chainId: config.chainId,
		chainName: config.chainName,
		coinType: 118,
		currencies: [config.token],
		features: ["stargate", "ibc-transfer", "cosmwasm"],
		feeCurrencies: [config.token],
		gasPriceStep: {
			average: config.gasPrice,
			high: config.gasPrice * 2,
			low: config.gasPrice / 2
		},
		rest: config.httpUrl,
		rpc: config.rpcUrl,
		stakeCurrency: config.token
	}
}
