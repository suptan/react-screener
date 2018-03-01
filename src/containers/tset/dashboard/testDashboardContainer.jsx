import React from 'react';

export default class TsetDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchStockInfoById = this.fetchStockInfoById.bind(this);
    this.state = {
      vm: undefined,
    };
  }

  render() {
    return (
      <div>
        <h2>Stock Exchange Thailand</h2>
      </div>
    );
  }
}
