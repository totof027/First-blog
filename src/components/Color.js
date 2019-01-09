import React, { Component } from 'react'


// Component qui gere le style du header.
const ColorContext = React.createContext()

class ColorProvider extends Component {

    state = {
        color: 'darkblue'
    }
    render () {
        return (
          <ColorContext.Provider
          value={{
              state: this.state
          }}>
          {this.props.children}
          </ColorContext.Provider>
        )
    }
}

export { ColorContext }

export default ColorProvider