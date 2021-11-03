export const detailView = (ad) => {
  let deleteButton = ''
  if(ad.canBeDeleted){
    deleteButton = '<button class="deleteButton">Borrar</button>'
  }
  return `
  <a href="../detail.html?id=${ad.id}">
    <article id="${ad.id}">
      <h3>${ad.title}</h3>
      <span><i>${ad.type}</i></span>
      <br>
      <img src="" alt="Imagen de anuncio ${ad.id}" />
      <p>${ad.content}</p>
      <p>${ad.author}</p>
      <span><strong>${ad.price} €</strong></span>
    </article>
  </a>
      ${deleteButton}
  <hr>
  `
}

export const adView = (ad) => {
  return `
  <a href="../detail.html?id=${ad.id}">
    <article id="${ad.id}">
      <h3>${ad.title}</h3>
      <span><i>${ad.type}</i></span>
      <br>
      <img src="" alt="Imagen de anuncio ${ad.id}" />
      <p>${ad.content}</p>
      <p>${ad.author}</p>
      <span><strong>${ad.price} €</strong></span>
    </article>
  </a>
  <hr>
  `
}

export const emptyView = () => `<div>
<h2>Oops!!</h2>
<p>Aún no hay nada por aquí</p>
</div>`
