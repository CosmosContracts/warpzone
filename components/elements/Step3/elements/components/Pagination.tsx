/* eslint-disable react/prop-types */
import {
	Button,
	Flex,
	useColorModeValue,
	Icon,
	IconButton
} from "@chakra-ui/react"
import { ArrowLeft, ArrowRight, DotsThree } from "phosphor-react"
import React from "react"

const PageButton = (props) => {
	const activeStyle = {
		bg: useColorModeValue("brand.600", "brand.500"),
		color: useColorModeValue("white", "gray.200")
	}
	return (
		<Button
			_hover={!props.disabled && activeStyle}
			cursor={props.disabled && "not-allowed"}
			mx={1}
			opacity={props.disabled && 0.6}
			px={4}
			py={2}
			rounded="md"
			{...(props.active && activeStyle)}
		>
			{props.children}
		</Button>
	)
}

const MorePagesButton = ({ left }) => {
	const DoubleArrow = left ? ArrowLeft : ArrowRight
	const [hovered, setHovered] = React.useState(false)
	return (
		<Button
			cursor="pointer"
			onMouseOut={() => setHovered(false)}
			onMouseOver={() => setHovered(true)}
			py={2}
			rounded="full"
			size="sm"
			textAlign="center"
			w={8}
		>
			{hovered ? (
				<Icon as={DoubleArrow} boxSize={3} cursor="pointer" />
			) : (
				<Icon as={DotsThree} boxSize={4} opacity={0.5} />
			)}
		</Button>
	)
}

const Pagination = () => {
	return (
		<Flex align="center" justify="center" py={4} w="full">
			<IconButton aria-label="previous token page">
				<ArrowLeft size={16} />
			</IconButton>
			<PageButton>1</PageButton>
			<MorePagesButton left />
			<PageButton>5</PageButton>
			<PageButton>6</PageButton>
			<PageButton active>7</PageButton>
			<PageButton>8</PageButton>
			<PageButton>9</PageButton>
			<MorePagesButton left={false} />
			<PageButton>50</PageButton>
			<IconButton aria-label="next token page">
				<ArrowRight size={16} />
			</IconButton>
		</Flex>
	)
}

export default Pagination
