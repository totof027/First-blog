import React, { Component } from 'react'
// CSS
import './App.css'

import Header from './components/Header'
import recettes from './recettes'
import Admin from './components/Admin'
import Card from './components/Card'

// Firebase
import base from './base'

class App extends Component {
  // state
  state = {
    pseudo: this.props.match.params.pseudo, // Attraper le pseudo de la personne connectée.
    recettes: {}
  }

  // Cycle de vie
  componentDidMount(){
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`,{
        context: this,
        state: 'recettes'
    })
  }
  componentWillUnmount(){ // faire en sorte qu'une modification ne s'effectue que sur un pseudo.
    base.removeBinding(this.ref)
  }

  // methode
  ajouterRecette = recette => {

    const recettes = { ...this.state.recettes }
    recettes[`recette-${Date.now()}`] = recette
    this.setState({ recettes })
  }

  modifRecette = (key, newRecette) => { // mis a jour d'une recette
    const recettes = { ...this.state.recettes }
    recettes[key] = newRecette
    this.setState({ recettes })
  }

  supprimerRecette = key => {
    const recettes = { ...this.state.recettes }
    recettes[key] = null
    this.setState({ recettes })
  }

  chargerExemple = () => this.setState({ recettes })

  render () {
    const cards = Object.keys(this.state.recettes)
    .map(key=> <Card key={key} 
                     details={this.state.recettes[key]} />)
     
    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          <div className='card'>
            { cards }
          </div>
        </div>
        <Admin
          pseudo = {this.state.pseudo}
          recettes = { this.state.recettes } 
          modifRecette = {this.modifRecette}
          supprimerRecette = {this.supprimerRecette}
          chargerExemple = {this.chargerExemple}
          ajouterRecette = {this.ajouterRecette}>
 
        </Admin>
      </div>
    )
  }
}

export default App
