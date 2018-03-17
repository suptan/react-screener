import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import DeatilDialog from './deatilDialog';
import DataTable from '../../../components/dataTable';

export default class TsetDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      vm: undefined,
      filter: [
        { value: 'discount', label: 'Cheap' },
        { value: 'notGrowth', label: 'Growth' },
      ],
      doT: undefined,
      showDetail: false,
      selectedRow: undefined,
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

  handleClose() {
    this.setState({ showDetail: false });
  }

  handleShow(row) {
    const anasis = JSON.parse(JSON.stringify(this.state.vm.find(el => el.Name === row.Name)));
    // B table require array
    anasis.Content = [anasis.Content];

    this.setState({
      selectedRow: anasis,
      showDetail: true,
    });
    console.log(this.state.selectedRow)
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
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];
    
    const products = []

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.handleShow
    };
    
    return (<BootstrapTable
      keyField='name'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />)
  }

  renderTable2() {
    if(!this.state.doT) return null
    
    return (<DataTable data={ this.state.doT } />)
  }

  renderDialog() {
    if (!this.state.selectedRow) return null

    return (
      <DeatilDialog
        showDetail={this.state.showDetail}
        datas={this.state.selectedRow.Content}
        handleClose={this.handleClose}
        comments={this.state.selectedRow.Comment}
      />
    )
  }

  render() {
    return (
      <div>
        <h2>Stock Exchange Thailand</h2>
        {this.renderDialog()}
        {this.renderFilter()}
        {this.renderTable2()}
      </div>
    );
  }
}
