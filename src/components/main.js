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
    if (apiData.results !== undefined) {
      const tableHeaderArray = Object.keys(apiData.results[0]);
      const tableHeaderFiltered = tableHeaderArray.filter((cell) => cell !== 'residents');
      tableHeader = tableHeaderFiltered.map((cell) => <th key={ cell }>{cell}</th>);

      const tableContentsArray = apiData.results;
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
    );
  }
}

export default Main;
