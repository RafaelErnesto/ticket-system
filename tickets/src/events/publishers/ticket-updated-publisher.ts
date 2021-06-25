import { BasePublisher, Subjects, TicketUpdatedEvent } from '@rfltickets/common'

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
    readonly subject  = Subjects.TicketUpdated;  
}