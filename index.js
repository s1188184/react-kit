import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Kings Island Visitors'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Future home of the new Kings Island Tracker.</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
