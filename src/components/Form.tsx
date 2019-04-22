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
export const Form: React.FC<FormProps> = function({ setOpts, onSubmit }) {
  const tcInput = useInput(properties.trailingComma.default, {
    stateObserver: a => setOpts(d => void (d.trailingComma = a as "none" | "es5" | "all")),
    localStorageName: "trailingComma"
  })

  function inputWithLabelWithnameAndDescWithToolTip(name: keyof typeof properties) {
    return labelWithnameAndDescWithToolTip(
      name,
      <input
        type="checkbox"
        {...useCheckInput(properties[name].default as boolean, {
          stateObserver: a => setOpts(d => void (d[name] = a)),
          localStorageName: name
        })}
      />
    )
  }
  return (
    <form onSubmit={onSubmit}>
      {labelWithnameAndDescWithToolTip(
        "arrowParens",
        <input
          type="checkbox"
          {...useCheckInput(properties.arrowParens.default === "always", {
            stateObserver: a => setOpts(d => void (d.arrowParens = a ? "always" : "avoid")),
            localStorageName: "arrowParens"
          })}
        />
      )}
      {["bracketSpacing", "jsxBracketSameLine", "jsxSingleQuote", "singleQuote", "semi", "useTabs"].map(
        inputWithLabelWithnameAndDescWithToolTip
      )}

      <hr />

      <label>
        {nameAndDescWithToolTip("tabWidth")}
        <p>
          <input
            type="number"
            {...useInput(properties.tabWidth.default, {
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
