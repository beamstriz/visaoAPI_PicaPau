import { expr } from "./app";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.API_PORT;



expr.get('/', (req, res) => res.send('Hello World 100!'))

expr.listen(PORT, () => console.log("Visao runing in PORT " + PORT));