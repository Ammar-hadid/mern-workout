import WorkoutCard from '../Components/WorkoutCard.jsx';
import { useState, useEffect } from 'react';
import {
    getAllWorkouts,
    postWorkout,
    updateWorkout,
    deleteWorkout
} from '../api/workouts.js';

import WorkoutsWrapper from '../Components/WorkoutsWrapper.jsx';
import WorkoutForm from '../Components/WorkoutForm.jsx';


const HomePage = () => {

    const [workouts, setWorkouts] = useState([]);

    const [form, setForm] = useState({
        title: '',
        reps: '',
        load: ''
    });

    const [editedWorkout, setEditedWorkout] = useState(null);

    // #region Display all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await getAllWorkouts();
                setWorkouts(data);
            }

            catch (error) {
                console.error(`ERROR: ${error}`);
                return;
            }
        }

        fetchWorkouts();
    }, []);
    // #endregion

    // #region Create workout
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editedWorkout) {

            try {
                const response = await updateWorkout({ ...form, id: editedWorkout._id });

                if (response.error) throw new Error(`ERROR: ${response.error}`);

                setWorkouts(prev => prev.map(workout => {
                    if (workout._id === editedWorkout._id) {
                        return response.data
                    }

                    return workout
                }))

                setEditedWorkout(null);

                setForm({
                    title: '',
                    reps: '',
                    load: ''
                })

                return
            }

            catch (error) {
                console.error(`ERROR: ${error}`);
            }
        }

        try {
            const response = await postWorkout(form);

            if (response.error) {
                throw new Error(`ERROR: ${response.error}`)
            }

            setWorkouts(prev => (
                [
                    response.data,
                    ...prev
                ]
            ))

            setForm({
                title: '',
                reps: '',
                load: ''
            })
        }

        catch (error) {
            console.error(`ERROR: ${error}`);
            return;
        }
    }

    const onChange = (e) => {
        setForm(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const onEdit = (_id) => {

        const workout = workouts.find(workout => workout._id === _id);

        if (!workout) throw new Error('Workout not found');

        setEditedWorkout(workout)

        setForm({
            title: workout.title,
            reps: workout.reps,
            load: workout.load
        })
    }

    const onDelete = async (_id) => {
        try {
            const isConfirmed = confirm('Are you sure?')

            if (isConfirmed) {

                const response = await deleteWorkout(_id);

                if (response.error) throw new Error(`ERROR: ${response.error}`);

                setWorkouts(prev => prev.filter(workout => workout._id !== _id));

                console.log(`${response.data.title} Has been deleted!`)
            }
        }

        catch (error) {
            console.error(`ERROR: ${error}`);
        }
    }

    return (
        <div className="main-container">
            <WorkoutsWrapper>
                {workouts.map(workout => {
                    return <WorkoutCard key={workout._id} {...workout} onEdit={() => { onEdit(workout._id) }} onDelete={() => onDelete(workout._id)} />
                })}
            </WorkoutsWrapper>

            <WorkoutForm formData={form} onSubmit={handleSubmit} onChange={onChange} />
        </div>
    )
}

export default HomePage;

