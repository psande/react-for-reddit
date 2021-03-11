// Libraries
import React from "react"

// Styles
import './Button.scss'

// Types
type Props = React.HTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = (props) => (
  <button {...props}>{props.children}</button>
)

export default Button
