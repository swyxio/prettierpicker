import React from "react"

export class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() // error
  {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children
  }
}
