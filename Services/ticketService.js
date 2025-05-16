import { pool } from "../Config/Db.js";
import { getEmpId } from "./authService.js";

export const raiseTicket = async(ticket) =>{
    console.log(ticket);

    try {
        const query = 'INSERT INTO ticket (empid, email, subject, description, status) VALUES (?, ?, ?, ?, ?)';
        const values = [ticket.empid, ticket.email, ticket.subject, ticket.description, ticket.status];

        await pool.query(query, values);

        return { success: true, message: "Ticket has been successfully raised" };
    } catch (error) {
        return { success: false, message: "Error raising a ticket", error: error };
    }
}


export const ticketStatus = async (token) => {
    try {
        const empid = await getEmpId(token);
        const [rows] = await pool.query('SELECT * FROM ticket WHERE empid = ?', [empid]);
        
        if (rows.length === 0) {
            return { success: false, message: 'No tickets raised.' };
        }
            return { success: true, data: rows};
            
    } catch (error) {
        return { success: false, message: 'Error fetching ticket data' };
    }
};