import React from "react"
import {
  ComponentType
  // StyleHTMLAttributes
} from "react"
import { Options } from "prettier"
import { properties } from "../jsonschema"
import { useCheckInput, useInput } from "@swyx/hooks"
import Tooltip from "@reach/tooltip"

function nameAndDescWithToolTip(name: keyof typeof properties) {
  return (
    <React.Fragment>
      <b>{name}</b>
      <Tooltip
        label={
          <div style={{ padding: 10 }}>
            <span style={{ display: "block" }}>
              <b>{name}</b>
            </span>
            {properties[name].description}
          </div>
        }
      >
        <span>
          {"  "}
          <span style={{ textDecoration: "underline", color: "blue" }}>(?)</span>
        </span>
      </Tooltip>
    </React.Fragment>
  )
}
function labelWithnameAndDescWithToolTip(name: keyof typeof properties, child: React.ReactNode) {
  return (
    <label style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <span>
        {child}
        <b>{name}</b>
      </span>
      <Tooltip
        label={
          <div style={{ padding: 10 }}>
            <span style={{ display: "block" }}>
              <b>{name}</b>
            </span>
            {properties[name].description}
          </div>
        }
      >
        <span>
          {"  "}
          <span style={{ textDecoration: "underline", color: "blue" }}>(?)</span>
        </span>
      </Tooltip>
    </label>
  )
}

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
      {labelWithnameAndDescWithToolTip(
        "arrowParens",
        <input
          type="checkbox"
          {...useCheckInput(arrowParens.default === "always", {
            stateObserver: a => setOpts(d => void (d.arrowParens = a ? "always" : "avoid")),
            localStorageName: "arrowParens"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "bracketSpacing",
        <input
          type="checkbox"
          {...useCheckInput(bracketSpacing.default, {
            stateObserver: a => setOpts(d => void (d.bracketSpacing = a)),
            localStorageName: "bracketSpacing"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "jsxBracketSameLine",
        <input
          type="checkbox"
          {...useCheckInput(jsxBracketSameLine.default, {
            stateObserver: a => setOpts(d => void (d.jsxBracketSameLine = a)),
            localStorageName: "jsxBracketSameLine"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "jsxSingleQuote",
        <input
          type="checkbox"
          {...useCheckInput(jsxSingleQuote.default, {
            stateObserver: a => setOpts(d => void (d.jsxSingleQuote = a)),
            localStorageName: "jsxSingleQuote"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "singleQuote",
        <input
          type="checkbox"
          {...useCheckInput(singleQuote.default, {
            stateObserver: a => setOpts(d => void (d.singleQuote = a)),
            localStorageName: "singleQuote"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "semi",
        <input
          type="checkbox"
          {...useCheckInput(semi.default, {
            stateObserver: a => setOpts(d => void (d.semi = a)),
            localStorageName: "semi"
          })}
        />
      )}
      {labelWithnameAndDescWithToolTip(
        "useTabs",
        <input
          type="checkbox"
          {...useCheckInput(useTabs.default, {
            stateObserver: a => setOpts(d => void (d.useTabs = a)),
            localStorageName: "useTabs"
          })}
        />
      )}
      <hr />

      <label>
        {nameAndDescWithToolTip("tabWidth")}
        <p>
          <input
            type="number"
            {...useInput(tabWidth.default, {
              stateObserver: a => setOpts(d => void (d.tabWidth = Number(a))),
              localStorageName: "tabWidth"
            })}
          />
        </p>
      </label>
      <label>
        {nameAndDescWithToolTip("trailingComma")}
        <p>
          Choose
          <select {...tcInput}>
            <option value="none">None (default)</option>
            <option value="es5">ES5</option>
            <option value="all">All</option>
          </select>
          <div>{tcOptions[tcInput.value as string]}</div>
        </p>
      </label>
    </form>
  )
}
