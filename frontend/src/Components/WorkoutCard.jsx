const WorkoutCard = ({ _id, title, reps, load, onEdit, onDelete }) => {
    return (
        <div className="workout-card">
            <h1>{title}</h1>
            <p><strong>reps: </strong>{reps}</p>
            <p><strong>load: </strong>{load}</p>

            <div className="buttons">
                {/* Edit button */}
                <button onClick={() => {
                    onEdit(_id)
                }}>Edit</button>

                {/* Delete button */}
                <button onClick={() => {
                    onDelete(_id);
                }}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default WorkoutCard;