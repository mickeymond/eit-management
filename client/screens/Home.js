import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import EITs from '../../lib/collections/eits';

class Home extends React.Component {

  state = {
    checkedEITs: []
  }

  deleteEIT = (id) => {
    Meteor.call('eits.delete', id);
  }

  handleChecked = (e) => {
    let id = e.target.id;
    let newValue;
    if (e.target.checked) {
      newValue = [...this.state.checkedEITs, id];
    } else {
      newValue = [...this.state.checkedEITs.filter(x => x !== id)];
    }
    
    // Update the state
    this.setState((state, props) => ({ checkedEITs: newValue }));
  }

  handleBulkDelete = (e) => {
    Meteor.call('eits.bulk_delete', this.state.checkedEITs);

    // Update the state
    this.setState((state, props) => ({ checkedEITs: [] }));
  }

  renderEITs() {
    return this.props.eits.map(({ _id, firstname, surname, age, country, mentor }) => {
      return (
        <tr key={_id}>
            {this.props.currentUser && this.props.currentUser._id === mentor ?
            <td className="valign-wrapper">
              <input type="checkbox" className="filled-in checkbox-pink" id={_id} onChange={this.handleChecked} />
              <label htmlFor={_id}></label>
            </td> :
            <td></td>}
            <td>{firstname}</td>
            <td>{surname}</td>
            <td>{age}</td>
            <td>{country}</td>
            {this.props.currentUser && this.props.currentUser._id === mentor ?
            <td>
              <a href={`/eits/${_id}/edit`}><i className="material-icons edit-eit">edit</i></a>
              <i className="material-icons red-text" onClick={e => this.deleteEIT(_id)}>delete</i>
            </td> :
            <td></td>}
          </tr>
      );
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.checkedEITs.length > 0 ?
        <div className="row">
          <button className="btn red waves-effect" onClick={this.handleBulkDelete}>Delete Selected</button>
        </div> :
        ''}
        <div className="row">
          <table className="striped">
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.renderEITs()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    eits: EITs.find({}).fetch(),
    currentUser: Meteor.user(),
  }
})(Home);
