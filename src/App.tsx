import { useEffect, useState } from "react"
import "./css/App.css"

import florLogo from './assets/flor.svg'

let users = [
  {
    name: "pepe",
    email: "pepe@email.com",
    password: "secret_password_pepe",
  },
  {
    name: "ana",
    email: "ana@email.com",
    password: "secret_password_ana",
  },
]

// check for account
const check_user = (email: string) => {
  const user_found = users.find((user) => user.email === email)
  if (!user_found)
    return {
      message: "User does not exist.",
    }

  return {
    message: "User exist.",
  }
}

// create account
const register_user = (user: {
  name: string
  email: string
  password: string
}) => {
  const { name, email, password } = user

  if (!(typeof name === "string" && name.length > 0))
    return { error: "Name required" }

  if (!(typeof email === "string" && name.length > 0))
    return { error: "Email required" }

  if (!(typeof password === "string" && name.length > 0))
    return { error: "Password required." }

  users = [user, ...users]

  // console.log(users)

  return { message: "The user has successfully registered." }
}

// login

const login_user = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user_found = users.find((user) => user.email === email)
  if (user_found?.password === password) return { message: "Successfull login" }
  return { error: "Invalid password" }
}

const CodeUser = () => (
  <code className="drop-shadow-hover">
{`name: "pepe"
email: "pepe@email.com"
password: "secret_password_pepe"
`}
  </code>
)

function App() {
  const [info, set_info] = useState({
    email: "",
    password: "",
    name: "",
  })

  const [is_disable_button, set_is_disable_button] = useState(true)

  const [available_check_user, set_available_check_user] = useState(true)

  const [show_login, set_show_login] = useState(false)
  const [show_registration, set_show_registration] = useState(false)

  const [error_text, set_error_text] = useState("")
  const [button_text, set_button_text] = useState("Check Email")

  const [success_text, set_success_text] = useState("")


  // Handlers

  const handler_reset = () => {
    set_available_check_user(true)

    set_show_login(false)
    set_show_registration(false)

    set_is_disable_button(true)
  }

  const handler_button = () => {
    if (available_check_user) {
      const exist_user = check_user(info.email)

      if (exist_user?.message === "User does not exist.") {
        set_show_registration(true)
        set_button_text("Register now!")
      }

      if (exist_user?.message === "User exist.") {
        set_show_login(true)
        set_button_text("Let's login")
      }

      set_available_check_user(false)
      set_is_disable_button(true)
    } else {
      const { email, password, name } = info
      console.log(info)

      let response

      if (show_login) {
        response = login_user({
          email,
          password,
        })
        console.log(response)
      }

      if (show_registration) {
        response = register_user(info)
        console.log(response)
      }

      if (response?.error) {
        set_error_text(response.error)

        setTimeout(() => {
          set_error_text("")
        }, 4000)
      }

      if (response?.message) {
        set_button_text("Check Email.")
        set_success_text(response?.message)
        set_info({ email: "", password: "", name: "", })
      }
    }
  }

  const handler_change_input = (e: any) => {
    set_info((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  // Effects

  useEffect(() => {
    console.log(info.email.length)
    if (info.email.length > 0 && is_disable_button === true)
      set_is_disable_button(false)
    if (info.email.length === 0 && is_disable_button === false) handler_reset()
  }, [info.email])

  useEffect(() => {
    if (info.password.length > 0 && is_disable_button === true)
      set_is_disable_button(false)
  }, [info.password])

  useEffect(() => {
    if (info.name.length > 0 && is_disable_button === true)
      set_is_disable_button(false)
  }, [info.name])

  //

  return (
    <div className="App">
      {/* <img src="/vite.svg" className="logo" alt="Vite logo" /> */}
      <img src={florLogo} className="logo react" alt="React logo" />

      

        <CodeUser />


      {success_text.length > 0 && ( <div className="success_text">{success_text}</div> )}

      {error_text.length > 0 && <div className="error_text">{error_text}</div>}

      <input
        type="email"
        value={info.email}
        name="email"
        placeholder="Email"
        disabled={!available_check_user}
        onChange={handler_change_input}
      />

      {show_login && (
        <input
          type="password"
          value={info.password}
          name="password"
          placeholder="Password"
          onChange={handler_change_input}
        />
      )}

      {show_registration && (
        <>
          <input
            type="password"
            value={info.password}
            name="password"
            placeholder="Password"
            onChange={handler_change_input}
          />
          <input
            type="text"
            value={info.name}
            name="name"
            placeholder="Name"
            onChange={handler_change_input}
          />
        </>
      )}

      <button onClick={handler_button} disabled={is_disable_button}>
        {button_text}
      </button>
    </div>
  )
}

export default App
