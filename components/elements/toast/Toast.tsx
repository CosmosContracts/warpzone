import {
	Alert,
	AlertDescription,
	AlertTitle,
	Flex,
	useColorModeValue
} from "@chakra-ui/react"

import { Info, XCircle, Warning, CheckCircle } from "phosphor-react"

const Toast = (props) => {
	const { status, variant, id, title, description } = props

	const alertTitleId =
		typeof id !== "undefined" ? `toast-${id}-title` : undefined

	const STATUSES = {
		info: {
			icon: <Info size={48} weight="duotone" />,
			backgroundColor: "var(--chakra-colors-cyan-400)"
		},
		warning: {
			icon: <Warning size={48} weight="duotone" />,
			backgroundColor: "var(--chakra-colors-yellow-400)"
		},
		success: {
			icon: <CheckCircle size={48} weight="duotone" />,
			backgroundColor: useColorModeValue(
				"var(--chakra-colors-green-50",
				"var(--chakra-colors-teal-50)"
			)
		},
		error: {
			icon: <XCircle size={48} weight="duotone" />,
			backgroundColor: "var(--chakra-colors-red-400)"
		}
	}

	const { icon, backgroundColor } = STATUSES[status]

	return (
		<Alert
			status={status}
			variant={variant}
			id={id}
			backgroundColor={backgroundColor}
			alignItems="center"
			borderWidth="3px 3px 5px 5px"
			borderTopLeftRadius="37px 140px"
			borderTopRightRadius="23px 130px"
			borderBottomLeftRadius="110px 19px"
			borderBottomRightRadius="120px 24px"
			borderColor="#333"
			borderRadius="full"
			paddingEnd={8}
			textAlign="start"
			width="auto"
			aria-labelledby={alertTitleId}
		>
			{icon}
			<Flex direction="column" flex="1" maxWidth="100%">
				{title && (
					<AlertTitle fontSize={{ base: 15 }} id={alertTitleId}>
						{title}
					</AlertTitle>
				)}
				{description && (
					<AlertDescription display="block">
						{description}
					</AlertDescription>
				)}
			</Flex>
		</Alert>
	)
}

export { Toast }
