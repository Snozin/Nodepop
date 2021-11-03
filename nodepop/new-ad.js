import LoadingAnimationController from "./controllers/LoadingAnimationController.js"
import NewAdController from "./controllers/NewAdController.js"
import MessageController from "./controllers/MessageController.js"
import RedirectService from "./services/RedirectService.js"
import DataService from "./services/DataService.js"

const dataService = new DataService()
if (!dataService.isAuthenticated()) {
  location.href = '/login.html?next=/new-ad.html'
}

new LoadingAnimationController()
new RedirectService()

const form = document.querySelector("form")
new NewAdController(form)

const msg = document.querySelector(".messages")
new MessageController(msg)
