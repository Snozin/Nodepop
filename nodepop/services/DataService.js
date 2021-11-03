import PubSub from "./PubSub.js"

export default class DataService {
  async getAds(id) {
    let url = "http://localhost:8000/api/ads?_expand=user"
    if (id) {
      url = `http://localhost:8000/api/ads/${id}?_expand=user`
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        if (response.status === 404) {
          return null
        } else {
          PubSub.publish(PubSub.events.MSG_ERROR, "Error al cargar anuncios")
        }
      } else {
        const rawAds = await response.json()
        if (Array.isArray(rawAds)) {
          const ads = rawAds.map((ad) => this.parseAd(ad))
          return rawAds.map((ad) => this.parseAd(ad))
        } else {
          return this.parseAd(rawAds)
        }
      }
    } catch (error) {
      // console.warn("DataService error:", error)
      PubSub.publish(PubSub.events.MSG_ERROR, error)
    }
  }

  async request(method, url, body) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(body),
    }

    if (this.isAuthenticated()) {
      const authToken = localStorage.getItem("Auth_Token")
      config.headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(url, config)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }

    return data
  }

  async post(url, body) {
    return await this.request("POST", url, body)
  }

  async createUser(username, password) {
    const url = "http://localhost:8000/auth/register"

    return await this.post(url, { username, password })
  }

  async loginUser(username, password) {
    const url = "http://localhost:8000/auth/login"

    const data = await this.post(url, { username, password })
    const token = data.accessToken

    localStorage.setItem("Auth_Token", token)
  }

  async deleteAd(id) {
    const url = `http://localhost:8000/api/ads/${id}`
    const body = {}
    return await this.request("DELETE", url, body)
  }

  async createAd(ad) {
    const url = "http://localhost:8000/api/ads"
    await this.post(url, ad)
  }

  isAuthenticated() {
    return localStorage.getItem("Auth_Token") !== null
  }

  getAuthUserID() {
    if (!this.isAuthenticated()) {
      return null
    }
    const token = localStorage.getItem("Auth_Token")
    const tokenParts = token.split(".")
    if (tokenParts.length !== 3) {
      PubSub.publish(
        PubSub.events.MSG_ERROR,
        "El token no tiene un formato válido."
      )
      return null
    }
    const b64data = tokenParts[1]
    try {
      const userData = JSON.parse(atob(b64data))
      return userData.userId
    } catch (error) {
      PubSub.publish(PubSub.events.MSG_ERROR, error)
      console.error("Error decodificando el Token JWT")
      return null
    }
  }

  parseAd(ad) {
    ad.title = this.escapeHTML(ad.title)
    ad.content = this.escapeHTML(ad.content)
    ad.author = ad.user.username
    ad.canBeDeleted = ad.userId === this.getAuthUserID()
    return ad
  }

  escapeHTML(string) {
    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }
}
