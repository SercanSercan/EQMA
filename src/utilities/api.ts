import axios from "axios";
import { IEarthQuakeLog } from "./interfaces.ts";

export const getEqLogs = async () => {
    const response = await axios.get<IEarthQuakeLog[]>(
        'https://ug2cprzjbd.execute-api.eu-north-1.amazonaws.com/eqmaprod/get-eq-logs'
    );

    return response.data;
};

export const subscribeToMajorEQ = async (email: string) => {
    const response = await axios.post(
        'https://573uo0cgxd.execute-api.eu-north-1.amazonaws.com/postAPISubscribeToMajorEQ/subscribeToMajorEQ',
        {
            email: email,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
}
