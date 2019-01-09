import React, { Component } from 'react';
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import Login from './Login'


import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'



class Admin extends Component {
    state = {
        uid: null,
        chef: null
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.handleAuth({ user })
            }
        })
          
    }
    handleAuth = async authData => { // 'async 'faire une action et la terminer avant d'aller a la suite.
       const box = await base.fetch(this.props.pseudo, { context: this})
       console.log(this.props.pseudo)
       if(!box.chef){
           await base.post(`${this.props.pseudo}/chef`,{
               data : authData.user.uid
           })
       }
       
       this.setState({
           uid : authData.user.uid,
           chef: box.chef || authData.user.uid
       })

    }

    logout = async() => {
        console.log('deconnexion')
        await firebase.auth().signOut()

        this.setState({ uid : null })
    }
    
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.handleAuth)
    }

    render() {
        const { recettes, ajouterRecette, modifRecette, chargerExemple, supprimerRecette } = this.props

        const logout = <button onClick={this.logout}>Deconnexion</button>
        // Si l'utilisateur n'est pas connecté 
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}></Login>
        }
        if(this.state.uid !== this.state.chef){
            return(
                <div>
                    <h2>Tu n\'es pas le chef de cette page.</h2>
                    {logout}
                </div>
                // Correction
            )
        }
        return (
            <div className="cards">
                <AjouterRecette ajouterRecette= {ajouterRecette}></AjouterRecette>
                {
                    Object.keys(recettes)
                        .map(key => <AdminForm
                        key= {key}
                        id = {key}
                        recettes = {recettes}
                        modifRecette = {modifRecette}
                        supprimerRecette = {supprimerRecette} />)
                }
                <footer>
                    {logout}
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
            
        );
    }
}

export default Admin;