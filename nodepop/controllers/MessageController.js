import { errorMsgView, successMsgView } from "../views/MessageViews.js"
import PubSub from "../services/PubSub.js"

export default class MessageController {
  constructor(element) {
    this.element = element

    PubSub.subscribe(PubSub.events.MSG_ERROR, (error) => {
      this.showErrorMsg(error)
    })
    PubSub.subscribe(PubSub.events.MSG_SUCCESS, (msg) => {
      this.showSuccessMsg(msg)
    })
  }

  showErrorMsg(msg) {
    // console.warn("Error lanzado en msgController:", msg)
    this.element.innerHTML = errorMsgView(msg)
    this.element.classList.add("error")
    this.closeMessageButton()
  }

  showSuccessMsg(msg) {
    this.element.innerHTML = successMsgView(msg)
    this.element.classList.add("success")
    // this.closeMessageButton()
  }

  closeMessageButton() {
    const button = this.element.querySelector("button")
    button.addEventListener("click", () => {
      this.element.className = 'messages'
      PubSub.publish(PubSub.events.REDIRECT, location.pathname)
    })
  }
}
