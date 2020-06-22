// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "material-ui-pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";

// Custom Actions


// START IMPORT ACTIONS
import DailyReportActions from "../redux/actions/DailyReportActions";

// END IMPORT ACTIONS

/** APIs

* actionsDailyReport.create
*	@description CRUD ACTION create
*
* actionsDailyReport.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsDailyReport.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*

**/

class DailyReportEdit extends Component {
  // Init dailyreport
  constructor(props) {
    super(props);
    this.state = {
      dailyreport: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsDailyReport.loadDailyReport(this.props.match.params.id);
    }
    
    this.props.actionsUser.loadUserList();
  }

  // Insert props dailyreport in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      dailyreport: props.dailyreport
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.dailyreport._id) {
      this.props.actionsDailyReport.saveDailyReport(this.state.dailyreport).then(data => {
        this.props.history.push("/dailyreports/");
      });
    } else {
      this.props.actionsDailyReport.createDailyReport(this.state.dailyreport).then(data => {
        this.props.history.push("/dailyreports/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>DailyReport Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          <FormControl fullWidth>
            <InputLabel shrink htmlFor="Breakfast">
              Breakfast
            </InputLabel>
            <Select
              value={this.state.dailyreport.Breakfast || ""}
              onChange={Utils.handleChangeSelect.bind(this, "dailyreport")}
              inputProps={{
                id: "Breakfast",
                name: "Breakfast"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Half"}>Half</MenuItem>
              <MenuItem value={"None"}>None</MenuItem>
            </Select>
          </FormControl>
          <DateTimePicker
            id="CreatedDate"
            label="CreatedDate"
            className="mt-20 mb-20"
            ampm={false}
            value={
              this.state.dailyreport.CreatedDate
                ? new Date(this.state.dailyreport.CreatedDate)
                : null
            }
            onChange={Utils.handleChangeDate.bind(this, "dailyreport", "CreatedDate")}
            fullWidth
            autoOk
            disableFuture
            required
            {...(!this.state.dailyreport.CreatedDate && this.state.dailyreport.CreatedDate === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="Notes"
            label="Notes"
            value={this.state.dailyreport.Notes || ""}
            onChange={Utils.handleChange.bind(this, "dailyreport")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.dailyreport.Notes && this.state.dailyreport.Notes === ""
              ? { error: true }
              : {})}
          />
          
          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>
          
          {/* Relation m:m CreatedBy with User */}
          
          <FormControl fullWidth className="mb-20">
            <InputLabel htmlFor="CreatedBy">CreatedBy</InputLabel>
            <Select
              multiple
              value={this.state.dailyreport.CreatedBy || []}
              onChange={Utils.handleChangeSelect.bind(this, "dailyreport")}
              input={<Input id="CreatedBy" name="CreatedBy" />}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {this.props.listUser && this.props.listUser.map(item => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  style={{
                    fontWeight:
                      this.state.dailyreport.CreatedBy &&
                      this.state.dailyreport.CreatedBy.indexOf(item._id) === -1
                        ? "regular"
                        : "bold"
                  }}
                >
                  {item._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/dailyreports/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
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
DailyReportEdit.propTypes = { 
  actionsDailyReport: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    dailyreport: state.DailyReportEditReducer.dailyreport,
    listUser: state.DailyReportEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReportEdit);
