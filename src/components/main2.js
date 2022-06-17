import React, { useState, useEffect } from 'react';

function Main2() {
  const [planetData, setPlanetData] = useState('planet data vazio');
  const [unfilteredData, setUnfilteredData] = useState('');

  let tableHeader;
  let tableContents;
  let planetName;

  const fetchAPI = async () => {
    // console.log('Chamou fetchAPI');
    const apiResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const apiData = await apiResponse.json();
    setUnfilteredData(apiData.results);
    setPlanetData(apiData.results);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // useEffect(() => {
  //   ;
  // }, [planetData]);

  // console.log(planetData);
  // console.log(typeof planetData);

  const renderTable = (data) => {
    // console.log('renderizou');
    // console.log(Object.keys(apiData.results[0]));
    // console.log(`PlanetName = ${planetName}`);
    const tableHeaderArray = Object.keys(data[0]);
    const tableHeaderFiltered = tableHeaderArray.filter((cell) => cell !== 'residents');
    tableHeader = tableHeaderFiltered.map((cell) => <th key={ cell }>{cell}</th>);

    const tableContentsArray = data; // filteredData;
    tableContents = tableContentsArray.map((line) => {
      const tableLineArray = Object.values(line);
      const residentsPosition = 9;
      tableLineArray.splice(residentsPosition, 1);
      const tableLine = tableLineArray.map((cell) => (
        <td key={ `${line}:${cell}` }>{cell}</td>
      ));
      return <tr key={ line.name }>{tableLine}</tr>;
    });
  };

  const isTatooine = (planet) => {
    if (planet.name.includes(planetName)) {
      return planet;
    }
  };

  const handleChange = (event) => {
    planetName = event.target.value;
    console.log(planetName);
    const filteredData = unfilteredData.filter(isTatooine);
    console.log(filteredData);
    console.log(unfilteredData);
    if (filteredData.length > 0) {
      setPlanetData(filteredData);
    } else setPlanetData(unfilteredData);
  };

  if (typeof planetData !== 'string') {
    renderTable(planetData);
  }

  return (
    <div>
      <input type="text" onChange={ handleChange } data-testid="name-filter" />
      <table>
        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {tableContents}
        </tbody>
      </table>
    </div>
  );
}

export default Main2;
