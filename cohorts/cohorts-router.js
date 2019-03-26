const router = require('express').Router();
const knex = require('knex');

const propChecker = require('../middleware/propChecker.js')

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
        const cohorts = await db('cohorts')
        res.status(200).json(cohorts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first() 
        res.status(200).json(cohort)    
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', propChecker, async (req,res) => {
    try {
        const [id] = await db('cohorts')
            .insert(req.body)
        res.status(201).json(id)    
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router