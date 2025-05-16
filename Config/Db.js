import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("DB connected");

        connection.release();
    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
};

const updateTicketStatus = async () => {
    try {
        const query = `
            UPDATE ticket
            SET status = 'Open'
            WHERE status = 'New'
              AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) >= 1;
        `;
        
        const [result] = await pool.query(query);
        console.log(`Updated ${result.affectedRows} ticket(s) to "open"`);
    } catch (error) {
        console.error('Error updating ticket status:', error);
    }
};

// Schedule a cron job to run every minute
cron.schedule('* * * * *', async () => {
    console.log('Checking tickets for status update...');
    await updateTicketStatus();
});

export { pool, checkConnection };
