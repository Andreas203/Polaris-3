import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './FetchData.css';
import { Line } from 'react-chartjs-2';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { forecasts: [], loading: true };
      this.chartReference = React.createRef();
    }

  componentDidMount() {
    this.populateCompanyData();
    console.log(this.chartReference);
  }

  static renderForecastsTable(forecasts) {
    return (
      
      <div className='container card_grid'>
        {forecasts.map(forecast =>
        <Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal" ref={(r) => this.flippy = r} style={{ width: '300px', height: '250px'}} >
          
              <FrontSide style={{backgroundColor: '#437CAD',}}>
                <div>
                  <p>{forecast.name}</p>
                  <p>{forecast.symbol}</p>
                </div>
              </FrontSide>

              <BackSide style={{ backgroundColor: '#A4CFE9'}}>
                <div>
                <Line data={forecast.past} width={250} height={200} options={{ maintainAspectRatio: false }}/>
                </div>    
              </BackSide>
        </Flippy>
        )}
      </div>

    )}

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Stock forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateCompanyData() {
    const response = await fetch('companies');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
