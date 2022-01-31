/* eslint-disable @typescript-eslint/no-explicit-any */
import { mode, transparentize } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const baseStyle = {
	_disabled: {
		boxShadow: "none",
		cursor: "not-allowed",
		opacity: 0.4
	},
	_focus: {
		boxShadow: "#000 0 0 0 0"
	},
	_hover: {
		_disabled: {
			bg: "initial"
		}
	},
	borderRadius: "full",
	fontFamily: "heading",
	fontWeight: "bold",
	lineHeight: "1.2",
	overflow: "hidden",
	pointerEvents: "auto",
	transition: "all 0.2s ease-in-out",
	transitionDuration: "normal",
	transitionProperty: "common"
}

function variantGhost(props: Dict) {
	const { colorScheme: c, theme } = props
	const darkHoverBg = transparentize(`${c}.200`, 0.05)(theme)
	const darkBeforeBgStart = transparentize(`${c}.200`, 0.15)(theme)
	const darkBeforeBgEnd = transparentize(`${c}.200`, 0.25)(theme)
	const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

	if (c === "gray") {
		return {
			_active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
			_hover: {
				bg: mode(`gray.100`, `whiteAlpha.200`)(props)
			},
			color: mode(`inherit`, `whiteAlpha.900`)(props)
		}
	}

	if (c === "white") {
		return {
			_active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
			_hover: {
				bg: mode(`gray.100`, `whiteAlpha.200`)(props)
			},
			color: mode(`inherit`, `whiteAlpha.900`)(props)
		}
	}

	if (c === "brand") {
		return {
			_active: { bg: mode(`gray.200`, darkBeforeBgEnd)(props) },
			_before: {
				backgroundColor: darkBeforeBgStart,
				borderLeft: `15px solid ${darkBeforeBgEnd}`,
				content: '""',
				display: "block",
				filter: "blur(3px)",
				height: "100%",
				left: "-5rem",
				position: "absolute",
				top: 0,
				transform: "skewX(315deg) translateX(0)",
				transition: "none",
				width: "2em"
			},
			_hover: {
				_before: {
					transform: "skewX(315deg) translateX(18rem)",
					transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
				},
				bg: darkHoverBg,
				transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)"
			},
			border: "solid 2px",
			borderColor: darkBeforeBgEnd,
			color: mode(`inherit`, `white`)(props)
		}
	}

	return {
		_active: {
			bg: mode(`${c}.100`, darkActiveBg)(props)
		},
		_before: {
			backgroundColor: darkBeforeBgStart,
			borderLeft: `15px solid ${darkBeforeBgEnd}`,
			content: '""',
			display: "block",
			filter: "blur(3px)",
			height: "100%",
			left: "-5rem",
			position: "absolute",
			top: 0,
			transform: "skewX(315deg) translateX(0)",
			transition: "none",
			width: "2.5em"
		},
		_hover: {
			_before: {
				transform: "skewX(315deg) translateX(18rem)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			},
			bg: darkHoverBg,
			transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)"
		},
		bg: "transparent",
		color: mode(`${c}.600`, `${c}.200`)(props)
	}
}

function variantOutline(props: Dict) {
	const { colorScheme: c } = props
	const borderColor = mode(`gray.200`, `brand.200`)(props)
	return {
		border: "1px solid",
		borderColor: c === "gray" ? borderColor : "currentColor",
		...variantGhost(props)
	}
}

type AccessibleColor = {
	activeBg?: string
	bg?: string
	color?: string
	hoverBg?: string
}

/**
 * Accessible color overrides for less accessible colors.
 */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
	cyan: {
		activeBg: "cyan.600",
		bg: "cyan.400",
		color: "black",
		hoverBg: "cyan.500"
	},
	yellow: {
		activeBg: "yellow.600",
		bg: "yellow.400",
		color: "black",
		hoverBg: "yellow.500"
	}
}

function variantSolid(props: Dict) {
	const { colorScheme: c } = props

	if (c === "gray") {
		const bgGray = mode(`gray.100`, `whiteAlpha.200`)(props)

		return {
			_active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
			_hover: {
				_disabled: {
					bgGray
				},
				bg: mode(`gray.200`, `whiteAlpha.300`)(props)
			},
			bgGray
		}
	}

	const {
		bg = `${c}.200`,
		color = "white",
		hoverBg = `${c}.600`,
		activeBg = `${c}.700`
	} = accessibleColorMap[c] || {}

	const background = mode(bg, `${c}.500`)(props)

	return {
		_active: {
			bg: mode(activeBg, `${c}.400`)(props)
		},
		_before: {
			backgroundColor: "rgba(255,255,255,0.5)",
			borderLeft: "15px solid rgba(255,255,255,0.4)",
			content: '""',
			display: "block",
			filter: "blur(3px)",
			height: "100%",
			left: "-4.5em",
			position: "absolute",
			top: 0,
			transform: "skewX(-45deg) translateX(0)",
			transition: "none",
			width: "2.5em"
		},
		_focus: {
			_before: {
				transform: "skewX(-45deg) translateX(16em)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			},
			_disabled: {
				bg: background
			},
			bg: mode(hoverBg, `${c}.400`)(props),
			color: "pink.200"
		},
		_hover: {
			_before: {
				transform: "skewX(-45deg) translateX(16em)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			},
			_disabled: {
				bg: background
			},
			bg: mode(hoverBg, `${c}.400`)(props),
			color: "pink.200",
			transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)"
		},
		color: mode(color, `gray.800`)(props)
	}
}

function variantLink(props: Dict) {
	const { colorScheme: c } = props
	return {
		_active: {
			color: mode(`${c}.700`, `${c}.500`)(props)
		},
		_hover: {
			_disabled: {
				textDecoration: "none"
			},
			textDecoration: "underline"
		},
		color: mode(`${c}.500`, `${c}.200`)(props),
		height: "auto",
		lineHeight: "normal",
		padding: 0,
		verticalAlign: "baseline"
	}
}

const variantUnstyled = {
	bg: "none",
	color: "inherit",
	display: "inline",
	lineHeight: "inherit",
	m: 0,
	p: 0
}

const variants = {
	ghost: variantGhost,
	link: variantLink,
	outline: variantOutline,
	solid: variantSolid,
	unstyled: variantUnstyled
}

const sizes = {
	lg: {
		fontSize: "lg",
		h: 12,
		minW: 12,
		px: 6
	},
	md: {
		fontSize: "md",
		h: 10,
		minW: 10,
		px: 4
	},
	sm: {
		fontSize: "sm",
		h: 8,
		minW: 8,
		px: 3
	},
	xs: {
		fontSize: "xs",
		h: 6,
		minW: 6,
		px: 2
	}
}

const defaultProps = {
	colorScheme: "gray",
	size: "md",
	variant: "solid"
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle,
	defaultProps,
	sizes,
	variants
}
