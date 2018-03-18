import React from 'react';
import DataTableContainer from '../../../components/dataTableContainer';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchStockInfo = this.fetchStockInfo.bind(this);

    this.state = {
      vm: undefined,
      filtered: undefined,
    };
  }

  componentDidMount() {
    this.fetchStockInfo();
  }

  fetchStockInfo = () => {
    fetch('http://localhost:8081/api/jitscrape')
      .then((response) => {
        response.json().then(data => this.setState({
          vm: data,
          filtered: data,
        }));
      });
  }

  renderTable() {
    if (!this.state.filtered) return null;

    return (
      <DataTableContainer data={ this.state.filtered } />
    );
  }

  render() {
    return (
      <div>
        <h2>Jitta</h2>
        {this.renderTable()}
      </div>
    )
  }
}
