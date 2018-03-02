import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
 import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class TsetDashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vm: undefined,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // fetch('/scrape') // proxy not working
    fetch('http://localhost:8081/api/scrape')
      .then((response) => {
        response.json().then(data => this.setState({
          vm: data.response,
        }));
      });
  };

  renderTable() {
    if (this.state.vm) {
      const columns = [{
        dataField: 'Name',
        text: 'Name',
      }, {
        dataField: 'Score',
        text: 'CG',
      }, {
        dataField: 'Value',
        text: 'Price',
      }, {
        dataField: 'MktCap',
        text: 'MCap',
      }, {
        dataField: 'Diff',
        text: 'Diff',
      }, {
        dataField: 'NetGrowth',
        text: 'NPG',
      }, {
        dataField: 'PriceGrowth',
        text: 'ValueG',
      }];

      return (
        <BootstrapTable
          keyField="Name"
          data={this.state.vm}
          columns={columns}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <h2>Stock Exchange Thailand</h2>
        <div>
          {this.renderTable()}
        </div>
      </div>
    );
  }
}
