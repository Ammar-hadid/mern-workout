export const getAllWorkouts = async () => {
    try {
        const res = await fetch('http://localhost:4000/api/workouts');
        const data = await res.json()
        return data;
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return [];
    }
}

export const postWorkout = async ({ title, reps, load }) => {
    try {
        const workout = {
            title,
            reps: Number(reps),
            load: Number(load)
        };

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        });

        const data = await response.json();

        if (!response.ok) {
            return { status: response.status, error: data }
        }

        return { status: response.status, data: data }
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return { status: 500, error: 'Network error' }
    }
}

export const updateWorkout = async ({ id, title, reps, load }) => {

    try {

        const workout = {
            title,
            reps: Number(reps),
            load: Number(load)
        }

        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        });

        const data = await response.json();

        if (!response.ok) {
            return { status: response.status, error: data }
        }

        return { status: response.status, data: data }
    }

    catch (error) {
        console.log(`ERROR: ${error}`);
        return { status: 500, error: 'Network error' }
    }
}

export const deleteWorkout = async id => {
    try {
        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const data = await response.json()

        if (!response.ok) {
            return { status: response.status, error: data }
        }

        return { status: response.status, data: data }
    }

    catch (error) {
        console.log(`ERROR: ${error}`);
        return { status: 500, error: 'Network error' }
    }
}