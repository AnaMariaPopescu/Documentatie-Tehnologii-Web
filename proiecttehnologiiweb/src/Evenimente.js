import React, { Component } from 'react';


class Evenimente extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
       {this.props.eveniment.denumire} {this.props.eveniment.data} {this.props.eveniment.durata} 
       {this.props.eveniment.id_joc} 
      </div>
    )
  }
}

export default Evenimente
