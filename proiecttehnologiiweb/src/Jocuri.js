import React, { Component } from 'react';


class Jocuri extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
       {this.props.joc.denumire_joc} {this.props.joc.data_lansare} {this.props.joc.gen} {this.props.joc.platforme} {this.props.joc.dezvoltator}
      </div>
    )
  }
}

export default Jocuri
