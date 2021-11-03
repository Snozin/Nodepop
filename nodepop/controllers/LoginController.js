import PubSub from "../services/PubSub.js"
import DataService from "../services/DataService.js"

export default class LoginController {
  constructor(form) {
    this.form = form
    this.submitHandler()
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

        this.loginUser(username, password)
      } else {
        PubSub.publish(PubSub.events.MSG_ERROR, "Los campos son obligatorios")
      }
    })
  }

  async loginUser(username, password) {
    const dataService = new DataService()
    try {
      await dataService.loginUser(username, password)

      const url = new URLSearchParams(location.search)
      const next = url.get("next") || "/"

      location.href = next

    } catch (error) {
      PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    }
  }
}
