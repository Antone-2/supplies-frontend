import * as React from "react"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="tooltip-content">{children}</div>
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
