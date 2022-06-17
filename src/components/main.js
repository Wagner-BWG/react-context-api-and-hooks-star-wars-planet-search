import React, { Component } from 'react';

class Main extends Component {
  constructor() {
    super();
    this.state = { apiData: {} };
  }

  async componentDidMount() {
    const apiResponse = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const apiData = await apiResponse.json();
    this.setState({ apiData });
  }

  render() {
    const { apiData } = this.state;
    let tableHeader;
    let tableContents;
    let planetName;

    const handleChange = (event) => {
      console.log(event.target.value);
      planetName = event.target.value;
    };

    if (apiData.results !== undefined) {
      // console.log(apiData.results);
      // console.log(Object.keys(apiData.results[0]));
      console.log(`PlanetName = ${planetName}`);
      const tableHeaderArray = Object.keys(apiData.results[0]);
      const tableHeaderFiltered = tableHeaderArray.filter((cell) => cell !== 'residents');
      tableHeader = tableHeaderFiltered.map((cell) => <th key={ cell }>{cell}</th>);

      const isTatooine = (planet) => {
        if (planet.name.includes(planetName)) {
          return planet;
        }
      };

      const filteredData = apiData.results.filter(isTatooine);
      // const tableContentsArray = apiData.results;
      console.log(filteredData);
      const tableContentsArray = filteredData;
      tableContents = tableContentsArray.map((line) => {
        const tableLineArray = Object.values(line);
        const residentsPosition = 9;
        tableLineArray.splice(residentsPosition, 1);
        const tableLine = tableLineArray.map((cell) => (
          <td key={ `${line}:${cell}` }>{cell}</td>
        ));
        return <tr key={ line.name }>{tableLine}</tr>;
      });
    }

    return (
      <div>
        <input type="text" onChange={ handleChange } />
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
}

export default Main;
