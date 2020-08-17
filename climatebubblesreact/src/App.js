//Justin Carroll
//Climate Bubbles

import React, { useState, useEffect } from 'react';
import { Card } from '@blueprintjs/core';
import './App.css';

function App() {
  const BASE_URL =
    'https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=';

  const APIKEY = '&api_key=Ow65NJHAt85c1BuNJfxJkm8v3egFLusvPPgZ9DV2';

  const [climateData, setClimateData] = useState(false);
  const [type, setType] = useState('total'); //Choices are 'commercial', 'electric', 'residential', 'industrial', 'transportation', 'total'
  const [state, setState] = useState('CA'); //2 letter state codes

  async function Fetchtime() {
    let data = await (
      await fetch(BASE_URL + state + '&type=' + type + APIKEY).catch(handleErr)
    ).json();
    console.log(data);
    setClimateData(data);
  }

  function handleErr(err) {
    console.warn(err);
    let resp = new Response(
      JSON.stringify({
        code: 400,
        message: 'Network Error'
      })
    );
    return resp;
  }

  function handleChange(e) {
    console.log(e.target.name);
    if (e.target.name === 'TypeSelect') setType(e.target.value);

    if (e.target.name === 'StateSelect') setState(e.target.value);

    Fetchtime();
  }

  useEffect(() => {
    Fetchtime();
  });

  function MakeList() {
    let list = [];
    console.log(climateData);
    if (!climateData) return <p> API Error </p>;
    else
      for (const [key, value] of Object.entries(climateData.result[0].data)) {
        console.log(key, value);

        list.push(
          <Card>
            <h5>{key}</h5>
            <h4>{value}</h4>
          </Card>
        );
      }

    console.log(list);
    return <ul>{list}</ul>;
  }

  //Initiates fetch call on page load

  return (
    <div className="App">
      <p>Climate Bubbles</p>
      <select value={type} onChange={handleChange} name="TypeSelect">
        <option value="commercial">Commercial</option>
        <option value="electric">Electric</option>
        <option value="residential">Residential</option>
        <option value="industrial">Industrial</option>
        <option value="transportation">Transportation</option>
        <option value="total">Total</option>
      </select>

      <MakeList />
    </div>
  );
}

export default App;
