import React, { useCallback, useMemo, useState } from "react"
import type { CW20Instance } from "./Cw20"

type ContractsContextType = {
	readonly addContract: (newContract: CW20Instance) => void
	contracts: CW20Instance[]
}

const defaultContext: ContractsContextType = {
	addContract() {},
	contracts: []
}

const ContractsContext =
	React.createContext<ContractsContextType>(defaultContext)

export const useContracts = (): ContractsContextType =>
	React.useContext(ContractsContext)

export const ContractsProvider = ({
	children
}: React.HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	const [contracts, setContracts] = useState<CW20Instance[]>(
		defaultContext.contracts
	)

	const addContract = useCallback(
		(newContract: CW20Instance): void =>
			setContracts(() => {
				const notPresent = !contracts.some(
					(contract) => contract.contractAddress === newContract.contractAddress
				)

				if (notPresent) return [...contracts, newContract]
				return contracts
			}),
		[contracts]
	)

	const value: ContractsContextType = useMemo(
		() => ({ addContract, contracts }),
		[addContract, contracts]
	)

	return (
		<ContractsContext.Provider value={value}>
			{children}
		</ContractsContext.Provider>
	)
}
