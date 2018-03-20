import React from 'react';
import DataTableContainer from '../../../components/dataTableContainer';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.fetchStockInfo = this.fetchStockInfo.bind(this);

    this.state = {
      filter: [
        { value: 'cheap', label: 'Discount' },
        { value: 'growth', label: 'Growth' },
      ],
      vm: undefined,
      displayData: undefined,
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
          displayData: data,
        }));
      });
  }

  onChangeFilter = (option) => {
    const ele = option.target;
    let data = this.state.displayData;

    if (ele.checked) {
      switch (ele.value) {
        case 'cheap':
          data = data.filter(el => el.Diff > 1);
          break;
        case 'growth':
          data = data.filter(el => el.NetGrowth > 0.06);
          break;
        default :
          break;
      }
    } else {
      let tmp = this.state.vm;

      switch (ele.value) {
        case 'cheap':
          tmp = tmp.filter(el => el.Diff <= 1);
          break;
        case 'growth':
          tmp = tmp.filter(el => el.NetGrowth <= 0);
          break;
        default :
          break;
      }

      data = data.concat(tmp);      
    }

    this.setState({ displayData: data });
  }

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
    if (!this.state.displayData) return null;

    return (
      <DataTableContainer data={ this.state.displayData } />
    );
  }

  render() {
    return (
      <div>
        <h2>Jitta</h2>
        <h3>{this.state.displayData.length}</h3>
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    );
  }
}
