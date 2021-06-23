import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {

    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined')
    }

    try {
        await natsWrapper.connect('ticketing', 'asd', 'http://nats-srv:4222')
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to the database!')
    } catch(err) {
        console.log(err)
    }  

    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
}

start();
