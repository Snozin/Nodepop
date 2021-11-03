import AdlistController from "./controllers/AdListController.js"
import LoadingAnimationController from "./controllers/LoadingAnimationController.js"
import MessageController from "./controllers/MessageController.js"


new LoadingAnimationController()

const adList = document.querySelector("#ad-list")
new AdlistController(adList)

const msgs = document.querySelector(".messages")
new MessageController(msgs)
