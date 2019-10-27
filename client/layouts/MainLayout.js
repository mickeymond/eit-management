import React from 'react';

class MainLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="nav-extended teal">
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">EIT Management</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/eits/add">Add EIT</a></li>
                <li><a href="#">Login Button</a></li>
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

export default MainLayout;