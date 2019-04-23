import React, { Component } from 'react';

import firebase, { auth, provider } from './firebase';

import './style.css';

export default class KIT extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Kings Island Visitors',
      personRides: []
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      debugger;
      this.setState({
        personRides: items
      });
    })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  handleAdd() {
    console.log('add that personRide');
    const itemsRef = firebase.database().ref('items');
    itemsRef.push({
      rider: 'Tim',
      ride: 'The Bat'
    });
  }

  render() {

    const personRides = this.state.personRides.map(pr => <div key={pr.rider + '_' + pr.ride}>{pr.rider} / {pr.ride}</div>);

    return (
      <div>
        <h1>KIT</h1>
        {
          this.state.user ?
            <div>
              {this.state.user.displayName}
              <img src={this.state.user.photoURL} />
              <button onClick={this.logout}>Logout</button>
            </div>
            :
            <button onClick={this.login}>Login</button>
        }

        < p > Future home of the new Kings Island Tracker.</p >
        {personRides}

        < button onClick={this.handleAdd} > Add a personRide</button >
      </div >
    );
  }
}

