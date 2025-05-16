import TicketModel from '../Models/ticketModel.js';
import TicketModel1 from '../Models/ticketmModel1.js';
import { raiseTicket, ticketStatus } from '../Services/ticketService.js';

export const raiseATicket = async(req, res)=>{
    const {empid, email, subject, description, status}=req.body;
    if(!empid||!email||!subject||!description||!status){
        return res.status(400).json({success:false, message:'All fields are required'})
    };

    const ticket = new TicketModel({empid,email,subject,description,status});

    try {
        const response = await raiseTicket(ticket);
        if(response.success){
            return res.status(200).json(response);
        } else{
            return res.status(400).json(response);
        }
    } catch (error) {
        return {success:false,message:"Error raising a ticket"};
    }
};

export const getTicket = async(req,res)=>{
    const { token, empid, ticketnumber, subject, description, status } = req.body;
    const ticketInstance = new TicketModel1({empid,ticketnumber,subject,description,status});

    try {
            const response = await ticketStatus(token, ticketInstance);
            if (response.success) {
                return res.status(200).json(response);  
            } else {
                return res.status(400).json(response);  
            }
    
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error fetching ticket details", error: error });
        }




}