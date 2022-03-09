import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonUsername = this.onChangePersonUsername.bind(this);
    this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
    this.onChangePersonPhone = this.onChangePersonPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      person_name: "",
      person_username: "",
      person_level: "",
      person_phone: null,
    };
  }
 
  // These methods will update the state properties.
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value,
    });
  }
 
  onChangePersonUsername(e) {
    this.setState({
      person_username: e.target.value,
    });
  }
 
  onChangePersonLevel(e) {
    this.setState({
      person_level: e.target.value,
    });
  }

  onChangePersonPhone(e){
    this.setState({
      person_phone: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_first_name: this.state.person_first_name,
      person_last_name: this.state.person_last_name,
      person_username: this.state.person_username,
      person_level: this.state.person_level,
      person_phone: this.state.person_phone,
    };
 
    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      person_first_name: "",
      person_last_name: "",
      person_username: "",
      person_level: "",
      person_phone: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the person: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_name}
              onChange={this.onChangePersonName}
            />
          </div>
          <div className="form-group">
            <label>Person's username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_username}
              onChange={this.onChangePersonUsername}
            />
          </div>
          <div className="form-group">
            <label>Person's phone number: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.person_phone}
              onChange={this.onChangePersonPhone}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Intern"
                checked={this.state.person_level === "Intern"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Intern</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Junior"
                checked={this.state.person_level === "Junior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Junior</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Senior"
                checked={this.state.person_level === "Senior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Senior</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}