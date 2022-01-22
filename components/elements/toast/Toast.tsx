import type { AlertProps } from "@chakra-ui/react"
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Flex,
	useColorModeValue
} from "@chakra-ui/react"
import { Info, XCircle, Warning, CheckCircle } from "phosphor-react"

type ToastProps = AlertProps & { description: string }

const Toast = ({ status, variant, id, title, description }: ToastProps) => {
	const alertTitleId =
		typeof id === "undefined" ? undefined : `toast-${id}-title`

	const STATUSES = {
		error: {
			backgroundColor: "var(--chakra-colors-red-400)",
			icon: <XCircle size={48} weight="duotone" />
		},
		info: {
			backgroundColor: "var(--chakra-colors-cyan-400)",
			icon: <Info size={48} weight="duotone" />
		},
		success: {
			backgroundColor: useColorModeValue(
				"var(--chakra-colors-green-50",
				"var(--chakra-colors-teal-50)"
			),
			icon: <CheckCircle size={48} weight="duotone" />
		},
		warning: {
			backgroundColor: "var(--chakra-colors-yellow-400)",
			icon: <Warning size={48} weight="duotone" />
		}
	}

	const { icon, backgroundColor } = STATUSES[status]

	return (
		<Alert
			alignItems="center"
			aria-labelledby={alertTitleId}
			backgroundColor={backgroundColor}
			borderBottomLeftRadius="110px 19px"
			borderBottomRightRadius="120px 24px"
			borderColor="#333"
			borderRadius="full"
			borderTopLeftRadius="37px 140px"
			borderTopRightRadius="23px 130px"
			borderWidth="3px 3px 5px 5px"
			id={id}
			paddingEnd={8}
			status={status}
			textAlign="start"
			variant={variant}
			width="auto"
		>
			{icon}
			<Flex direction="column" flex="1" maxWidth="100%">
				{title && (
					<AlertTitle fontSize={{ base: 15 }} id={alertTitleId}>
						{title}
					</AlertTitle>
				)}
				{description && (
					<AlertDescription display="block" h="full" w="full">
						{description}
					</AlertDescription>
				)}
			</Flex>
		</Alert>
	)
}

export { Toast }
