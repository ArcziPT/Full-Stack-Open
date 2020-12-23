import {Part} from './Part'

export const Content = (props) => (
    <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
    </div>
)