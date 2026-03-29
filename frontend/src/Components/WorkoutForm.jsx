const WorkoutForm = ({ formData, onSubmit, onChange }) => {
    const { title, reps, load } = formData;

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title.."
                value={title}
                onChange={onChange}
            />

            <input
                type="number"
                name="reps"
                placeholder="Reps.."
                value={reps}
                onChange={onChange}
            />

            <input
                type="number"
                name="load"
                placeholder="Load.."
                value={load}
                onChange={onChange}
            />

            <button type="submit">Save</button>
        </form>
    )
}

export default WorkoutForm;

