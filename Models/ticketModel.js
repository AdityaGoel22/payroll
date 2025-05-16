class TicketModel{
    constructor(ticket){
        this.empid = ticket.empid;
        this.email = ticket.email;
        this.subject = ticket.subject;
        this.description = ticket.description;
        this.status = ticket.status;
    }
}


export default TicketModel;