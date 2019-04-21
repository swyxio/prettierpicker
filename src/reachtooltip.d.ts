declare module "@reach/tooltip" {
  export interface BaseTooltipProps<A> {
    children: React.ReactNode
    label: React.ReactNode
    ariaLabel?: string
    rest?: A
  }

  export interface TooltipProps<A = React.HTMLAttributes<HTMLDivElement>> extends BaseTooltipProps<A> {
    children: React.ReactNode
  }
  export default class Tooltip extends React.Component<TooltipProps> {}
}
