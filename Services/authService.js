import bcrypt from "bcryptjs";
import { pool } from "../Config/Db.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { text } from "express";

const JWT_SECRET = "vanshification1709postmukundinitrate060803";
const RESET_TOKEN = "prekshamasion26@04circulaarushism02";


export const registerUser = async (user) => {
    //console.log(user);

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = 'INSERT INTO user (empid, password, email) VALUES (?, ?, ?)';
        const values = [user.empid, hashedPassword, user.email]

        await pool.query(query, values);
        return { success: true, message: "Registration Successful" };
    } catch (error) {
        return { success: false, message: "Registration Failed", error: error };
    }
};

export const loginUser = async (empid, password) => {
    try {
        const [rows] = await pool.query('Select * from user where empid = ?', [empid]);
        if (rows.length == 0) {
            return { success: false, message: 'User Not Found' };
        }
        const users = rows[0];

        const passwordMatch = await bcrypt.compare(password, users.password);

        if (!passwordMatch) {
            return { success: false, message: 'Invalid Password' };
        }
        const token = jwt.sign(
            { empid: users.empid },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return {
            success: true,
            message: 'Login Successful',
            token: token
        }
    } catch (error) {
        return { success: false, message: "Login failed. Please try again later", error: error };
    }
};

export const sendResetPasswordLink = async (email) => {
    try {
        const rows = await pool.query('Select * from user where email = ?', [email]);
        if (rows.length == 0) {
            return { success: false, message: 'User Not Found' };
        }
        const user = rows[0];
        const resetToken = jwt.sign({ empid: user.empid, email: user.email }, RESET_TOKEN, { expiresIn: '10m' });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user:'',
                password: '',
            }
        });

        const resetLink = `https://localhost:3000/reset-password?=token=${resetToken}`;

        const mailOptions = {
            from: "Payroll Portal aditya.goel@mphasis.com",
            to: user.email,
            subject: 'Reset Password',
            text: `Click on the link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        console.log(resetLink);
        return { success: true, message: "Reset Password email sent successfully", resetLink };

    } catch (error) {
        return { success: false, message: "Login failed. Please try again later", error: error };
    }

};
export const resetPasswordService = async (token,password) => {
    try {
        const decoded = jwt.verify(token, RESET_TOKEN);
        const hashedPassword = await bcrypt.hash(password,10);
        const query='update user SET password = ? WHERE empid = ?';
        const values = [hashedPassword, decoded.empid];

        await pool.query(query,values);

        return {success:true, message: 'Reset Password Email sent Successfully'};
    } catch (error) {
        return { success: false, message: "Login failed. Please try again later", error: error };
    }
};

export const getUserToken = async (token) => {
    try {
        const trimmedToken = token.trim();
        const decodedToken = jwt.verify(trimmedToken, JWT_SECRET);
        const [rows] = await pool.query('Select empid, email from user where empid = ?', [decodedToken.empid]);
        if (rows.length == 0) {
            return { success: false, message: 'User Not Found' };
        }
        return { success: true, data: rows[0] }

    } catch (error) {
        return { success: false, message: "Login failed. Please try again later", error: error }
    }
}

export const getEmpId = async (token) => {
    try {
        const trimmedToken = token.trim();
        const decodedToken = jwt.verify(trimmedToken, JWT_SECRET);
        return decodedToken.empid;  // This should return the empid
    } catch (error) {
        throw new Error('Invalid token');  // Throw an error if token verification fails
    }
};
