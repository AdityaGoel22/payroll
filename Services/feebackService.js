import { pool } from "../Config/Db.js";
import { getEmpId } from "./authService.js";

export const FeedbackService = async(token, feedback) =>{
    const empid = await getEmpId(token);

    try {
        const query = 'INSERT INTO feedback (empid, suggestion, userfriendly, ticketsupport, overallrating) VALUES (?, ?, ?, ?, ?)';
        const values = [empid, feedback.suggestion, feedback.userfriendly, feedback.ticketsupport, feedback.overallrating];

        await pool.query(query, values);

        return { success: true, message: "Feedback has been successfully Submitted" };
    } catch (error) {
        return { success: false, message: "Error submitting the feedback", error: error };
    }
}