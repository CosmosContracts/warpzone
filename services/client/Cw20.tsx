// eslint-disable-next-line canonical/filename-match-regex
import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import type { Coin } from "@cosmjs/stargate"

export type Expiration =
	| { readonly at_height: number }
	| { readonly at_time: number }
	| { readonly never: unknown }

export type AllowanceResponse = {
	readonly allowance: string
	readonly expires: Expiration
}

export type AllowanceInfo = {
	readonly allowance: string
	// bech32 address
	readonly expires: Expiration
	// integer as string
	readonly spender: string
}

export type AllAllowancesResponse = {
	readonly allowances: readonly AllowanceInfo[]
}

export type TokenInfo = {
	readonly decimals: number
	readonly name: string
	readonly symbol: string
	readonly total_supply: string
}

export type Investment = {
	readonly exit_tax: string
	readonly min_withdrawal: string
	readonly nominal_value: string
	readonly owner: string
	readonly staked_tokens: Coin
	readonly token_supply: string
	readonly validator: string
}

export type Claim = {
	readonly amount: string
	readonly release_at: { readonly at_time: number }
}

export type Claims = {
	readonly claims: readonly Claim[]
}

export type AllAccountsResponse = {
	// list of bech32 address that have a balance
	readonly accounts: readonly string[]
}

export type CW20Instance = {
	allAccounts: (
		startAfter?: string,
		limit?: number
	) => Promise<readonly string[]>

	allAllowances: (
		owner: string,
		startAfter?: string,
		limit?: number
	) => Promise<AllAllowancesResponse>
	allowance: (owner: string, spender: string) => Promise<AllowanceResponse>
	// queries
	balance: (address: string) => Promise<string>
	bond: (sender: string, coin: Coin) => Promise<string>
	burn: (sender: string, amount: string) => Promise<string>
	claim: (sender: string) => Promise<string>
	claims: (address: string) => Promise<Claims>
	readonly contractAddress: string

	decreaseAllowance: (
		sender: string,
		recipient: string,
		amount: string
	) => Promise<string>
	increaseAllowance: (
		sender: string,
		recipient: string,
		amount: string
	) => Promise<string>
	investment: () => Promise<Investment>
	// actions
	mint: (sender: string, recipient: string, amount: string) => Promise<string>
	minter: (sender: string) => Promise<unknown>
	tokenInfo: () => Promise<TokenInfo>
	transfer: (
		sender: string,
		recipient: string,
		amount: string
	) => Promise<string>
	transferFrom: (
		sender: string,
		owner: string,
		recipient: string,
		amount: string
	) => Promise<string>
	unbond: (sender: string, amount: string) => Promise<string>
}

export type CW20Contract = {
	use: (contractAddress: string) => CW20Instance
}

export const CW20 = (client: SigningCosmWasmClient): CW20Contract => {
	const use = (contractAddress: string): CW20Instance => {
		const balance = async (address: string): Promise<string> => {
			const result = await client.queryContractSmart(contractAddress, {
				balance: { address }
			})
			return result.balance
		}

		const allowance = async (
			owner: string,
			spender: string
		): Promise<AllowanceResponse> => {
			return await client.queryContractSmart(contractAddress, {
				allowance: { owner, spender }
			})
		}

		const allAllowances = async (
			owner: string,
			startAfter?: string,
			limit?: number
		): Promise<AllAllowancesResponse> => {
			return await client.queryContractSmart(contractAddress, {
				all_allowances: { limit, owner, start_after: startAfter }
			})
		}

		const allAccounts = async (
			startAfter?: string,
			limit?: number
		): Promise<readonly string[]> => {
			const accounts: AllAccountsResponse = await client.queryContractSmart(
				contractAddress,
				{
					all_accounts: { limit, start_after: startAfter }
				}
			)
			return accounts.accounts
		}

		const tokenInfo = async (): Promise<TokenInfo> => {
			return await client.queryContractSmart(contractAddress, {
				token_info: {}
			})
		}

		const investment = async (): Promise<Investment> => {
			return await client.queryContractSmart(contractAddress, {
				investment: {}
			})
		}

		const claims = async (address: string): Promise<Claims> => {
			return await client.queryContractSmart(contractAddress, {
				claims: { address }
			})
		}

		const minter = async (): Promise<unknown> => {
			return await client.queryContractSmart(contractAddress, { minter: {} })
		}

		// mints tokens, returns transactionHash
		const mint = async (
			sender: string,
			recipient: string,
			amount: string
		): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					mint: { amount, recipient }
				},
				"auto"
			)
			return result.transactionHash
		}

		// transfers tokens, returns transactionHash
		const transfer = async (
			sender: string,
			recipient: string,
			amount: string
		): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					transfer: { amount, recipient }
				},
				"auto"
			)
			return result.transactionHash
		}

		// burns tokens, returns transactionHash
		const burn = async (sender: string, amount: string): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					burn: { amount }
				},
				"auto"
			)
			return result.transactionHash
		}

		const increaseAllowance = async (
			sender: string,
			spender: string,
			amount: string
		): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					increase_allowance: { amount, spender }
				},
				"auto"
			)
			return result.transactionHash
		}

		const decreaseAllowance = async (
			sender: string,
			spender: string,
			amount: string
		): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					decrease_allowance: { amount, spender }
				},
				"auto"
			)
			return result.transactionHash
		}

		const transferFrom = async (
			sender: string,
			owner: string,
			recipient: string,
			amount: string
		): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					transfer_from: { amount, owner, recipient }
				},
				"auto"
			)
			return result.transactionHash
		}

		const bond = async (sender: string, coin: Coin): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{ bond: {} },
				"auto",
				undefined,
				[coin]
			)
			return result.transactionHash
		}

		const unbond = async (sender: string, amount: string): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					unbond: { amount }
				},
				"auto"
			)
			return result.transactionHash
		}

		const claim = async (sender: string): Promise<string> => {
			const result = await client.execute(
				sender,
				contractAddress,
				{
					claim: {}
				},
				"auto"
			)
			return result.transactionHash
		}

		return {
			allAccounts,
			allAllowances,
			allowance,
			balance,
			bond,
			burn,
			claim,
			claims,
			contractAddress,
			decreaseAllowance,
			increaseAllowance,
			investment,
			mint,
			minter,
			tokenInfo,
			transfer,
			transferFrom,
			unbond
		}
	}

	return { use }
}
