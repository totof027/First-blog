import React from 'react'


// Notions avancées avec le higher-order components de REACT.

const withPlaceholder = WrappedComponent => (props) => (

    <WrappedComponent 
        placeholder = 'Entrez un pseudo'
        { ...props }
    />

)

export default withPlaceholder