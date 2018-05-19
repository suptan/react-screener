import React, { Component } from 'react';
import DataTable from './dataTable';
import DeatilDialog from './deatilDialog';

export default class DataTableContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showDetail: false,
      selectedRow: undefined,
    };
  }
  
  handleClose() {
    this.setState({ showDetail: false });
  }

  handleShow(row) {
    const anasis = JSON.parse(JSON.stringify(this.props.data.find(el => el.Name === row.Name)));
    // B table require array
    anasis.Content = [anasis.Content];

    this.setState({
      selectedRow: anasis,
      showDetail: true,
    });
  }

  renderDialog() {
    if (!this.state.selectedRow) return null

    return (
      <DeatilDialog
        header={this.state.selectedRow.Name}
        showDetail={this.state.showDetail}
        datas={this.state.selectedRow.Content}
        handleClose={this.handleClose}
        comments={this.state.selectedRow.Comment}
      />
    )
  }

  renderTable() {
    if (!this.props.data) return null;

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: (row) => { this.handleShow(row) },
    };

    return (
      <DataTable
        data={ this.props.data }
        selectRow= { selectRow }
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderDialog()}
        {this.renderTable()}
      </div>
    );
  }
}
