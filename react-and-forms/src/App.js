import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
     array: [],
     equation: '',
     solution: ''
    }
    this.state = this.initialState
  }

  handleInputChange = (event) => {
    let arr = event.target.value 
    const newArr = arr.split(',').map(el => {return el})
    this.setState({
      array: newArr
    })
  }

  handleSelectChange = (event) => {
    this.setState({
      equation: event.target.value
    })
  }

  arrayValid = () => {
  const {array} = this.state 
  const newArr = array.map(el => {return parseInt(el)})
  let result = newArr.every(el => {return Number.isInteger(el)})
  return result 
  }

  calculate = () => {
    const {array, equation} = this.state
    const newArr = array.map(el => {return parseInt(el)})
    console.log(newArr, equation)
    if (equation === 'sum') {
    this.sum(newArr)
    } else if (equation === 'average') {
    this.average(newArr)
    } else if (equation === 'mode') {
    this.mode(newArr)
    }
  }

  sum = (arr) => {
    let result = arr.reduce(function(a, b) {return a + b;}, 0);
    this.setState({
      solution: result
    })
  }

  average = (arr) => {
    let sum = arr.reduce(function(a, b) {return a + b;}, 0);
    let avg = sum / arr.length 
    this.setState({
      solution: avg
    })
  }

  mode = (arr) => {
    let obj = {}
    arr.forEach(el => {
      if (obj[el]) {
        obj[el]++
      } else {
        obj[el] = 1
      }
      return obj 
    })

    let frequency = 0; 
    let mode = '';
    for (let el in obj) {
      if (obj[el] > frequency) {
        frequency = obj[el]
        mode = el
      }
    }
    this.setState({
      solution: mode 
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    if(this.arrayValid()){
      this.setState({
        submitted: true
      }) 
      this.calculate()
    } else {
      this.setState({
        solution: 'Invalid Input'
      })
    }
  }

  render() { 
    const {array, solution} = this.state 
    return (
    <div className="App">
    <p>Enter each number in the array, separated by a ','</p>
    <form onSubmit={this.handleFormSubmit}>
      <input 
      type='text'
      value={array}
      onChange={this.handleInputChange}
      ></input>
      <select onChange={this.handleSelectChange}>
        <option value=''></option>
        <option value='sum'>Sum</option>
        <option value='average'>Average</option>
        <option value='mode'>Mode</option>
      </select>
      <button>Calculate</button>
    </form>
    <p>{solution}</p>
    </div>
   )
  }
}

export default App;
