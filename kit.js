import React, { Component } from 'react';

import firebase, { auth, provider } from './firebase';

import firebase from './firebase';

import './style.css';

export default class KIT extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Kings Island Visitors',
      personRides: {},
      currentDrinks: 3,
      // availableDiners: ['Jenny', 'Ally', 'Ryan', 'Logan', 'Nolan'],
      // currentDiners: ['Jenny', 'Ally', 'Ryan', 'Logan', 'Nolan']
      diners: {
        Jenny: true,
        Allison: true,
        Ryan: true,
        Logan: true,
        Nolan: true
      }
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDrinkChange = this.handleDrinkChange.bind(this);
    this.handleAddDrinks = this.handleAddDrinks.bind(this);
    this.handleDinerChange = this.handleDinerChange.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref('temp');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      debugger;
      this.setState({
        personRides: items
      });
    });

    const drinksRef = firebase.database().ref('temp/drinks');
    drinksRef.on('value', (snapshot) => {
      let drinks = snapshot.val();
      debugger;
      this.setState({
        drinks
      });
    });

    const mealsRef = firebase.database().ref('temp/meals');
    mealsRef.on('value', (snapshot) => {
      let meals = snapshot.val();
      this.setState({
        meals
      });
    });

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

    let nextID = 0;
    if (this.state.personRides) {
      nextID = Object.values(this.state.personRides).length;
    }

    const itemsRef = firebase.database().ref('temp');
    itemsRef.push({
      rider: this.state.user.displayName,
      ride: 'Ride ' + nextID
    });
  }

  handleDrinkChange(e) {
    this.setState({ currentDrinks: e.target.value });
  }

  handleAddDrinks() {
    const drinksRef = firebase.database().ref('temp/drinks');
    drinksRef.push({
      submitter: this.state.user.displayName,
      drinks: this.state.currentDrinks,
      time: new Date()
    });
  }

  handleDinerChange(e, diner) {

    const checked = e.target.checked;
    //console.log(diner + ' is ' + checked);

    this.setState(s => {
      let newDiners = s.diners;
      newDiners[diner] = checked;
      return { diners: newDiners };
    })
  }

  handleAddMeal() {

    const arrayOfDiners = Object.keys(this.state.diners).filter(diner => {
      return this.state.diners[diner];
    });


    const mealsRef = firebase.database().ref('temp/meals');

    for (let diner of arrayOfDiners) {
      mealsRef.push({
        submitter: this.state.user.displayName,
        diner,
        time: new Date()
      });
    }
  }

  render() {

    let personRides = [];
    if (this.state.personRides) {
      const personRidesArray = Object.values(this.state.personRides);
      personRides = personRidesArray.map(pr => <div key={pr.rider + '_' + pr.ride}>{pr.rider} / {pr.ride}</div>);
    }

    let drinks = [];
    if (this.state.drinks) {
      const drinkArray = Object.values(this.state.drinks);
      drinks = drinkArray.map((d, index) => <div key={index}>{d.submitter} - {d.drinks}</div>);
    }

    let meals = [];
    if (this.state.meals) {
      const mealArray = Object.values(this.state.meals);
      meals = mealArray.map((m, index) => <div key={index}>{m.time} {m.submitter} - {m.diner}</div>);
    }


    return (
      <div>
        <h1>KIT</h1>
        {
          this.state.user ?
            <div>


              <img src={this.state.user.photoURL} height={50} width={50} onClick={this.logout} />


              {/*}
              <button onClick={this.handleAdd} > Add a personRide</button >
              {personRides}
              */}

              <div>
                <h1>Add Drinks</h1>
                <input type="number" value={this.state.currentDrinks} onChange={this.handleDrinkChange} />
                <button onClick={this.handleAddDrinks}>Add Drinks</button>
                <p>{drinks}</p>
              </div>



              <div>
                <h1>Add Meals</h1>
                {Object.keys(this.state.diners).map((diner) => {
                  const value = this.state.diners[diner];
                  return (
                    <div key={diner}>
                      <input type="checkbox" checked={value} onChange={(e) => this.handleDinerChange(e, diner)} /> {diner}
                    </div>
                  );
                })}
                <button onClick={this.handleAddMeal}>Add Meal</button>
                <p>
                {meals}
                </p>
              </div>




            </div>
            :
            <button onClick={this.login}>Login</button>
        }

      </div >
    );
  }
}

