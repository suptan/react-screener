import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Button } from 'react-bootstrap';
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

const DeatilDialog = props => (
  <Modal show={props.showDetail} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {
        <BootstrapTable
          keyField="Name"
          data={props.data}
          columns={columns}
        />}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.handleClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

DeatilDialog.propTypes = {
  showDetail: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeatilDialog;
