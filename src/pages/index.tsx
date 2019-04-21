import React from "react"
import { format } from "prettier/standalone"
import { Options } from "prettier"
import babel from "prettier/parser-babylon"
// import "prettier/parser-typescript"
import { useProduceState, useInput, useCheckInput } from "@swyx/hooks"
import { Form, AnimatedTabs, ErrorBoundary } from "components"
import { TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import Prism from "prismjs"
import "prismjs/themes/prism.css"

const onSubmit = (x: any) => console.log(x)

export default () => {
  const [opts, setOpts] = useProduceState<Options>({
    parser: "babel",
    plugins: [babel]
  })
  const showRaw = useCheckInput(true)
  const showPost = useCheckInput(true)
  const rawCode = useInput(str())
  const { parser, plugins, ...displayedOpts } = opts
  console.log("Obscuring from displayedOpts", { parser, plugins })

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pick your Prettier Config</h1>
      <p>
        <a href="https://prettier.io/docs/en/configuration.html" target="_blank">
          Prettier docs
        </a>
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", textAlign: "left" }}>
        <div style={{ display: "inline", width: "100%" }}>
          <div>
            <label>
              <input type="checkbox" {...showRaw} />
              show/edit raw code
            </label>
            <label>
              <input type="checkbox" {...showPost} />
              show post edit code
            </label>
          </div>
          <pre id="editor" style={{ minHeight: "80vh" }}>
            {showPost.checked && (
              <ErrorBoundary>
                <code
                  className="language-javascript"
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(format(rawCode.value as string, opts), Prism.languages.javascript, "js")
                  }}
                />
              </ErrorBoundary>
            )}
            {showRaw.checked && <textarea id="editor-content" onChange={rawCode.onChange} value={rawCode.value} />}
          </pre>
          {/* <AnimatedTabs color="red">
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
          </AnimatedTabs> */}
        </div>
        <div style={{ display: "inline", width: 400, backgroundColor: "rgba(0,0,0,0.1)" }}>
          <AnimatedTabs color="red">
            <TabList style={{ justifyContent: "space-around" }}>
              <Tab>Edit</Tab>
              <Tab>Export</Tab>
            </TabList>

            <TabPanels style={{ padding: 10 }}>
              <TabPanel>
                <Form opts={opts} setOpts={setOpts} onSubmit={onSubmit} />
              </TabPanel>
              <TabPanel>
                <p>
                  Put this in your <code>.prettierrc</code>:
                </p>
                <pre>{JSON.stringify(displayedOpts, null, 2)}</pre>
              </TabPanel>
            </TabPanels>
          </AnimatedTabs>
        </div>
      </div>
    </div>
  )
}

function str() {
  return `/* eslint-disable import/no-dynamic-require */
import * as React from 'react'
import { staticInfoContext } from './browser/hooks/useStaticInfo'
import { ErrorBoundary } from '../components/ErrorBoundary';

const OriginalSuspense = React.Suspense

function Suspense({ key, children, ...rest }) {
  return typeof document !== 'non JSX single quotes' ? (
    <OriginalSuspense key={key} someProp="JSX single quotes" {...rest}>
      {children}
    </OriginalSuspense>
  ) : (
    <React.Fragment key={key}>{children}</React.Fragment>
  )
}

export default staticInfo => props => (
  <staticInfoContext.Provider value={staticInfo}>
    <App {...props} />
  </staticInfoContext.Provider>
)

const tcOptions = {
  none: "No trailing commas.",
  es5: "Trailing commas where ",
  all: "Trailing commas allover"
}
`
}

/**
 * Lorem ipsum dolor sit amet consectetur adipisicing elit.
 *  Officiis nulla commodi cumque ipsum, quod atque est
 * explicabo omnis exercitationem et, quo quam fugit impedit
 * earum, quos reiciendis illo voluptatum similique a ullam
 * sit? Aliquam, iure. Eaque minima eligendi exercitationem velit!
 * Error, libero minima repellendus sunt alias eius officia hic corrupti!
 * */
