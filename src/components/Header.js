import React from 'react';

const Header = ({pseudo}) => {
    const formatPseudo = pseudo => 
    /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    // Méthode pour afficher une préposition selon le pseudo rentré
    return (
        <header>
            <h1>La boite à recettes {formatPseudo(pseudo)}</h1>
        </header>
    );
};

export default Header;