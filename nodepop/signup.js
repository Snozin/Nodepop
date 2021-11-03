import SignupController from "./controllers/SignupController.js"
import MessageController from "./controllers/MessageController.js"
import LoadingAnimationController from "./controllers/LoadingAnimationController.js"

new LoadingAnimationController()
const form = document.querySelector("form")
new SignupController(form)

const msgs = document.querySelector(".messages")
new MessageController(msgs)
