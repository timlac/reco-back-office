import {emotionScales} from "../config";

export function getScales(){
    return emotionScales.map(item => ({ ...item, reply: {} }));
}