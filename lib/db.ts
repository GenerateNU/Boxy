import PG from "pg";

const Pool = PG.Pool;

class Database {
    pool: PG.Pool;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            password: 'password',
            port: 3001
        })
    }

    addUser(name: string, phoneNumber: Number, email: string, drivers_license_photo: boolean, username: string, password: string) {
        this.pool.query(`
            INSERT INTO users (name, phone_number, email, drivers_license_photo, verified, username, password)
            VALUES('${name}', ${phoneNumber}, '${email}', '${drivers_license_photo}', false, '${username}', '${password}');
        `);
    }
}

const myDatabase = new Database();

export default myDatabase;