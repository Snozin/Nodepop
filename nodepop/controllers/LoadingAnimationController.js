import PubSub from "../services/PubSub.js"
import LoadingView from "../views/LoadingView.js"

export default class LoadingAnimationController {
  constructor() {

    PubSub.subscribe(PubSub.events.SHOW_LOAD_ANIMATION, (element) => {
      this.showHandler(element)
    })
    PubSub.subscribe(PubSub.events.HIDE_LOAD_ANIMATION, () => {
      this.hideHandler()
    })
  }

  showHandler(element) {
    element.innerHTML = LoadingView()
  }

  hideHandler() {
    const loadingDiv = document.querySelector('.loading')
    loadingDiv.style.display = 'none'
  }
}
