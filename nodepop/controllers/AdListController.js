import PubSub from "../services/PubSub.js"
import { adView, emptyView } from "../views/AdsView.js"
import DataService from "../services/DataService.js"

export default class AdlistController {
  constructor(element) {
    this.element = element
    PubSub.publish(PubSub.events.SHOW_LOAD_ANIMATION, this.element)
    this.render()
  }

  async render() {
    try {
      const dataService = new DataService()
      const adsData = await dataService.getAds()
      if (adsData.length === 0) {
        this.element.innerHTML = emptyView()
      } else {
        for (const ad of adsData) {
          this.element.innerHTML += adView(ad)
        }
      }
    } catch (error) {
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    } finally {
      PubSub.publish(PubSub.events.HIDE_LOAD_ANIMATION)
    }
  }
}
