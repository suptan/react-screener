import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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

const selectRow = {
  mode: 'radio',
  clickToSelect: true,
  onSelect: (row) => { this.handleShow(row) },
};

const DataTable = props => (
  <BootstrapTable
    keyField='Name'
    data={ props.data }
    columns={ columns }
    selectRow={ selectRow }
  />
);

DataTable.propTypes = { 
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default DataTable;
