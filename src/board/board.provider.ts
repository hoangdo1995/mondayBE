import { Connection } from "mongoose";
import { BoardSchema } from "./board.schema";

export const BoardProvider = [
    {
        provide:'BOARD_MODEL',
        useFactory:(connection: Connection)=> connection.model('board',BoardSchema),
        inject:['DATABASE_CONNECTION']
    }
];