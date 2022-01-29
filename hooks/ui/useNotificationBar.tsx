import { nanoid } from "nanoid"
import { useState } from "react"

const useNotificationBar = (initialState = []) => {
	const [bars, setBars] = useState(initialState)

	const createNotification = (content, initialId) => {
		const id = initialId === undefined ? nanoid() : initialId

		setBars([...bars, { content, id }])
	}

	const deleteNotification = (id) => {
		const barsToKeep = bars.filter((bar) => bar.id !== id)
		setBars(barsToKeep)
	}

	const deleteAllNotifications = () => setBars([])

	return {
		bars,
		createNotification,
		deleteAllNotifications,
		deleteNotification,

		props: {
			bars,
			deleteNotification
		}
	}
}

export default useNotificationBar
