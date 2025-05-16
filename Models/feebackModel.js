class FeedbackModel{
    constructor(feedback){
        this.empid = feedback.empid;
        this.suggestion = feedback.suggestion;
        this.userfriendly = feedback.userfriendly;
        this.ticketsupport = feedback.ticketsupport;
        this.overallrating = feedback.overallrating;
    }
}


export default FeedbackModel;