"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'password',
    port: 3000,
});
// TODO: add constraints to datatable (not null, foreign key, email, phone number, zip code etc.)
// add authentication to endpoints
function initializeDatabase() {
    pool.query(`CREATE TABLE IF NOT EXISTS users(
                    user_id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    phone_number INTEGER,
                    email VARCHAR(255),
                    drivers_license_photo VARCHAR(255),
                    verified BOOLEAN,
                    verified_on DATE,
                    username VARCHAR(255),
                    password VARCHAR(255));`);
    pool.query(`CREATE TABLE IF NOT EXISTS reservations(
                    reservation_id SERIAL PRIMARY KEY,
                    host_id SERIAL,
                    stasher_id SERIAL,
                    listing_id SERIAL,
                    accepted BOOLEAN,
                    accepted_on DATE,
                    requested_on DATE[],
                    dates_requested DATE[]);`);
    pool.query(`CREATE TYPE AMENITY as ENUM ('Pest Controlled', 'Fire Alarm System', 'Smoke Free',
                                             'Pet Free', 'Access to Elevator', 'Ground Floor',
                                             'Climate Controlled', 'Private Storage', 'Party Free');
                CREATE TYPE SPACETYPE as ENUM ('Basement', 'Closet', 'Common Living Space', 'Bedroom',
                                               'Cabinet', 'Unoccupied Room', 'Other');
                CREATE TABLE IF NOT EXISTS listings(
                    listing_id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    host_id SERIAL,
                    dates_available DATE[],
                    price DECIMAL,
                    description VARCHAR(255),
                    amenities AMENITY[],
                    space_type SPACETYPE,
                    address VARCHAR(255),
                    city VARCHAR(255),
                    zip_code VARCHAR(255),
                    state VARCHAR(255),
                    editable BOOLEAN,
                    created_on DATE,
                    space_available INTEGER[]);`);
}
initializeDatabase();
const app = (0, express_1.default)();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(8080, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:8080`);
});
//# sourceMappingURL=index.js.map