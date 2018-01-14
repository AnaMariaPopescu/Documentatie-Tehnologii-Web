import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import EvenimenteStore from './stores/EvenimenteStore'
import Evenimente from './Evenimente'

const emitter = new EventEmitter()
const store = new EvenimenteStore(emitter)

function addEveniment(eveniment) {
    // body...
    store.addOne(eveniment)
} 

class EvenimenteList extends Component{
    constructor(props){
    super(props)
    this.state = { evenimente: [],
        evenimentDenumire : '',
        evenimentData : '' ,
        evenimentDurata : '',
        evenimentID: ''
    }
    //this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputChange = (event) => {
      let value=event.target.value
      let name=event.target.name
      this.setState({
          [name] : value
      })
  }
  }
  componentDidMount() {
      store.getAll()
      emitter.addListener('EVENIMENT_LOAD', () => {
          this.setState({
              evenimente : store.content
          })
      })
  }
  render() {
      return (
          <div>
          <div>
          {this.state.evenimente.map((e) => 
          <Evenimente eveniment={e} key={e.id} />)}
          </div>
          <ul>
          {this.state.evenimente.map((e)=> <li> {e.denumire + '' + e.data + '' + e.durata + '' +e.id_joc} </li> 
          ) }
          </ul>
          <form>
            Denumire : <input type="text" onChange={this.handleInputChange} name="evenimentDenumire" />
            Data : <input type="text" onChange={this.handleInputChange} name="evenimentData" />
            Durata : <input type="text" onChange={this.handleInputChange} name="evenimentDurata" />
            <input type="button" value="Adauga Eveniment" onClick={ () => addEveniment({denumire:this.state.evenimentDenumire,
                data:this.state.evenimentData, durata:this.state.evenimentDurata
            })} />
          </form>
          </div>
          )
    }
}

export default EvenimenteList