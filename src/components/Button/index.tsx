// Styles
import './Button.scss'

const Button = (props: { children: React.ReactNode }) => {
  return (
    <button {...props}>{props.children}</button>
  )
}

export default Button
