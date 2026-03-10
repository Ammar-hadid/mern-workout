import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },

    reps: {
        type: Number,
        required: true,
        min: 1,
        max: 30
    },

    load: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
})

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;