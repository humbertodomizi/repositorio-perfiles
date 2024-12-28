import { Sequelize } from "sequelize";

process.loadEnvFile();

//process.env.DB_NAME;
const DB_NAME = admin_ins_db;
//process.env.DB_USER;
const DB_USER = "root";
//process.env.DB_PASS;
const DB_PASS = "";
//process.env.DB_HOST;
const DB_HOST = localhost;

const sequelize = new sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql",
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected successfully to database");

    } catch (error) {
        console.log("Failed to connect to database", error);
    };
};

export { connectDb };