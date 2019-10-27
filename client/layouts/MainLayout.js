import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../components/AccountsUIWrapper';

class MainLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="nav-extended teal">
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">EIT Management</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.props.currentUser ? <li><a href="/eits/add">Add EIT</a></li> : ''}
                <li><a href="#"><AccountsUIWrapper /></a></li>
              </ul>
            </div>
          </div>
        </nav>

        <br />

        {this.props.content}
      </React.Fragment>
    );
  }
}

export default withTracker(props => {
  return {
    currentUser: Meteor.user()
  }
})(MainLayout);