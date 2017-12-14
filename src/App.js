import React, { Component } from 'react';
import './App.css';
import data from './data';

class App extends Component {
  state = {
    selectsName: true,
    givesPassword: false,
    accessGiven: false,
    accessDenied: false,

    user: null,
    drawnPerson: null,
    data: data
  };

  handleNameChange = (event) => {
    const input = event.target.value;
    const user = this.state.data.find(person => person.name === input);

    this.setState({
      user,
      selectsName: false,
      givesPassword: true
    });
  };

  handlePasswordChange = (event) => {
    const input = event.target.value;

    if(this.state.user.key !== input) {
      this.setState({ accessDenied: true });
    } else {
      this.setState({
        accessGiven: true,
        accessDenied: false,
        drawnPerson: this.drawPerson()
      });
    }
  };

  drawPerson = () => {
    let sum = 0;

    sum = this.state.data.reduce((dataAcc, person) => {
      return dataAcc + person.key.split('').reduce((acc, letter, currentIndex) => {
        return acc + person.key.charCodeAt(currentIndex)
      }, 0);
    }, sum);

    this.sortPeople();

    if(this.state.data.length % sum) {
      sum += 1;
    }

    return this.state.data[(this.state.data.indexOf(this.state.user) + sum) % this.state.data.length];
  };

  sortPeople = () => this.state.data.sort((person, nextPerson) => {
    const personVal = person.key.split('').reduce((acc, letter, currentIndex) => {
      return acc + person.key.charCodeAt(currentIndex)
    }, 0);

    const nextPersonVal = nextPerson.key.split('').reduce((acc, letter, currentIndex) => {
      return acc + person.key.charCodeAt(currentIndex)
    }, 0);

    return personVal - nextPersonVal;
  });

  render() {
    return (
      <div>

        <div>
          Kim jestes?
          <select onChange={this.handleNameChange}>
            <option />
            <option>Filip</option>
            <option>Kuba</option>
            <option>Marta</option>
            <option>Olga</option>
            <option>Paulina</option>
          </select>
        </div>

        <div>
          Podaj tajne haslo:
          <input onChange={this.handlePasswordChange}/>
        </div>

        {
          this.state.accessDenied &&
            <div>
              Podales zle haslo, sprobuj ponownie. : (
            </div>
        }

        {
          this.state.accessGiven &&
            <div>
              Wylosowales: {this.state.drawnPerson.name}. Gratulacje!
              <img src={this.state.drawnPerson.image} alt='Zdjecie wylosowanej osoby' />
            </div>
        }

      </div>
    );
  }
}

export default App;
