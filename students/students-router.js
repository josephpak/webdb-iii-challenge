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

router.post('/', propChecker, async (req,res) => {
    try {
        const [id] = await db('students')
            .insert(req.body)
        res.status(201).json(id)    
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', propChecker, async (req,res) => {
    try {
        const count = db('students')
            .where({ id: req.params.id })
            .update(req.body)
        if (count > 0) {
            const student = await db('students')
                .where({ id: req.params.id })
            res.status(200).json(student)    
        } else {
            res.status(404).json({
                message: "Student not found!"
            })
        }   
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const count = await db('students')
            .where({ id: req.params.id })
            .del()

        if (count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({
                message: "Student not found"
            })
        }   

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router