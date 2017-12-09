var express = require("express")
var Sequelize = require("sequelize")

var sequelize = new Sequelize('mydb','root', '', {
    dialect:'mysql',
    host:'localhost',
    define:{
        freezeTableName: true,
        timestamps: false
    }
})

sequelize.authenticate().then(function(){
    console.log('Succes')
})

var Jocuri = sequelize.define('Joc',{
    denumire_joc: Sequelize.STRING,
    data_lansare: Sequelize.STRING,
    gen: Sequelize.STRING,
    platforme: Sequelize.STRING,
    dezvoltator: Sequelize.STRING
})

var Evenimente = sequelize.define('Eveniment',{
    id_joc: Sequelize.INTEGER,
    denumire: Sequelize.STRING,
    data: Sequelize.STRING,
    durata: Sequelize.STRING
})

Evenimente.belongsTo(Jocuri, {foreignKey: 'id_joc', targetKey: 'id'})

var app = express()

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded());

app.get('/jocuri',function(request,response) {
    Jocuri.findAll().then(function(joc){
        response.status(200).send(joc)
    })
})

app.get('/jocuri/:id', function(request,response) {
    Jocuri.findOne({where: {id:request.params.id}}).then(function(joc) {
        if(joc) {
            response.status(200).send(joc)
        }
        else {
            response.status(404).send()
        }
    })
})

app.post('/joc', function(request,response) {
    Jocuri.create(request.body).then(function(joc) {
        response.status(201).send(joc)
    })
})

app.put('/joc/:idJoc', function(request,response) {
    Jocuri.findById(request.params.idJoc).then(function(joc) {
        if(joc) {
            joc.update(request.body).then(function(joc) {
                response.status(201).send(joc)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/joc/:idJoc', function(request, response) {
    Jocuri.findById(request.params.idJoc).then(function(joc) {
        if(joc) {
            joc.destroy().then(function() {
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/evenimente', function(request, response) {
    Evenimente.findAll().then(function(eveniment) {
        response.status(200).send(eveniment)
    })
})

app.get('/evenimente/:id', function(request, response) {
    Evenimente.findOne({ where: {id:request.params.id}}).then(function(eveniment) {
        if(eveniment) {
            response.status(200).send(eveniment)
        } else {
            response.status(404).send()
        }
    })
})

app.post('/eveniment',function(request,response) {
    Evenimente.create(request.body).then(function(eveniment) {
        response.status(201).send(eveniment)
    })
})

app.put('/eveniment/:id', function(request,response) {
    Evenimente.findById(request.params.id_eveniment).then(function(eveniment) {
        if(eveniment) {
            eveniment.update(request.body).then(function(eveniment) {
                response.status(201).send(eveniment)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/eveniment/:id_eveniment', function(request, response) {
    Evenimente.findById(request.params.id_eveniment).then(function(eveniment) {
        if(eveniment) {
            eveniment.destroy().then(function() {
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/jocuri/:id/evenimente', function(request, response) {
    Evenimente.findAll({ where:{id_joc: request.params.id}}).then(function(eveniment) {
        response.status(200).send(eveniment)
    })
})

app.listen(8080)