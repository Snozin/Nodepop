import PubSub from "./PubSub.js"

export default class RedirectService {
  constructor() {
    PubSub.subscribe(PubSub.events.REDIRECT, (path) => {
      this.redirect(path)
    })
  }
  // TODO Cambiar implementación para reutilizarlo en todos los controladores
  redirect(path) {
    if(path.includes('new-ad')){
      location.href = '/login.html'
    }
  }
}
