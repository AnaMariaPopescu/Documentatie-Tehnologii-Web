import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import JocuriStore from './stores/JocuriStore'
import Jocuri from './Jocuri'

const emitter = new EventEmitter()
const store = new JocuriStore(emitter)

function addJoc(joc) {
    // body...
    store.addOne(joc)
} 
//addJoc = (joc) => { store.addOne(joc)}

function deleteJoc(id)
{
    store.deleteOne(id)
}
function saveJoc(id,joc) {
    store.saveOne(id,joc)
}


class JocuriList extends Component{
    constructor(props){
    super(props)
    this.state = { jocuri: [],
        jocDenumire : '',
        jocData : '' ,
        jocGen : '',
        jocPlatforme: '',
        jocDezvoltator: ''
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
      emitter.addListener('JOC_LOAD', () => {
          this.setState({
              jocuri : store.content
          })
      })
  }
  render() {
      return (
          <div>
          <div>
          {this.state.jocuri.map((j) => 
          //<li>{e.denumire_joc + '' + e.data_lansare + '' + e.gen + '' +e.platforme+ ''+e.dezvoltator} </li> 
          <Jocuri joc={j} key={j.id} />)}
          </div>
          <ul>
          {this.state.jocuri.map((e)=> <li> {e.denumire_joc + '' + e.data_lansare + '' + e.gen + '' +e.platforme+ ''+e.dezvoltator} </li> 
          ) }
          </ul>
          <form>
            Denumire : <input type="text" onChange={this.handleInputChange} name="jocDenumire" />
            Data_lansare : <input type="text" onChange={this.handleInputChange} name="jocData" />
            Gen : <input type="text" onChange={this.handleInputChange} name="jocGen" />
            Platforme : <input type="text" onChange={this.handleInputChange} name="jocPlatforme" />
            Dezvoltator : <input type="text" onChange={this.handleInputChange} name="jocDezvoltator" />
            <input type="button" value="Adauga Joc" onClick={ () => addJoc({denumire_joc:this.state.jocDenumire,
                data_lansare:this.state.jocData, gen:this.state.jocGen, platforme:this.state.jocPlatforme, dezvoltator:this.state.jocDezvoltator
            })} />
          </form>
          </div>
          )
    }
}

export default JocuriList