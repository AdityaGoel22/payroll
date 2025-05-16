import { payDescription } from '../Services/salaryService.js';
import SalaryModel from '../Models/salaryModel.js';

export const SalaryDescription = async (req, res) => {
    const { token, empid, salary } = req.body;

    const salaryInstance = new SalaryModel({empid, salary});

    try {
        const response = await payDescription(token, salaryInstance);

        if (response.success) {
            return res.status(200).json(response);  
        } else {
            return res.status(400).json(response);  
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching salary details", error: error });
    }
};
