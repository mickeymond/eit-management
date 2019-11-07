import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddEIT extends React.Component {

  handleSubmit = e => {
    // Prevent default form action
    e.preventDefault();

    // Collect form values
    const firstname = e.target.firstname.value;
    const surname = e.target.surname.value;
    const age = e.target.age.value;
    const country = e.target.country.value;

    // Call the insert method
    Meteor.call('eits.insert', firstname, surname, +age, country);

    // Navigate to home
    FlowRouter.go('/');
  }
  
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <h4>Add EIT</h4>
        </div>

        <div className="row">
          <div className="col s1"></div>
          <form className="col s10" autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input name="firstname" type="text" className="validate" required />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="input-field col s6">
                <input name="surname" type="text" className="validate" required />
                <label htmlFor="surname">Surname</label>
              </div>
              <div className="input-field col s6">
                <input name="age" type="number" className="validate" required />
                <label htmlFor="age">Age</label>
              </div>
              <div className="input-field col s6">
                <input name="country" type="text" className="validate" required />
                <label htmlFor="country">Country</label>
              </div>
            </div>
            <div className="row center-align">
              <button className="btn" type="submit">Add Eit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEIT;
