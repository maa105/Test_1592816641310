// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// Table
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions


// START IMPORT ACTIONS
import DailyReportActions from "../redux/actions/DailyReportActions";

// END IMPORT ACTIONS

/** APIs

* actionsDailyReport.delete
*	@description CRUD ACTION delete
*	@param ObjectId id - Id
*
* actionsDailyReport.list
*	@description CRUD ACTION list
*
* actionsDailyReport.list
*	@description CRUD ACTION list
*

**/


class DailyReportList extends Component {
  // Init component
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false
    };
  }

  // Load data on start
  componentWillMount() {
    this.props.actionsDailyReport.loadDailyReportList();
  }

  // Delete data
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsDailyReport.deleteDailyReport(this.state.idDelete).then(data => {
      this.props.actionsDailyReport.loadDailyReportList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  // Show content
  render() {
    const columns = [ 
      {
        id: "Breakfast",
        type: "number",
        label: "Breakfast"
      }, 
      {
        id: "CreatedDate",
        type: "date",
        label: "CreatedDate"
      }, 
      {
        id: "Notes",
        type: "string",
        label: "Notes"
      },
    ];
    const link = "/dailyreports/";

    return (
      <div>
        <h1>DailyReport List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        {/*
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Breakfast</TableCell>
              <TableCell align="right">CreatedDate</TableCell>
              <TableCell align="right">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.list.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={"/dailyreports/" + row._id} key={row._id}>
                    {row._id}
                  </Link>
                </TableCell>
                <TableCell align="right">{ row.Breakfast }</TableCell>
                <TableCell align="right">{ row.CreatedDate }</TableCell>
                <TableCell align="right">{ row.Notes }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        */}

        <div className="footer-card">
          <Link to="/dailyreports/new">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsDailyReport: bindActionCreators(DailyReportActions, dispatch),
  };
};

// Validate types
DailyReportList.propTypes = { 
  actionsDailyReport: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.DailyReportListReducer.listDailyReport
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReportList);
