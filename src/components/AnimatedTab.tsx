import React from "react"
import { Tabs, Tab } from "@reach/tabs"
import { useRect, Rect } from "@reach/rect"

let AnimatedContext = React.createContext<React.Dispatch<React.SetStateAction<Rect>>>(undefined)
export function AnimatedTabs(props: any) {
  // need to store the position of the selected Tab so we can
  // animate the bar to its position
  const [selectedRect, setSelectedRect] = React.useState<Rect>()

  // need to measure the parent element so we can measure
  // the relative "left" for the bar
  const tabsRef = React.useRef()
  const tabsRect = useRect(tabsRef)

  const color = props.color || "red"

  // Put the function to change the positions on context so the
  // Tabs down the tree can easily access it
  return (
    <AnimatedContext.Provider value={setSelectedRect}>
      <Tabs {...props} ref={tabsRef} style={{ ...props.style, position: "relative" }}>
        {props.children[0]}

        {/* put the bar inbetween the TabList and TabPanels */}
        <div
          style={{
            position: "absolute",
            height: 2,
            background: color,
            marginTop: -2,

            // Here is the actual animation part, we use the
            // rect from the selected tab to set the styles of the bar
            transition: "all 300ms ease",
            left: selectedRect && selectedRect.left - tabsRect.left,
            width: selectedRect && selectedRect.width
          }}
        />

        {props.children[1]}
      </Tabs>
    </AnimatedContext.Provider>
  )
}

export function AnimatedTab(props: any) {
  const { isSelected } = props

  // Each tab measures itself
  const ref = React.useRef()
  const rect = useRect(ref, isSelected)

  // and calls up to the parent when it becomes selected
  // we useLayoutEffect to avoid flicker
  const setSelectedRect = React.useContext(AnimatedContext)
  React.useLayoutEffect(() => {
    if (isSelected) setSelectedRect(rect)
  }, [isSelected, rect, setSelectedRect])

  return <Tab ref={ref} {...props} style={{ ...props.style, border: "none" }} />
}
