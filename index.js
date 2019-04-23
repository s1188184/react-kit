import React, { Component } from 'react';
import { render } from 'react-dom';
import KIT from './kit';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <KIT />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
