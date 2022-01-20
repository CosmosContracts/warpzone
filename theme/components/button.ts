/* eslint-disable @typescript-eslint/no-explicit-any */
import { mode, transparentize } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

const baseStyle = {
	overflow: "hidden",
	lineHeight: "1.2",
	borderRadius: "full",
	fontWeight: "bold",
	fontFamily: "heading",
	transition: "all 0.2s ease-in-out",
	transitionProperty: "common",
	transitionDuration: "normal",
	_focus: {
		boxShadow: "#000 0 0 0 0"
	},
	_disabled: {
		opacity: 0.4,
		cursor: "not-allowed",
		boxShadow: "none"
	},
	_hover: {
		_disabled: {
			bg: "initial"
		}
	}
}

function variantGhost(props: Dict) {
	const { colorScheme: c, theme } = props
	const darkHoverBg = transparentize(`${c}.200`, 0.05)(theme)
	const darkBeforeBgStart = transparentize(`${c}.200`, 0.15)(theme)
	const darkBeforeBgEnd = transparentize(`${c}.200`, 0.25)(theme)
	const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

	if (c === "gray") {
		return {
			color: mode(`inherit`, `whiteAlpha.900`)(props),
			_hover: {
				bg: mode(`gray.100`, `whiteAlpha.200`)(props)
			},
			_active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
		}
	}

	if (c === "white") {
		return {
			color: mode(`inherit`, `whiteAlpha.900`)(props),
			_hover: {
				bg: mode(`gray.100`, `whiteAlpha.200`)(props)
			},
			_active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
		}
	}

	if (c === "brand") {
		return {
			color: mode(`inherit`, `white`)(props),
			border: "solid 2px",
			borderColor: darkBeforeBgEnd,
			_before: {
				content: '""',
				backgroundColor: darkBeforeBgStart,
				height: "100%",
				width: "2em",
				display: "block",
				position: "absolute",
				top: 0,
				left: "-5rem",
				transform: "skewX(315deg) translateX(0)",
				transition: "none",
				borderLeft: `15px solid ${darkBeforeBgEnd}`,
				filter: "blur(3px)"
			},
			_hover: {
				transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)",
				_before: {
					transform: "skewX(315deg) translateX(18rem)",
					transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
				},
				bg: darkHoverBg
			},
			_active: { bg: mode(`gray.200`, darkBeforeBgEnd)(props) }
		}
	}

	return {
		color: mode(`${c}.600`, `${c}.200`)(props),
		bg: "transparent",
		_before: {
			content: '""',
			backgroundColor: darkBeforeBgStart,
			height: "100%",
			width: "2.5em",
			display: "block",
			position: "absolute",
			top: 0,
			left: "-5rem",
			transform: "skewX(315deg) translateX(0)",
			transition: "none",
			borderLeft: `15px solid ${darkBeforeBgEnd}`,
			filter: "blur(3px)"
		},
		_hover: {
			transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)",
			_before: {
				transform: "skewX(315deg) translateX(18rem)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			},
			bg: darkHoverBg
		},
		_active: {
			bg: mode(`${c}.100`, darkActiveBg)(props)
		}
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
	bg?: string
	color?: string
	hoverBg?: string
	activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
	yellow: {
		bg: "yellow.400",
		color: "black",
		hoverBg: "yellow.500",
		activeBg: "yellow.600"
	},
	cyan: {
		bg: "cyan.400",
		color: "black",
		hoverBg: "cyan.500",
		activeBg: "cyan.600"
	}
}

function variantSolid(props: Dict) {
	const { colorScheme: c } = props

	if (c === "gray") {
		const bg = mode(`gray.100`, `whiteAlpha.200`)(props)

		return {
			bg,
			_hover: {
				bg: mode(`gray.200`, `whiteAlpha.300`)(props),
				_disabled: {
					bg
				}
			},
			_active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) }
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
		color: mode(color, `gray.800`)(props),
		_active: {
			bg: mode(activeBg, `${c}.400`)(props)
		},
		_before: {
			content: '""',
			backgroundColor: "rgba(255,255,255,0.5)",
			height: "100%",
			width: "2.5em",
			display: "block",
			position: "absolute",
			top: 0,
			left: "-4.5em",
			transform: "skewX(-45deg) translateX(0)",
			transition: "none",
			borderLeft: "15px solid rgba(255,255,255,0.4)",
			filter: "blur(3px)"
		},
		_hover: {
			color: "pink.200",
			transition: "all 0.5 cubic-bezier(.41,.60,.70,.15)",
			bg: mode(hoverBg, `${c}.400`)(props),
			_disabled: {
				bg: background
			},
			_before: {
				transform: "skewX(-45deg) translateX(16em)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			}
		},
		_focus: {
			color: "pink.200",
			bg: mode(hoverBg, `${c}.400`)(props),
			_disabled: {
				bg: background
			},
			_before: {
				transform: "skewX(-45deg) translateX(16em)",
				transition: "all 0.5s cubic-bezier(.41,.60,.70,.15)"
			}
		}
	}
}

function variantLink(props: Dict) {
	const { colorScheme: c } = props
	return {
		padding: 0,
		height: "auto",
		lineHeight: "normal",
		verticalAlign: "baseline",
		color: mode(`${c}.500`, `${c}.200`)(props),
		_hover: {
			textDecoration: "underline",
			_disabled: {
				textDecoration: "none"
			}
		},
		_active: {
			color: mode(`${c}.700`, `${c}.500`)(props)
		}
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
	outline: variantOutline,
	solid: variantSolid,
	link: variantLink,
	unstyled: variantUnstyled
}

const sizes = {
	lg: {
		h: 12,
		minW: 12,
		fontSize: "lg",
		px: 6
	},
	md: {
		h: 10,
		minW: 10,
		fontSize: "md",
		px: 4
	},
	sm: {
		h: 8,
		minW: 8,
		fontSize: "sm",
		px: 3
	},
	xs: {
		h: 6,
		minW: 6,
		fontSize: "xs",
		px: 2
	}
}

const defaultProps = {
	variant: "solid",
	size: "md",
	colorScheme: "gray"
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	baseStyle,
	variants,
	sizes,
	defaultProps
}
