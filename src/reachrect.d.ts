declare module "@reach/rect" {
  import { Ref } from "react"
  export interface Rect {
    x: number
    y: number
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
  }

  type RectProps = {
    observe?: boolean
    onChange?: (rect: Rect) => void
    children?: React.ReactNode
  }

  const Rect: React.SFC<RectProps>

  export default Rect
  export function useRect(rect: Ref, isSelected?: boolean): Rect
}
