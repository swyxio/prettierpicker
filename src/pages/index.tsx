import React from "react"
import { format } from "prettier/standalone"
import { Options } from "prettier"
import babel from "prettier/parser-babylon"
// import "prettier/parser-typescript"
import schema from "./jsonschema"
import { useProduceState } from "@swyx/hooks"
import { AnimatedTabs } from "components/AnimatedTab"
import { TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"

import Form from "react-jsonschema-form"

const str = `
/* eslint-disable import/no-dynamic-require */
import * as React from 'react'
import { staticInfoContext } from './browser/hooks/useStaticInfo'

const OriginalSuspense = React.Suspense

function Suspense({ key, children, ...rest }) {
  return typeof document !== 'undefined' ? (
    <OriginalSuspense key={key} {...rest}>
      {children}
    </OriginalSuspense>
  ) : (
    <React.Fragment key={key}>{children}</React.Fragment>
  )
}

// Override the suspense module to be our own
React.Suspense = Suspense
React.default.Suspense = Suspense

const App = require("path").default

export default staticInfo => props => (
  <staticInfoContext.Provider value={staticInfo}>
    <App {...props} />
  </staticInfoContext.Provider>
)
`
const onSubmit = (x: any) => console.log(x)

export default () => {
  const [opts, setOpts] = useProduceState<Options>({
    parser: "babel",
    plugins: [babel]
  })

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pick your Prettier Config</h1>
      <p>
        <a href="https://prettier.io/docs/en/configuration.html" target="_blank">
          Prettier docs
        </a>
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", textAlign: "left" }}>
        <div style={{ display: "inline", minWidth: 300 }}>
          <AnimatedTabs color="red" style={{ minWidth: 400 }}>
            <TabList style={{ justifyContent: "space-around" }}>
              <Tab>Source</Tab>
              <Tab>Preview</Tab>
            </TabList>

            <TabPanels style={{ padding: 10 }}>
              <TabPanel>
                <div style={{ textAlign: "left" }}>
                  <pre>{str}</pre>
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{}}>
                  <pre>{format(str, opts)}</pre>
                </div>
              </TabPanel>
            </TabPanels>
          </AnimatedTabs>
        </div>
        <div style={{ display: "inline", width: 400 }}>
          <Form opts={opts} setOpts={setOpts} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}
