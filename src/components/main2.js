import React, { useState, useEffect } from 'react';

function Main2() {
  const [planetData, setPlanetData] = useState('planet data vazio');
  const [unfilteredData, setUnfilteredData] = useState('');
  const [enabledFilters, setEnabledFilters] = useState({
    population: true,
    orbital_period: true,
    diameter: true,
    rotation_period: true,
    surface_water: true,
  });

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

  const renderTable = (data) => {
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

  const filterByName = (planet) => {
    if (planet.name.toLowerCase().includes(planetName.toLowerCase())) {
      return planet;
    }
  };

  const handleChange = (event) => {
    planetName = event.target.value;
    // console.log(planetName);
    const filteredNames = unfilteredData.filter(filterByName);
    // console.log(filteredNames);
    // console.log(unfilteredData);
    if (filteredNames.length > 0) {
      setPlanetData(filteredNames);
    } else setPlanetData(unfilteredData);
  };

  if (typeof planetData !== 'string') {
    renderTable(planetData);
  }

  const filterByParameter = (planet) => {
    const columnFilter = document.getElementById('column-filter').value;
    const valueFilter = parseInt(document.getElementById('value-filter').value, 10);
    const comparisonFilter = document.getElementById('comparison-filter').value;

    if (planet[columnFilter] !== 'unknown') {
      const planetColumnData = parseInt(planet[columnFilter], 10);
      if (comparisonFilter === 'igual a' && planetColumnData === valueFilter) {
        return planet;
      }
      if (comparisonFilter === 'maior que' && planetColumnData > valueFilter) {
        return planet;
      }
      if (comparisonFilter === 'menor que' && planetColumnData < valueFilter) {
        return planet;
      }
    }
  };

  const renderFiltered = () => {
    // console.log(planetData);
    const filteredParameter = planetData.filter(filterByParameter);
    if (filteredParameter.length > 0) {
      const columnFilter = document.getElementById('column-filter').value;
      setEnabledFilters({ ...enabledFilters, [columnFilter]: false });
      setPlanetData(filteredParameter);
    }
  };

  const columnFilter = (
    <select id="column-filter" data-testid="column-filter">
      {enabledFilters.population ? <option id="population">population</option> : null}
      {enabledFilters.orbital_period ? <option id="orbital_period">orbital_period</option>
        : null}
      {enabledFilters.diameter ? <option id="diameter">diameter</option> : null}
      {enabledFilters.rotation_period
        ? <option id="rotation_period">rotation_period</option> : null}
      {enabledFilters.surface_water ? <option id="surface_water">surface_water</option>
        : null}
    </select>
  );

  return (
    <div>
      <input type="text" onChange={ handleChange } data-testid="name-filter" />
      <label htmlFor="filter_button">
        {columnFilter}
        <select id="comparison-filter" data-testid="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          defaultValue="0"
        />
      </label>
      <button
        id="filter_button"
        type="button"
        data-testid="button-filter"
        onClick={ renderFiltered }
      >
        Filtrar
      </button>
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
