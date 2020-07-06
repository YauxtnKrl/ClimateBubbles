  //Justin Carroll
import React, {useState} from 'react';
import './App.css';


function App() {

const BASE_URL = "https://developer.nrel.gov/api/cleap/v1/"
let type = "/state_co2_emissions?state_abbr=CA&type=commercial&"
const APIKEY = "api_key=Ow65NJHAt85c1BuNJfxJkm8v3egFLusvPPgZ9DV2"

let [apiResponse, setApiResponse] = useState(false)

      let climateData= ""

    async function Fetchtime(  ){

       //climateData = await(await fetch(BASE_URL + type + APIKEY).catch(handleErr)).json();
      
       fetch(BASE_URL + type + APIKEY).then(
         (response)=>{
          return response.json
         }).then((data)=>{
           console.log(data)  


         }).catch((err)=>{  

            console.log("ERROR " + err)
         })

       if(climateData){setApiResponse(true)}

      dataList()

      console.log(climateData)
      return 
    }

    // function handleErr(err) {
    //   setApiResponse(false)
    //   console.warn(err);
    //   let resp = new Response(
    //     JSON.stringify({
    //       code: 400,
    //       message: "Network Error"
    //     })
    //   );
    //   return resp;
    // }

    async function dataList(){
      await (climateData)
      let sourceList = Object.entries(climateData.result[0].data)
    
      if(apiResponse){
       sourceList.map((entry)=>{
         console.log(entry)
         return(
           <li>{entry[0]} : {entry[1]}</li>
         )
       })
      }
      if(!apiResponse){
        console.log("no data")
        return(
          <p>No data</p>
        )
      }
    }

  return (
    <div className="App" onLoad={Fetchtime}>
     <p>Hello</p>
     {dataList()}
     <button onClick={Fetchtime}>Load Data</button>
    </div>
  );
}

export default App;
