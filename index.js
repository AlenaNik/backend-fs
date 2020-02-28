const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())



let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Alena",
        "number": "123",
        "id": 5
    },
    {
        "name": "name",
        "number": "68872",
        "id": 6
    },
    {
        "name": "Jaime",
        "number": "154",
        "id": 7
    },
    {
        "name": "Baton",
        "number": "563",
        "id": 8
    }
]

app.get('/', (req, res) => {
    res.send('<p>Hello from normal slash</p>')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>`)
})

// get single id

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// delete by id

app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

// post
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.post('/persons', (req, res) => {
    const body = req.body

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    res.json(person)
})


// middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

