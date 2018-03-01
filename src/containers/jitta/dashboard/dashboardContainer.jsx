import React from 'react';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchStockInfoById = this.fetchStockInfoById.bind(this);
  }

  fetchStockInfoById() {
    
  }

  render() {
    return (
      <div>
        <h2>Jitta</h2>
      </div>
    )
  }
}
