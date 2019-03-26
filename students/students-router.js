const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/webapi3.db3'
    }
}

const db = knex(knexConfig)

router.get('/', async (req,res) => {
    try {
        const students = await db('students')
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const student = await db('students')
            .where({ id: req.params.id })
            .first()
        res.status(200).json(student)    
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router