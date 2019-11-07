import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import EITs from '../../lib/collections/eits';

class EditEIT extends React.Component {

  handleSubmit = e => {
    // Get eit id
    const id = FlowRouter.getParam("id");

    // Prevent default form action
    e.preventDefault();

    // Collect form values
    const firstname = e.target.firstname.value;
    const surname = e.target.surname.value;
    const age = e.target.age.value;
    const country = e.target.country.value;

    // Call the uodate method
    Meteor.call('eits.update', id, firstname, surname, +age, country);

    // Navigate to home
    FlowRouter.go('/');
  }

  render() {
    const eit = this.props.eit;
    return (
      <div className="container">
        <div className="row center-align">
          <h4>Edit EIT</h4>
        </div>

        <div className="row">
          <div className="col s1"></div>
          <form className="col s10" autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input name="firstname" type="text" className="validate" required defaultValue={eit ? eit.firstname : ''} />
                <label className="active" htmlFor="firstname">First Name</label>
              </div>
              <div className="input-field col s6">
                <input name="surname" type="text" className="validate" required defaultValue={eit ? eit.surname : ''} />
                <label className="active" htmlFor="surname">Surname</label>
              </div>
              <div className="input-field col s6">
                <input name="age" type="number" className="validate" required defaultValue={eit ? eit.age : ''} />
                <label className="active" htmlFor="age">Age</label>
              </div>
              <div className="input-field col s6">
                <input name="country" type="text" className="validate" required defaultValue={eit ? eit.country : ''} />
                <label className="active" htmlFor="country">Country</label>
              </div>
            </div>
            <div className="row center-align">
              <button className="btn" type="submit">Edit Eit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const id = FlowRouter.getParam("id");

  return {
    eit: EITs.findOne(id)
  };
})(EditEIT);
