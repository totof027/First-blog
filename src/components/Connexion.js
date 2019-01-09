import React from 'react'
import { Redirect } from 'react-router-dom'
import withPlaceholder from '../hoc/withPlaceholder'

class Connexion extends React.Component { 
  state = {
    pseudo: '',
    goToApp: false
  }

  goToApp = event => { // fonction avec un booleen pour acceder a l'app.
    event.preventDefault()
    this.setState({ goToApp: true })
  }

  handleChange = event => { // fonction pour valider un pseudo
    const pseudo = event.target.value
    this.setState({ pseudo })
  }

  render () {
    if (this.state.goToApp) { // Si le booleen est a true on redirect sur un url.
      return <Redirect push to={`/pseudo/${this.state.pseudo}`} />
    }

    return (
      <div className='connexionBox'>
        <form className='connexion' onSubmit={this.goToApp} >
          <h1>Ma Boîte à Recettes</h1>
          <input
            type='text'
            value={this.state.pseudo}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            pattern='[A-Za-z-]{1,}'
            required />
          <button type='submit'>GO</button>
          <p>Pas de caractères spéciaux.</p>
        </form>
      </div>
    )
  }
}

// Notions avancées avec le higher-order components de REACT.
const WrappedComponent = withPlaceholder(Connexion)

export default WrappedComponent
