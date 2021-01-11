var mongoose = require('mongoose')

const url = `mongodb+srv://fullstack:${process.argv[2]}@cluster0.6mt5m.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    number: String,
    name: String
})
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    Person.find({}).then(persons => {
        persons.forEach(p => console.log(p))
        mongoose.connection.close()
    })
}else if(process.argv.length === 5){
    const person = new Person({
        number: process.argv[4],
        name: process.argv[3]
    })

    person.save().then(result => {
        console.log(`added ${person}`)
        mongoose.connection.close()
    })
}else{
    mongoose.connection.close()
}