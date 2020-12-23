export const Total = (props) => (
    <div>
        <p>Number of exercises {props.parts.map(part => part.exercises)
                                            .reduce((acc, v) => acc + v)}</p>
    </div>
)