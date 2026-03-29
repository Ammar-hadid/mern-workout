const WorkoutsWrapper = ({ children }) => {
    return (
        <div className="workouts-wrapper">
            {
                !children || children.length === 0 ?
                    <p>Geen workouts gevonden</p> : children
            }
        </div>
    )
}

export default WorkoutsWrapper;