import axios from 'axios'

const SERVER = 'https://proiect-tehnologiiweb-ana-maria.c9users.io'
class EvenimenteStore{
    constructor(ee){
        this.emitter = ee
        this.content = [] 
        this.selected = null
    }
    getAll()
    {
        axios(SERVER + '/evenimente')
        .then((response) => {
            this.content=response.data
            this.emitter.emit('EVENIMENT_LOAD')
        })
        .catch((error) => console.warn(error))
    }
    getOne(id){
         axios(SERVER + '/evenimente/' + id)
        .then((response) => {
            this.content=response.data
            this.emitter.emit('EVENIMENT_LOAD')
        })
        .catch((error) => console.warn(error))
    }
    addOne(eveniment){
        axios.post(SERVER + '/eveniment',eveniment)
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    saveOne(id,eveniment){
        axios({
            method : 'post',
            url : SERVER + '/eveniment/' + id,
            headers : { 'Content-Type' : 'application/json' },
            data :eveniment 
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
    deleteOne(id){
        axios.delete(SERVER + '/eveniment/' + id)
         .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
}

export default EvenimenteStore
