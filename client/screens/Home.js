import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        {/* if someChecked */}
        <div className="row">
          <button className="btn red waves-effect">Delete Selected</button>
        </div>
        {/* end if someChecked */}
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
              {/* render rows of EITs */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
