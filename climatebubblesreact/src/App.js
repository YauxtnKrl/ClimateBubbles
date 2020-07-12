  //Justin Carroll
import React, { useState} from 'react';
import './App.css';


function App() {

const BASE_URL = "https://developer.nrel.gov/api/cleap/v1/"
let type = "/state_co2_emissions?state_abbr=CA&type=commercial&"
const APIKEY = "api_key=Ow65NJHAt85c1BuNJfxJkm8v3egFLusvPPgZ9DV2"

const [climateData, setClimateData] = useState(false)

    
async function Fetchtime(){
  let data =  await(await fetch(BASE_URL + type + APIKEY).catch(handleErr)).json();
   console.log(data)
   setClimateData(data)
}

function handleErr(err) {
  console.warn(err);
  let resp = new Response(
    JSON.stringify({
      code: 400,
      message: "Network Error"
    })
  );
  return resp;
}


function MakeList () {
  let list=[]
  if(!climateData)
  return(<p>Load data</p>);

  else
  
  for (const [key, value] of Object.entries(climateData.result[0].data)) {
    
  console.log(key, value)
  
  list.push(<li>{key} : {value}</li>)
}
console.log(list)
  return (<ul>{list}</ul>)
}
  

  return (
    <div className="App">
     <p>Climate Bubbles</p>
    
     <button onClick={Fetchtime}>Load Data</button>

     
     <MakeList/>
     
    </div>
  );
}

export default App;
