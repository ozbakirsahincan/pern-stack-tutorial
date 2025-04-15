import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

// Import routes
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;


// Middleware
// CORS, farklı originlerden gelen istekleri kabul etmek için kullanılır
//Helmet Http requestlerde güvenliği artırmak için kullanılır
// Morgan, HTTP requestlerini loglamak için kullanılır

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import productRoutes from './routes/productRoutes.js';

// Import routes
app.use('/api/products', productRoutes);



async function initDb() {
    try {
        // Connect to the database
        // Serial = Auto Increment
        // Primary Key = Unique Identifier
        // VARCHAR = String
        // DECIMAL = Decimal Number
        // TEXT = Long String
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                
            )`;
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
});

