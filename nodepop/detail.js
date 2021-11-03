import AdDetailController from "./controllers/AdDetailController.js"
import LoadingAnimationController from "./controllers/LoadingAnimationController.js"
import MessageController from "./controllers/MessageController.js"

const detail = document.querySelector("#ad-detail")
const id = new URLSearchParams(location.search).get("id")

new LoadingAnimationController()
new AdDetailController(detail, id)
const msgs = document.querySelector(".messages")
new MessageController(msgs)
