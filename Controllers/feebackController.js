import FeedbackModel from "../Models/feebackModel.js";
import { FeedbackService } from "../Services/feebackService.js";

export const feedbackForm = async (req, res) => {
    const { token, empid, suggestion, userfriendly, ticketsupport, overallrating } = req.body;

    if (!suggestion || !userfriendly || !ticketsupport || !overallrating) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    };

    const feedbackInstance = new FeedbackModel({ empid, suggestion, userfriendly, ticketsupport, overallrating });

    try {
        const response = await FeedbackService(token, feedbackInstance);
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        return { success: false, message: "Error submitting the feedback" };
    }
};
