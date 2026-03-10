import express from 'express';

// Workout model
import workoutModel from '../models/Workout.js';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const workouts = await workoutModel.find();

        res.status(200).json(workouts)
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: `GET workout ${id}`,
        id: id
    })
})


router.post('/', async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const Workout = await workoutModel.create({ title, reps, load });
        res.status(201).json(Workout);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.patch('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: `PATCH workout ${id}`,
        updates: req.body
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: `DELETE workout ${id}`
    })
})

export default router;