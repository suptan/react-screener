import React from 'react';

export default class TsetDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchStockInfoById = this.fetchStockInfoById.bind(this);
    this.state = {
      vm: undefined,
    };
  }

  componentDidMount() {
    this.getData()
      .then((res) => {
        console.log(res);
        return res.json();
      });
  }

  getData = () => {
    // fetch('/scrape') // proxy not working
    fetch('http://localhost:8081/api/scrape')
      .then(response => response.json());
  };

  render() {
    return (
      <div>
        <h2>Stock Exchange Thailand</h2>
      </div>
    );
  }
}
