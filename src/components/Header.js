import React from 'react';
import { ColorContext } from './Color'
const Header = ({pseudo}) => {
    const formatPseudo = pseudo => 
    /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    // Méthode pour afficher une préposition selon le pseudo rentré
    return (
        <ColorContext.Consumer>
            {context => (
                <header style = {{backgroundColor: context.state.color}}>
            <h1>La boite à recettes {formatPseudo(pseudo)}</h1>
        </header> 
            )}
        </ColorContext.Consumer>
        
    );
};

export default Header;