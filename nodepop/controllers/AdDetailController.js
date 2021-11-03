import { detailView, emptyView } from "../views/AdsView.js"
import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class AdDetailController {
  constructor(element, id) {
    PubSub.publish(PubSub.events.SHOW_LOAD_ANIMATION, element)
    this.element = element
    this.dataService = new DataService()
    this.render(id)
  }

  async render(id) {
    try {
      const ad = await this.dataService.getAds(id)

      if (ad === null) {
        this.element.innerHTML = emptyView()
      } else {
        this.element.innerHTML = detailView(ad)
        if (ad.canBeDeleted) {
          this.addDeleteEventListener(id)
        }
      }
    } catch (error) {
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    }
  }

  addDeleteEventListener(id) {
    const button = document.querySelector(".deleteButton")
    button.addEventListener("click", async () => {
      const answer = confirm("¿Seguro que quieres borrarlo?")
      if (answer === true) {
        button.setAttribute("disabled", true)
        PubSub.publish(PubSub.events.SHOW_LOAD_ANIMATION, this.element)
        try {
          await this.dataService.deleteAd(id)
          // TODO Gestionar el mensaje de url para informar del borrado correcto
          location.href = "/?msg=ad-deleted"
        } catch (error) {
          PubSub.publish(PubSub.events.MSG_ERROR, error)
        }
      }
    })
  }
}
