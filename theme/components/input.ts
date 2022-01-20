/* eslint-disable @typescript-eslint/no-explicit-any */
import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
	PartsStyleFunction,
	PartsStyleObject,
	SystemStyleObject,
	transparentize
} from "@chakra-ui/theme-tools"
import { getColor, mode } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
	field: {
		width: "100%",
		minWidth: 0,
		outline: 0,
		position: "relative",
		appearance: "none",
		transitionProperty: "common",
		transitionDuration: "normal"
	}
}

const size: Record<string, SystemStyleObject> = {
	lg: {
		fontSize: "lg",
		px: 4,
		h: 12,
		borderRadius: "md"
	},

	md: {
		fontSize: "md",
		px: 4,
		h: 10,
		borderRadius: "md"
	},

	sm: {
		fontSize: "sm",
		px: 3,
		h: 8,
		borderRadius: "sm"
	},

	xs: {
		fontSize: "xs",
		px: 2,
		h: 6,
		borderRadius: "sm"
	}
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
	lg: {
		field: size.lg,
		addon: size.lg
	},
	md: {
		field: size.md,
		addon: size.md
	},
	sm: {
		field: size.sm,
		addon: size.sm
	},
	xs: {
		field: size.xs,
		addon: size.xs
	}
}

function getDefaults(props: Record<string, any>) {
	const { errorBorderColor: ec } = props
	return {
		focusBorderColor: "none",
		errorBorderColor: ec || mode("red.500", "red.300")(props)
	}
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			border: "1px solid",
			borderColor: "inherit",
			bg: "inherit",
			_hover: {
				borderColor: mode("gray.300", "whiteAlpha.400")(props)
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed"
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0 0 0 1px ${getColor(theme, ec)}`
			},
			_focus: {
				zIndex: 1
			}
		},
		addon: {
			border: "1px solid",
			borderColor: mode("inherit", "whiteAlpha.50")(props),
			bg: mode("gray.100", "whiteAlpha.300")(props)
		}
	}
}

const variantFilled: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			border: "2px solid",
			borderColor: "transparent",
			bg: mode("gray.100", "whiteAlpha.50")(props),
			_hover: {
				bg: mode("gray.200", "whiteAlpha.100")(props)
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed"
			},
			_invalid: {
				borderColor: getColor(theme, ec)
			},
			_focus: {
				bg: "transparent",
				borderColor: getColor(theme, fc)
			}
		},
		addon: {
			border: "2px solid",
			borderColor: "transparent",
			bg: mode("gray.100", "whiteAlpha.50")(props)
		}
	}
}

const variantFlushed: PartsStyleFunction<typeof parts> = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			borderBottom: "1px solid",
			borderColor: "inherit",
			borderRadius: 12,
			px: 0,
			bg: "transparent",
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`
			},
			_focus: {
				borderColor: getColor(theme, fc),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`
			}
		},
		addon: {
			borderBottom: "2px solid",
			borderColor: "inherit",
			borderRadius: 0,
			px: 0,
			bg: "transparent"
		}
	}
}

const variantGlass: PartsStyleFunction<typeof parts> = (props) => {
	const { colorScheme: c, theme } = props
	const { errorBorderColor: ec } = getDefaults(props)

	const darkHoverBg = transparentize(`${c}.200`, 0.45)(theme)

	return {
		field: {
			rounded: "xl",
			border: "2px solid",
			borderColor: "inherit",
			bg: "whiteAlpha.50",
			backdropBlur: "12px",
			_hover: {
				borderColor: mode("gray.300", "whiteAlpha.400")(props)
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all"
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed"
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0 0 0 1px ${getColor(theme, ec)}`
			},
			_focus: {
				zIndex: 1,
				borderColor: darkHoverBg
			}
		},
		addon: {
			border: "1px solid",
			borderColor: mode("inherit", "whiteAlpha.50")(props),
			bg: mode("gray.100", "whiteAlpha.300")(props)
		}
	}
}

const variantUnstyled: PartsStyleObject<typeof parts> = {
	field: {
		bg: "transparent",
		px: 0,
		height: "auto"
	},
	addon: {
		bg: "transparent",
		px: 0,
		height: "auto"
	}
}

const variants = {
	outline: variantOutline,
	filled: variantFilled,
	flushed: variantFlushed,
	glass: variantGlass,
	unstyled: variantUnstyled
}

const defaultProps = {
	size: "md",
	variant: "glass"
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	parts: parts.keys,
	baseStyle,
	sizes,
	variants,
	defaultProps
}
