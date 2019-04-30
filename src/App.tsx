import React from "react"
import { Root, Routes, addPrefetchExcludes } from "react-static"
import { Link, Router } from "@reach/router"
// import FancyDiv from 'components/FancyDiv'
import Dynamic from "containers/Dynamic"
import "./app.css"
import { IdentityModal, useNetlifyIdentity, IdentityContextProvider } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(["dynamic"])

function App() {
  const [dialog, setDialog] = React.useState(false)
  const identity = useNetlifyIdentity("https://prettierpicker.netlify.com")

  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || null
  // const avatar_url = identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.avatar_url

  return (
    <Root>
      <IdentityContextProvider value={identity}>
        <nav>
          <Link to="/">Home</Link>
          {identity && identity.isLoggedIn ? (
            <div>
              <span>
                Logged in as <strong style={{ color: "orange" }}>{name}</strong>
              </span>
              <button className="authbtn loggedin" onClick={() => setDialog(true)}>
                LOG OUT
              </button>
            </div>
          ) : (
            <button className="authbtn" onClick={() => setDialog(true)}>
              LOG IN
            </button>
          )}
        </nav>
        <div className="content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Dynamic path="dynamic" />
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </IdentityContextProvider>
    </Root>
  )
}

export default App
