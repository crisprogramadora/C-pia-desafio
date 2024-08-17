import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "copia_desafio",
    password: "postgres",
    port: 5440,
});

export default pool;
