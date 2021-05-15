// Variable con la API a consumir
// https://pokeapi.co/api/v2/
const API = "https://pokeapi.co/api/v2/";

// Variables de apoyo
let cantElem = "20";
let dataElem = {};

// Consumir API
const getData = (API) => {
  return fetch(API)
    .then((response) => response.json())
    .then((json) => {
      saveData(json.results), dibujarData(json.results), paginacion(json);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

const getInfoPk = (API) => {
  return fetch(API)
    .then((response) => response.json())
    .then((json) => {
      showInfo(json, json.sprites, json.sprites.other.dream_world, json.sprites.other['official-artwork'].front_default);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

// Dibujar cards de pokemones
const dibujarData = (data) => {
  let html = "";
  data.forEach((pk) => {
    html += `
    <div class="col-md-3 m-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body text-center">
                <h5 class="card-title">${ pk.name }</h5>
                <button class="btn btn-danger btn-sm" onclick="getInfoPk('${ pk.url }')">Información del pokemon</button>
            </div>
        </div>
    </div>`;
  });
  document.getElementById("datosPk").innerHTML = html;
};

// Mostrar información basica del pokemon
const showInfo = ({ name, weight, height, stats }, imgs, dream_world, official_artwork) => {
    let html = `
    <div id="myModal" class="modal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h5 class="modal-title">${ name.toUpperCase() }</h5>
                    <button type="button" class="btn-close btn-dark" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-center text-center">
                        <img src="${ official_artwork }" class="imgHead">
                        <h2>Caracteristicas</h2>
                        <div class="col-lg-6"><h3 class="text-info">Nombre:</h3></div>
                        <div class="col-lg-6"><h3>${ capitalize(name) }</h3></div>
                        <div class="col-lg-6"><h3 class="text-info">Peso:</h3></div>
                        <div class="col-lg-6"><h3>${ weight } g</h3></div>
                        <div class="col-lg-6"><h3 class="text-info">Estatura:</h3></div>
                        <div class="col-lg-6"><h3>${ height } cm</h3></div>
                        <h2>Stats de combate</h2>
                        <div class="col-lg-3"><h3 class="text-info">Vida:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[0].base_stat }</h3></div>
                        <div class="col-lg-3"><h3 class="text-info">Ataque:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[1].base_stat }</h3></div>
                        <div class="col-lg-3"><h3 class="text-info">Defensa:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[2].base_stat }</h3></div>
                        <div class="col-lg-3"><h3 class="text-info">Ataque especial:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[3].base_stat }</h3></div>
                        <div class="col-lg-3"><h3 class="text-info">Defensa especial:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[4].base_stat }</h3></div>
                        <div class="col-lg-3"><h3 class="text-info">Velocidad:</h3></div>
                        <div class="col-lg-3"><h3>${ stats[5].base_stat }</h3></div>
                        <h2>Sexo</h2>
                        <div class="col-lg-6">
                            <h2>Masculino</h2>
                            ${ imgs.back_default ? `<img src="${ imgs.back_default }">` : "" }
                            ${ imgs.back_shiny ? `<img src="${ imgs.back_shiny }">` : "" }
                            ${ imgs.front_default ? `<img src="${ imgs.front_default }">` : "" }
                            ${ imgs.front_shiny ? `<img src="${ imgs.front_shiny }">` : "" }
                        </div>
                        <div class="col-lg-6">
                            <h2>Femenino</h2>
                            ${ imgs.back_female ? `<img src="${ imgs.back_female }">` : "" }
                            ${ imgs.back_shiny_female ? `<img src="${ imgs.back_shiny_female }">` : "" }
                            ${ imgs.front_female ? `<img src="${ imgs.front_female }">` : "" }
                            ${ imgs.front_shiny_female ? `<img src="${ imgs.front_shiny_female }">` : "" }
                        </div>
                        <h2>Mundo de sueños</h2>
                        <div class="col-lg-6">
                            <h2>Masculino</h2>
                            ${ dream_world.front_default ? `<img src="${ dream_world.front_default }" class="imgMunSue">` : "" }
                        </div>
                        <div class="col-lg-6">
                            <h2>Femenino</h2>
                            ${ dream_world.front_female ? `<img src="${ dream_world.front_female }" class="imgMunSue">` : "" }
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("modal").innerHTML = html;
    let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    myModal.show();
};

// Paginación
const paginacion = (data) => {
  let html = `
    <div class="col-lg-6">
      <button class="btn btn-info ${ data.previous ? "" : "disabled" }" onclick="getData('${data.previous}')">Prev</button>
      <button class="btn btn-info ${ data.next ? "" : "disabled" }" onclick="getData('${data.next}')">Next</button>
      <label class="text-info"> Cantidad a traer:
        <select id="cantShow" class="selCant">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>
    </div>
    <div class="col-lg-6 text-light">
      <input id="search" class="search" placeholder="Buscar Pokemon">
      Cantidad de pokemones: ${ data.count }
    </div>
  `;
  document.getElementById("paginacion").innerHTML = html;
  document.getElementById("cantShow").value = cantElem;
  document.getElementById("search").addEventListener("keyup", (e) => searchf(e));
  document.getElementById("cantShow").addEventListener("change", (e) => cantShowf(e));
};

const sppiner = () => {
  let html = `
    <div class="spinner-border mt-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  document.getElementById("datosPk").innerHTML = html;
}

const cantShowf = (event) => {
  sppiner();
  cantElem = event.target.value;
  getData(API + `pokemon?limit=${ event.target.value }&offset=00`);
};

const searchf = (event) => {
  let pjsEncontrados = [];
  dataElem.forEach(pj => {
    if(pj.name.toLowerCase().indexOf(event.target.value) > -1) {
      pjsEncontrados.push(pj);
    }
  });
  dibujarData(pjsEncontrados);
};

const saveData = (data) => {
  dataElem = data;
}

// Capitalizar solo la primera letra
const capitalize = (texto) => {
    return texto[0].toUpperCase() + texto.slice(1);
};

// Ejecutar getData
sppiner();
getData(API + `pokemon?limit=${ cantElem }&offset=00`);
