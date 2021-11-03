import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"
import RedirectService from "../services/RedirectService.js"

export default class NewAdController {
  constructor(form) {
    new RedirectService()
    this.form = form
    this.submitHandler()
  }

  submitHandler() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault()

      if (this.form.checkValidity()) {
        const data = new FormData(this.form)
        const title = data.get("title")
        const content = data.get("description")
        const price = data.get("price")
        const type = data.get("type")

        const ad = { title, content, price, type }

        PubSub.publish(PubSub.events.SHOW_LOAD_ANIMATION, this.form)
        this.createNewAd(ad)
      }
    })
  }

  async createNewAd(ad) {
    const dataService = new DataService()
    try {
      if (dataService.isAuthenticated()) {
        await dataService.createAd(ad)
        PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
        PubSub.publish(PubSub.events.MSG_SUCCESS, "Anuncio creado!")
        location.href = '/'
      } else {
        PubSub.publish(
          PubSub.events.MSG_ERROR,
          "Debes registrarte para publicar anuncios!"
        )
        PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
        return false
      }
    } catch (error) {
      PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    }
  }
}
