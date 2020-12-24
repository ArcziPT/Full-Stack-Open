import React from 'react'

const Header = ({title}) => (
    <div>
        <h1>{title}</h1>
    </div>
)

const Part = ({part}) => (
    <div>
        <p>{part.name} {part.exercises}</p>
    </div>
)

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
)

const Course = ({course}) => (
    <div>
        <Header title={course.name}/>
        <Content parts={course.parts}/>
    </div>
)

export default Course