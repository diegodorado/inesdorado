import * as React from "react"
import "../styles/app.scss"

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default Layout
