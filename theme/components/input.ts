/* eslint-disable @typescript-eslint/no-explicit-any */
import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import type {
	PartsStyleFunction,
	PartsStyleObject,
	SystemStyleObject
} from "@chakra-ui/theme-tools"
import { transparentize, getColor, mode } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
	field: {
		appearance: "none",
		minWidth: 0,
		outline: 0,
		position: "relative",
		transitionDuration: "normal",
		transitionProperty: "common",
		width: "100%"
	}
}

const size: Record<string, SystemStyleObject> = {
	lg: {
		borderRadius: "md",
		fontSize: "lg",
		h: 12,
		px: 4
	},

	md: {
		borderRadius: "md",
		fontSize: "md",
		h: 10,
		px: 4
	},

	sm: {
		borderRadius: "sm",
		fontSize: "sm",
		h: 8,
		px: 3
	},

	xs: {
		borderRadius: "sm",
		fontSize: "xs",
		h: 6,
		px: 2
	}
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
	lg: {
		addon: size.lg,
		field: size.lg
	},
	md: {
		addon: size.md,
		field: size.md
	},
	sm: {
		addon: size.sm,
		field: size.sm
	},
	xs: {
		addon: size.xs,
		field: size.xs
	}
}

function getDefaults(props: Record<string, any>) {
	const { errorBorderColor: ec } = props
	return {
		errorBorderColor: ec || mode("red.500", "red.300")(props),
		focusBorderColor: "none"
	}
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { errorBorderColor: ec } = getDefaults(props)

	return {
		addon: {
			bg: mode("gray.100", "whiteAlpha.300")(props),
			border: "1px solid",
			borderColor: mode("inherit", "whiteAlpha.50")(props)
		},
		field: {
			_disabled: {
				cursor: "not-allowed",
				opacity: 0.4
			},
			_focus: {
				zIndex: 1
			},
			_hover: {
				borderColor: mode("gray.300", "whiteAlpha.400")(props)
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0 0 0 1px ${getColor(theme, ec)}`
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			bg: "inherit",
			border: "1px solid",
			borderColor: "inherit"
		}
	}
}

const variantFilled: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		addon: {
			bg: mode("gray.100", "whiteAlpha.50")(props),
			border: "2px solid",
			borderColor: "transparent"
		},
		field: {
			_disabled: {
				cursor: "not-allowed",
				opacity: 0.4
			},
			_focus: {
				bg: "transparent",
				borderColor: getColor(theme, fc)
			},
			_hover: {
				bg: mode("gray.200", "whiteAlpha.100")(props)
			},
			_invalid: {
				borderColor: getColor(theme, ec)
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			bg: mode("gray.100", "whiteAlpha.50")(props),
			border: "2px solid",
			borderColor: "transparent"
		}
	}
}

const variantFlushed: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		addon: {
			bg: "transparent",
			borderBottom: "2px solid",
			borderColor: "inherit",
			borderRadius: 0,
			px: 0
		},
		field: {
			_focus: {
				borderColor: getColor(theme, fc),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			bg: "transparent",
			borderBottom: "1px solid",
			borderColor: "inherit",
			borderRadius: 12,
			px: 0
		}
	}
}

const variantGlass: PartsStyleFunction<typeof parts> = (props) => {
	const { colorScheme: c, theme } = props
	const { errorBorderColor: ec } = getDefaults(props)

	const darkHoverBg = transparentize(`${c}.200`, 0.45)(theme)

	return {
		addon: {
			bg: mode("gray.100", "whiteAlpha.300")(props),
			border: "1px solid",
			borderColor: mode("inherit", "whiteAlpha.50")(props)
		},
		field: {
			_disabled: {
				cursor: "not-allowed",
				opacity: 0.4
			},
			_focus: {
				borderColor: darkHoverBg,
				boxShadow: "0 1px 12px juno.200",
				zIndex: 1
			},
			_hover: {
				borderColor: mode("gray.300", "whiteAlpha.400")(props)
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0 0 0 1px ${getColor(theme, ec)}`
			},
			_readOnly: {
				boxShadow: `inset 0 -10px 18px -10px ${getColor(theme, "juno.200")}`,
				userSelect: "all"
			},
			backdropBlur: "12px",
			bg: "whiteAlpha.50",
			border: "2px solid",
			borderColor: "inherit",
			rounded: "xl"
		}
	}
}

const variantUnstyled: PartsStyleObject<typeof parts> = {
	addon: {
		bg: "transparent",
		height: "auto",
		px: 0
	},
	field: {
		bg: "transparent",
		height: "auto",
		px: 0
	}
}

const variants = {
	filled: variantFilled,
	flushed: variantFlushed,
	glass: variantGlass,
	outline: variantOutline,
	unstyled: variantUnstyled
}

const defaultProps = {
	size: "md",
	variant: "glass"
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle,
	defaultProps,
	parts: parts.keys,
	sizes,
	variants
}
