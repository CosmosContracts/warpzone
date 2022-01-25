import React from "react"
import DockMonitor from "recoil-devtools-dock"
import LogMonitor from "recoil-devtools-log-monitor"
import { RecoilLogger } from "recoil-devtools-logger"

export const RecoilDevtools = () => {
	return (
		<>
			<RecoilLogger />
			<DockMonitor
				changeMonitorKey="ctrl-m"
				changePositionKey="ctrl-q"
				defaultIsVisible
				toggleVisibilityKey="ctrl-h"
			>
				<LogMonitor markStateDiff />
			</DockMonitor>
		</>
	)
}
