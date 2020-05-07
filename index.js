//Justin Carroll



const BASE_URL = "https://developer.nrel.gov/api/cleap/v1/"
const TYPE = "/state_co2_emissions?state_abbr=CA&type=commercial&api_key="
const APIKEY = "Ow65NJHAt85c1BuNJfxJkm8v3egFLusvPPgZ9DV2"

fetch(BASE_URL + TYPE + APIKEY)
    .then(function (response) {
        if (response.status == 200) {
            return response.json();
        } else {
            throw new Error('Invalid user ID');
        }
    })
    .then((data) => {
        console.log(data);
        let jsonData = JSON.stringify(data);
        console.log(data);

        let output = document.getElementById('output');
        output.textContent = jsonData;
    })
    .catch((err) => {
        console.log('ERROR: ', err.message);
    });