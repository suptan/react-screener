import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal, Button } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [{
  dataField: 'Liabilities',
  text: 'Debt',
}, {
  dataField: 'PaidUpCapital',
  text: 'PaidUp Capital',
}, {
  dataField: 'Revenue',
  text: 'Revenue',
}, {
  dataField: 'NetProfit',
  text: 'NetP',
}, {
  dataField: 'ROA',
  text: 'ROA',
}, {
  dataField: 'ROE',
  text: 'ROE',
}, {
  dataField: 'NetProfitMargin',
  text: 'Margin',
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
          data={props.datas}
          columns={columns}
        />}
      <p>Comment</p>
      <ul>
        {Object.keys(props.comments).map((keyy) => {
          return (<li key={keyy}>
            <strong>{keyy}</strong> - {props.comments[keyy]}
          </li>);
        },
        )}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.handleClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

DeatilDialog.propTypes = {
  showDetail: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  datas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  comments: PropTypes.shape({}).isRequired,
};

export default DeatilDialog;
