import mongoose from 'mongoose';
import Workout from '../models/Workout.js';

export const getAllWorkouts = async (req, res) => {

    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });

        res.status(200).json(workouts)
    }

    catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const getWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid workout id' });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json(workout);
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(201).json(workout);
    }

    catch (error) {
        res.status(400).json({ error: error.message })
    }
}
