import LoginController from "./controllers/LoginController.js"
import MessageController from "./controllers/MessageController.js"
import LoadingAnimationController from "./controllers/LoadingAnimationController.js"

new LoadingAnimationController()
const form = document.querySelector("form")
new LoginController(form)

const msgs = document.querySelector(".messages")
new MessageController(msgs)
