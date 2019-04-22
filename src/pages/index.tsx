import React from "react"
import { format } from "prettier/standalone"
import { Options } from "prettier"
import babel from "prettier/parser-babylon"
// import "prettier/parser-typescript"
import { useProduceState, useInput } from "@swyx/hooks"
import { Form, AnimatedTabs, AnimatedTab, ErrorBoundary } from "components"
import { TabList, TabPanels, TabPanel } from "@reach/tabs"
import Prism from "prismjs"
import "prismjs/themes/prism.css"

const onSubmit = (x: any) => console.log(x)

export default () => {
  const [opts, setOpts] = useProduceState<Options>({
    parser: "babel",
    plugins: [babel]
  })
  const rawCode = useInput(str())
  const { parser, plugins, ...displayedOpts } = opts
  console.log("Obscuring from displayedOpts", { parser, plugins })

  let prettifiedCode = ""
  try {
    prettifiedCode = Prism.highlight(format(rawCode.value as string, opts), Prism.languages.javascript, "js")
  } catch (err) {
    console.error("invalid js in Raw Code Editor", err)
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pick your Prettier Config</h1>
      <div style={{ display: "flex", justifyContent: "space-between", textAlign: "left" }}>
        <div style={{ display: "inline", flex: 1, paddingRight: 10 }}>
          <AnimatedTabs color="red" style={{ height: "100%" }}>
            <TabList style={{ display: "flex", justifyContent: "space-around" }}>
              <AnimatedTab style={{ flex: 1 }}>Edit Raw Code</AnimatedTab>
              <AnimatedTab style={{ flex: 1 }}>Show Prettier Code</AnimatedTab>
            </TabList>

            <TabPanels style={{ padding: 10, height: "100%", minHeight: "50vh" }}>
              <TabPanel style={{ height: "100%" }}>
                <textarea id="editor-content" onChange={rawCode.onChange} value={rawCode.value} />
              </TabPanel>
              <TabPanel>
                <ErrorBoundary>
                  <pre id="editor">
                    <code
                      className="language-javascript"
                      dangerouslySetInnerHTML={{
                        __html: prettifiedCode
                      }}
                    />
                  </pre>
                </ErrorBoundary>
              </TabPanel>
            </TabPanels>
          </AnimatedTabs>
        </div>
        <div style={{ width: 300 }}>
          <AnimatedTabs color="green">
            <TabList style={{ justifyContent: "space-around" }}>
              <AnimatedTab>Edit</AnimatedTab>
              <AnimatedTab>Export</AnimatedTab>
            </TabList>

            <TabPanels style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.1)" }}>
              <TabPanel>
                <p>
                  This is just a selection of the config options. For advanced options refer to the{" "}
                  <a href="https://prettier.io/docs/en/configuration.html" target="_blank">
                    Prettier docs
                  </a>
                </p>
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
      <div style={{ marginTop: 30 }}>
        <a href="https://github.com/sw-yx/prettierpicker">Source</a> | <a href="https://twitter.com/swyx">@swyx</a>
      </div>
    </div>
  )
}

function str() {
  return `// arrowParens
const foo = bar => console.log(bar)
// bracketSpacing
function baz({foo}) {
console.log({foo})
}
// jsxBracketSameLine
// jsxSingleQuote
function MyComponent() {
return (<Foo 
bar="lskjdlskdjlskjdlskjd" 
baz="sdlksjdlqjwlkajdlwkj" 
quux="sdlksjdlqjwlkajdlwkj" 
>
<div> hi</div>
</Foo>)
}
// singleQuote
console.log("do", "you", "want", "singleQuote?")
// semi
console.log("no semi for life!!1!!")
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
