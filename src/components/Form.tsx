import React from "react"
import {
  ComponentType
  // StyleHTMLAttributes
} from "react"
import { Options } from "prettier"
import { properties } from "../jsonschema"
import { useCheckInput, useInput } from "@swyx/hooks"
interface BaseFormProps<A> {
  rest?: A
  children?: React.ReactNode
  as?: ComponentType
  // style?: StyleHTMLAttributes
  setOpts: React.Dispatch<React.SetStateAction<Options>>
  opts: Options
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

type Dict = { [key: string]: string }
const tcOptions: Dict = {
  none: "No trailing commas.",
  es5: "Trailing commas where valid in ES5 (objects, arrays, etc.)",
  all: "Trailing commas wherever possible (including function arguments)."
}

type FormProps<A = React.FormHTMLAttributes<HTMLFormElement>> = BaseFormProps<A>
export const Form: React.FC<FormProps> = function({
  // opts,
  setOpts,
  onSubmit
}) {
  const {
    arrowParens,
    bracketSpacing,
    jsxBracketSameLine,
    jsxSingleQuote,
    semi,
    tabWidth,
    trailingComma,
    singleQuote,
    useTabs
  } = properties
  // console.log("passed in for later use: ", opts)
  const tcInput = useInput(trailingComma.default, {
    stateObserver: a => setOpts(d => void (d.trailingComma = a as "none" | "es5" | "all")),
    localStorageName: "trailingComma"
  })
  return (
    <form onSubmit={onSubmit}>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(arrowParens.default === "always", {
            stateObserver: a => setOpts(d => void (d.arrowParens = a ? "always" : "avoid")),
            localStorageName: "arrowParens"
          })}
        />
        <b>arrowParens</b>
        <p>{arrowParens.description}</p>
      </label>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(bracketSpacing.default, {
            stateObserver: a => setOpts(d => void (d.bracketSpacing = a)),
            localStorageName: "bracketSpacing"
          })}
        />
        <b>bracketSpacing</b>
        <p>{bracketSpacing.description}</p>
      </label>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(jsxBracketSameLine.default, {
            stateObserver: a => setOpts(d => void (d.jsxBracketSameLine = a)),
            localStorageName: "jsxBracketSameLine"
          })}
        />
        <b>jsxBracketSameLine</b>
        <p>{jsxBracketSameLine.description}</p>
      </label>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(jsxSingleQuote.default, {
            stateObserver: a => setOpts(d => void (d.jsxSingleQuote = a)),
            localStorageName: "jsxSingleQuote"
          })}
        />
        <b>jsxSingleQuote</b>
        <p>{jsxSingleQuote.description}</p>
      </label>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(singleQuote.default, {
            stateObserver: a => setOpts(d => void (d.singleQuote = a)),
            localStorageName: "singleQuote"
          })}
        />
        <b>singleQuote</b>
        <p>{singleQuote.description}</p>
      </label>

      <label>
        <input
          type="checkbox"
          {...useCheckInput(semi.default, {
            stateObserver: a => setOpts(d => void (d.semi = a)),
            localStorageName: "semi"
          })}
        />
        <b>semi</b>
        <p>{semi.description}</p>
      </label>
      <label>
        <input
          type="number"
          {...useInput(tabWidth.default, {
            stateObserver: a => setOpts(d => void (d.tabWidth = Number(a))),
            localStorageName: "tabWidth"
          })}
        />
        <b>tabWidth</b>
        <p>{tabWidth.description}</p>
      </label>
      <label>
        <b>trailingComma</b>
        Choose
        <select {...tcInput}>
          <option value="none">None (default)</option>
          <option value="es5">ES5</option>
          <option value="all">All</option>
        </select>
        <p>{tcOptions[tcInput.value as string]}</p>
      </label>
      <label>
        <input
          type="checkbox"
          {...useCheckInput(useTabs.default, {
            stateObserver: a => setOpts(d => void (d.useTabs = a)),
            localStorageName: "useTabs"
          })}
        />
        <b>useTabs</b>
        <p>{useTabs.description}</p>
      </label>
    </form>
  )
}
