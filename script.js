// 10226095432389769

let form = $("#form");
let inputHero = $("#inputHero");

form.submit((eventPD) => {
  // preventDefault
  eventPD.preventDefault();

  // get ID Hero
  inputHero = $("#inputHero").val();

  // Test
  console.log(inputHero);

  // Alert
  if (inputHero > 732 || inputHero <= 0) {
    alert("Ingresa un número entre 1 y 732");
  }

  // API SUPERHEROES
  $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api/10226095432389769/${inputHero}`,
    dataType: "json",
    success: (datosApi) => {

      // Card
      $("#superherocard").append(`
            <h4>SuperHero Encontrado</h4>
            <hr>
            <div class="card">
                <img class="card-img-top" src="${
                  datosApi.image.url
                }" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${datosApi.name}</h5>
                    <p class="card-text">Conexiones: ${
                      datosApi.connections["group-affiliation"]
                    }</p>
                </div>
                <ul class="list-group list-group-flush ml-4">
                <li class="list-group-item"><i>Publicado por:</i> ${
                  datosApi.biography.publisher
                }</li>
                <li class="list-group-item"><i>Ocupación:</i> ${
                  datosApi.work.occupation
                }</li>
                <li class="list-group-item"><i>Primera Aparición:</i> ${
                  datosApi.biography["first-appearance"]
                }</li>
                <li class="list-group-item"><i>Altura:</i> ${datosApi.appearance.height.join(
                  " - "
                )}</li>
                <li class="list-group-item"><i>Peso:</i> ${datosApi.appearance.weight.join(
                  " - "
                )}</li>
                <li class="list-group-item"><i>Alianzas:</i> ${
                  datosApi.biography.aliases
                }</li>
              </ul>
            </div>
            <br>
            `);
      
      
      // Grafico
      let options = {
        title: {
          text: `Estadísticas de Poder para ${datosApi.name}`,
        },
        data: [
          {
            type: "pie",
            startAngle: 45,
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} ({y})",
            yValueFormatString: "#,##0.#" % "",
            dataPoints: [
              {
                label: "Intelligence",
                y: Number.parseInt(datosApi.powerstats.intelligence),
              },
              {
                label: "Strength",
                y: Number.parseInt(datosApi.powerstats.strength),
              },
              {
                label: "Speed",
                y: Number.parseInt(datosApi.powerstats.speed),
              },
              {
                label: "Durability",
                y: Number.parseInt(datosApi.powerstats.durability),
              },
              {
                label: "Power",
                y: Number.parseInt(datosApi.powerstats.power),
              },
              {
                label: "Combat",
                y: Number.parseInt(datosApi.powerstats.combat),
              },
            ],
          },
        ],
      };
      console.log(options);

      $("#chartContainer").CanvasJSChart(options);
    }, // sucess
  });
});

