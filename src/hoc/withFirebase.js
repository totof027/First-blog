import React, { Component } from 'react'

import recettes from '../recettes'

// Firebase
import base from '../base'

const withFirebase = WrappedComponent => (
    class HOC extends Component {

         // state
        state = {
            pseudo: this.props.match.params.pseudo, // Attraper le pseudo entré dans l'input de la connexion.
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
        render() {
          return (
            <WrappedComponent // { ...this.props}/> pour recuperer tous les props.
            recettes = {this.state.recettes}
            ajouterRecette = {this.ajouterRecette}
            modifRecette = {this.modifRecette}
            supprimerRecette = {this.supprimerRecette}
            chargerExemple = {this.chargerExemple}
            { ...this.props}/>
          )
        }
      }
)

export default withFirebase