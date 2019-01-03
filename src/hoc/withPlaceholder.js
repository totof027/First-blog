import React from 'react'

const withPlaceholder = WrappedComponent => (props) => (

    <WrappedComponent 
        placeholder = 'HOC'
        { ...props }
    />

)

export default withPlaceholder