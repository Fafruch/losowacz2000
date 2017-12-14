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
    if(!this.state.user || !this.state.user.name) {
      return;
    }
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
      <div className='content p-3'>
        <div className='container w-50 p-3 card form-group shadow'>
          <h1 className='text-center mb-3'>POGO_LOSOWACZ_2017</h1>

          <div>
            Kim jesteś?
            <select onChange={this.handleNameChange} className='form-control'>
              <option />
              <option>Filip</option>
              <option>Kuba</option>
              <option>Marta</option>
              <option>Olga</option>
              <option>Paulina</option>
            </select>
          </div>

          <br />

          <div>
            Podaj tajne hasło:
            <input onChange={this.handlePasswordChange} className='form-control'/>
          </div>

          {
            this.state.accessDenied &&
              <div>
                <br />
                Podałeś złe hasło, spróbuj ponownie. : (
              </div>
          }

          {
            this.state.accessGiven && !this.state.accessDenied &&
              <div className='text-center pt-3'>
                <h2>
                  {
                    (this.state.user.name[this.state.user.name.length - 1] === 'a' && this.state.user.name[0] !== 'K') ?
                      <span>Wylosowałaś:</span> :
                      <span>Wylosowałeś:</span>
                  }
                  {' '}{this.state.drawnPerson.name}. Gratulacje!
                </h2>
                <img src={this.state.drawnPerson.image} alt='Zdjecie wylosowanej osoby' className='mt-3 image card card-block' />
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
