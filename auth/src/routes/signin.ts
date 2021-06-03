import express, {Request, Response} from 'express'
import { validateRequest } from '../middlewares/validate-request'
import { body } from 'express-validator'

const router = express.Router()

router.post('/api/users/signin', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must provide a password')
],
validateRequest,

(req: Request, res: Response) => {

    res.send('Hi There!')

})

export { router as signinRouter }