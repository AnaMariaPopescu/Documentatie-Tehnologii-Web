import axios from 'axios'

const SERVER = 'https://proiect-tehnologiiweb-ana-maria.c9users.io'
class JocuriStore{
    constructor(ee){
        this.emitter = ee
        this.content = [] 
        this.selected = null
    }
    getAll()
    {
        axios(SERVER + '/jocuri')
        .then((response) => {
            this.content=response.data
            this.emitter.emit('JOC_LOAD')
        })
        .catch((error) => console.warn(error))
    }
    getOne(id){
         axios(SERVER + '/jocuri/' + id)
        .then((response) => {
            this.content=response.data
            this.emitter.emit('JOC_LOAD')
        })
        .catch((error) => console.warn(error))
    }
    addOne(joc){
        /*axios({
            method : 'post',
            url : SERVER + '/joc',
            headers : { 'Content-Type' : 'application/json' },
            data :joc 
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))*/
        axios.post(SERVER + '/joc',joc)
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    saveOne(id,joc){
        axios({
            method : 'post',
            url : SERVER + '/joc/' + id,
            headers : { 'Content-Type' : 'application/json' },
            data :joc 
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    deleteOne(id){
        axios.delete(SERVER + '/joc/' + id)
         .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
}

export default JocuriStore
