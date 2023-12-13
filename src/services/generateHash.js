import {sha256} from 'crypto-hash';
import { v4 as uuidv4 } from 'uuid';


export async function generateHash() {
    try {
        const uniqueId = uuidv4()
        return sha256(uniqueId)
    } catch (error) {
        console.error('Error generating hash:', error);
        return null;
    }
}