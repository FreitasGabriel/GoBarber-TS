import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepoository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find()
    return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    })

    return res.json(appointment)
})

export default appointmentsRouter
