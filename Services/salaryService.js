import { getEmpId } from "./authService.js";
import { pool } from "../Config/Db.js";

export const payDescription = async (token) => {

    try {
        const empid = await getEmpId(token);
        
        const [rows] = await pool.query('SELECT * FROM salary WHERE empid = ?', [empid]);

        if (rows.length === 0) {
            return { success: false, message: 'Salary data not found for this employee' };
        }

        const sal = rows[0];
        const salary1 = parseFloat(sal.salary);

        let tax = 0;

     
        if (salary1 <= 400000) {
            tax = 0;
        } else if (salary1 > 400000 && salary1 <= 800000) {
            tax = 5;
        } else if (salary1 > 800000 && salary1 <= 1200000) {
            tax = 10;
        } else if (salary1 > 1200000 && salary1 <= 1600000) {
            tax = 15;
        } else if (salary1 > 1600000 && salary1 <= 2000000) {
            tax = 20;
        } else if (salary1 > 2000000 && salary1 <= 2400000) {
            tax = 25;
        } else {
            tax = 30;
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const salarypm = salary1 / 12;
        const totalTax = salary1 * tax / 100;
        const taxpm = totalTax / 12;
        const taxPaid = taxpm * currentMonth;

        return { success: true, data: { salarypm, taxpm, totalTax, taxPaid } };  

    } catch (error) {
        return { success: false, message: "Error calculating salary details", error: error };
    }
};
