const vidContainer = document.querySelector(".vidContainer");
const form = document.querySelector("form");
const input = document.querySelector("input");
const loading = document.querySelector(".loading");
const searchIcon = document.querySelector(".searchIcon");
const err = document.querySelector(".err");
//ocultar err
loading.style.display = "none";
err.style.display = "none";
/////////////////////////////////////////// -función API-ERR-EJECUTAR INFRA
const searchYoutubeVid = async (searchTerm) => {
  try {
    //consultar la API
    loading.style.display = "block";
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=AIzaSyCCnORRgpscAY1DeUleCeWwc91y-LEwR0U`
    );

    const data = await res.json();

    //Interceptar error
    if (data.error) {
      err.style.display = "block";
      loading.style.display = "none";
    }
    // mostrar resultados de la busqueda ejecutando la función
    data.items.forEach((vid) => {
      displayVids(vid);
    });
    //ocultar contenedor err
    loading.style.display = "none";
    //ocultar icono imagen de busqueda
    searchIcon.style.display = "none";
  } catch (error) {
    err.style.display = "block";
    loading.style.display = "none";
  }
};

//lanzar busqueda - interceptar evento

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //obteniendo el valor
  const val = input.value;
  searchYoutubeVid(val);
});

//searchYoutubeVid("MERN");
/////////////////////////////////////////// -función infra
//crear infra de los contenedores de los videos
const displayVids = (video) => {
  //console.log(video);
  //crear contenedores section con la class vidItem para cada resultado
  const vidItem = document.createElement("section");
  vidItem.classList.add("vidItem");
  //console.log(vidContainer);
  //agregando los elementos o contenedores hijos al main
  vidContainer.appendChild(vidItem);

  //crear iframe con todos los attributos necesarios.
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    `https://www.youtube.com/embed/${video.id.videoId}`
  );
  iframe.setAttribute("height", "315");
  iframe.setAttribute("width", "560");
  iframe.setAttribute("frameborder", "0");
  //agregar los iframe dentro de los sections
  vidItem.appendChild(iframe);

  ///// crear 4 parrafos con sus respectivas class (metadatos del video)
  //titulo
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = video.snippet.title;
  // descripción
  const desc = document.createElement("p");
  desc.classList.add("desc");
  desc.innerHTML = video.snippet.description;

  // canal
  const channel = document.createElement("p");
  channel.classList.add("channel");
  channel.innerHTML = video.snippet.channelTitle;

  // fecha
  const date = document.createElement("p");
  date.classList.add("date");
  date.innerHTML = video.snippet.publishedAt;

  //anexar los metadatos a su respectivo section
  vidItem.appendChild(title);
  vidItem.appendChild(channel);
  vidItem.appendChild(date);
  vidItem.appendChild(desc);
};
