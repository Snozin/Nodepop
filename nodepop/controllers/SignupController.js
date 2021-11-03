import PubSub from "../services/PubSub.js"
import DataService from "../services/DataService.js"

export default class SignupController {
  constructor(form) {
    this.form = form
    this.submitHandler()
    this.passwordHandler()
  }

  submitHandler() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault()

      if (this.form.checkValidity()) {
        const data = new FormData(this.form)
        const username = data.get("username")
        const password = data.get("password")

        const loadingDiv = this.form.querySelector("div")
        PubSub.publish(PubSub.events.SHOW_LOAD_ANIMATION, loadingDiv)

        this.createUser(username, password)
      }
    })
  }

  async createUser(username, password) {
    const dataService = new DataService()
    try {
      await dataService.createUser(username, password)
      PubSub.publish(PubSub.events.MSG_SUCCESS, "Usuario registrado!")

      location.href = "/"
    } catch (error) {
      PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    }
  }

  checkFormValidity() {
    if (this.form.checkValidity()) {
      return true
    } else {
      let errorMessage = ""
      for (const input of this.form.elements) {
        if (!input.validity.valid) {
          errorMessage += `Error en el campo ${input.name}: 
          ${input.validationMessage}. \n`
        }
      }
      console.warn(errorMessage)
      return false
    }
  }

  passwordHandler() {
    this.form.querySelectorAll('input[type="password"]').forEach((input) => {
      input.addEventListener("input", () => {
        this.checkPasswordsAreSame()
      })
    })
  }

  checkPasswordsAreSame() {
    const inputs = this.form.querySelectorAll('input[type="password"]')

    const passwords = []
    for (const input of inputs) {
      if (passwords.includes(input.value) === false) {
        passwords.push(input.value)
      }
    }

    for (const input of inputs) {
      if (passwords.length === 1) {
        input.setCustomValidity("")
        this.errorStyleHandler(input, "ok")
      } else {
        input.setCustomValidity("Las contraseñas no coinciden")
        this.errorStyleHandler(input)
      }
    }
  }

  errorStyleHandler(input, status = "wrong") {
    const button = this.form.querySelector('button[type="submit"]')
    if (status === "ok") {
      input.className = status
      button.removeAttribute("disabled")
      document.querySelector(".messages").className = "messages"
    } else {
      input.className = status
      button.setAttribute("disabled", "")
      PubSub.publish(PubSub.events.MSG_ERROR, input.validationMessage)
    }
  }
}
