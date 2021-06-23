import { BasePublisher, Subjects, TicketCreatedEvent } from '@rfltickets/common'

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
    readonly subject  = Subjects.TicketCreated;  
}