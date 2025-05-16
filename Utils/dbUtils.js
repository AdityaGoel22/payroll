import { pool } from "../Config/Db.js";

const userTableQuery = 'CREATE TABLE IF NOT EXISTS User ( empid INT PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );'
const ticketTableQuery = 'CREATE TABLE IF NOT EXISTS Ticket ( ticketnumber INT PRIMARY KEY AUTO_INCREMENT, empid INT, email VARCHAR(255) NOT NULL, subject VARCHAR(255) NOT NULL, description VARCHAR(1200) NOT NULL, status VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );'
const salaryTableQuery = 'CREATE TABLE IF NOT EXISTS Salary ( empid INT PRIMARY KEY, salary INT NOT NULL);'
const feedbackTableQuery = 'CREATE TABLE IF NOT EXISTS Feedback ( sno INT PRIMARY KEY AUTO_INCREMENT, empid INT NOT NULL, suggestion VARCHAR(1000) NOT NULL, userfriendly INT NOT NULL, ticketsupport INT NOT NULL, overallrating INT NOT NULL);'


const createTable = async(tableName, query)=>{
    try{
        await pool.query(query)
        console.log(`${tableName} table created or already exsists`)
    } catch(error){
        console.log(`Error creating ${tableName}`, error);
        
    }
}

const createAllTable = async()=>{
    try {
        await createTable('User', userTableQuery);
        await createTable('Ticket', ticketTableQuery);
        await createTable('Salary', salaryTableQuery);
        await createTable('Feeback', feedbackTableQuery);
    } catch (error) {
        
    }
}

export {createAllTable};