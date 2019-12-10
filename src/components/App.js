import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (e) => {
    this.setState({
      filters: { type: e.target.value }
    })
  }

  handleAdoptPet = (petId) => {
    console.log('adopted', petId);
    let newPets = this.state.pets.map((pet) => {
      if (pet.id === petId) {
        pet.isAdopted = true
      }
      return pet
    })
    this.setState({ pets: newPets })

  }

  handleFindPetsClick = (e) => {
    let fetchURL = this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    fetch(fetchURL)
      .then(res => res.json())
      .then(data => {
        this.setState({ pets: data })
      })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
