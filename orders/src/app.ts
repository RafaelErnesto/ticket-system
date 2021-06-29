import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, currentUser } from '@rfltickets/common'
import { newRouter  } from './routes/new'
import { showRouter } from './routes/show'
import { indexRouter } from './routes//index'
import { deleteRouter } from './routes/delete'


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(currentUser)

app.use(newRouter)
app.use(showRouter)
app.use(indexRouter)
app.use(deleteRouter)


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)


export { app }