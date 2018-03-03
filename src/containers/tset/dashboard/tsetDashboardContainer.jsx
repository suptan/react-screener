import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class TsetDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFilter = this.onChangeFilter.bind(this);

    this.state = {
      vm: undefined,
      filter: [
        { value: 'discount', label: 'Cheap' },
        { value: 'notGrowth', label: 'Growth' },
      ],
      doT: undefined,
    };
  }

  componentDidMount() {
    this.getData();
  }

  onChangeFilter = (option) => {
    const ele = option.target;
    let tData = this.state.doT;

    if (ele.checked) {
      switch (ele.value) {
        case 'discount':
          tData = tData.filter(el => el.Diff > 0);
          break;
        case 'notGrowth':
          tData = tData.filter(el => el.NetGrowth > 0);
          break;
        default:
          break;
      }
    } else {
      let tmp = this.state.vm;
      switch (ele.value) {
        case 'discount':
          tmp = tmp.filter(el => el.Diff <= 0);
          break;
        case 'notGrowth':
          tmp = tmp.filter(el => el.NetGrowth <= 0);
          break;
        default:
          break;
      }

      tData = tData.concat(tmp);
    }
    this.setState({ doT: tData });
  }

  getData = () => {
    // fetch('/scrape') // proxy not working
    fetch('http://localhost:8081/api/scrape')
      .then((response) => {
        response.json().then(data => this.setState({
          vm: data.response,
          doT: data.response,
        }));
      });
  };

  renderFilter() {
    return (
      <div>
        {this.state.filter.map(item =>
          (<label key={item.value} htmlFor={item.value}>
            <input type="checkbox" onChange={this.onChangeFilter} value={item.value} />
            {item.label}
          </label>),
        )}
      </div>
    );
  }

  renderTable() {
    if (this.state.doT) {
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
          data={this.state.doT}
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
        {this.renderFilter()}
        <div>
          {this.renderTable()}
        </div>
      </div>
    );
  }
}
