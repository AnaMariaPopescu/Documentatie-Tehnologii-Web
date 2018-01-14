import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import JocuriList from './JocuriList'
import JocuriStore from './stores/JocuriStore'
import EvenimenteList from './EvenimenteList'
import EvenimenteStore from './stores/EvenimenteStore'

const SERVER = 'https://proiect-tehnologiiweb-ana-maria.c9users.io'
const store = new JocuriStore()

function addRecord(joc)
{
  store.addOne(joc)
}

function saveJoc(id,joc)
{
  store.saveOne(id,joc)
}
class App extends Component {
  constructor(props) {
    super(props)
    
  }
  
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Organizare turnee de jocuri</h1>
        </header>
        Jocuri 
          <JocuriList /> 
        Evenimente
          <EvenimenteList />
    </div>
    );
  }
}

export default App;
