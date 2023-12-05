import {getEmotionIdFromFilename} from "../../services/videoMetaDataHelper";
import {getValenceFromEmotionId} from "nexa-js-sentimotion-mapper";
import {NEUTRAL_VALENCE} from "../../config";

function hasMatchingValence(key, targetValence) {
    const emotionId = getEmotionIdFromFilename(key);
    const valence = getValenceFromEmotionId(emotionId);
    return (valence === targetValence || valence === NEUTRAL_VALENCE)
}

export function filterOnValence(frequencyDict, targetValence) {
    // TODO: Need to step through each value array in the dictionary. 
    // for (Object.entries(frequencyDict))


    return Object.fromEntries(
        Object.entries(frequencyDict).filter(([key, value]) =>
            hasMatchingValence(key, targetValence)
        )
    );
}