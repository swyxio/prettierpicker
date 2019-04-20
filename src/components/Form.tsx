import React from "react"
import {
  ComponentType
  // StyleHTMLAttributes
} from "react"
import { Options } from "prettier"
interface BaseFormProps<A> {
  rest?: A
  children?: React.ReactNode
  as?: ComponentType
  // style?: StyleHTMLAttributes
  setOpts: React.Dispatch<React.SetStateAction<Options>>
  opts: Options
}

type FormProps<A = React.FormHTMLAttributes<HTMLFormElement>> = BaseFormProps<A>
export const Form = function(props: FormProps) {
  return (
    <form {...props}>
      <div>sd</div>
    </form>
  )
}
