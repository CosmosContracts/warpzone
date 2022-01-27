import type { BoxProps } from "@chakra-ui/react"
import { chakra, Center } from "@chakra-ui/react"
import type { ImageProps, ImageLoaderProps } from "next/image"
import NextImage from "next/image"

const ChakraNextUnwrappedImage = chakra(NextImage, {
	shouldForwardProp: (property) =>
		[
			"width",
			"height",
			"src",
			"alt",
			"quality",
			"placeholder",
			"blurDataURL",
			"loader "
		].includes(property)
})

const myLoader = (resolverProps: ImageLoaderProps): string => {
	return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (string_: string) =>
	typeof window === "undefined"
		? Buffer.from(string_).toString("base64")
		: window.btoa(string_)

export const ChakraNextImage = (props: BoxProps & ImageProps) => {
	const { src, alt, width, quality, height, ...rest } = props
	return (
		<Center className="group" cursor="pointer" pos="relative" {...rest}>
			<ChakraNextUnwrappedImage
				alt={alt}
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
				h="auto"
				height={height}
				loader={myLoader}
				placeholder="blur"
				quality={quality}
				src={src}
				transition="all 0.2s"
				w="auto"
				width={width}
			/>
		</Center>
	)
}
