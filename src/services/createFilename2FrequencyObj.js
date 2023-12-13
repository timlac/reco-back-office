import {filename2MetaData, getEmotionIdFromFilename} from "./videoMetaDataHelper";
import {getValenceFromEmotionId} from "nexa-js-sentimotion-mapper";
import {NEGATIVE_VALENCE, NEUTRAL_VALENCE, POSITIVE_VALENCE} from "../config";


export function createFilename2FrequencyObj(users) {

    // Initialize an object to store the filename dictionaries
    const ret = initializeFilename2FrequencyObj()

    // Iterate through the users array
    for (const user of users) {
        // Check if the 'items' property is an array
        if (Array.isArray(user.survey_items)) {
            // Iterate through the 'items' array
            for (const itemData of user.survey_items) {
                // Extract the 'filename' property from each itemData
                const filename = itemData.filename;
                try {
                    updateFilename2Frequencies(filename, ret)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    return ret
}


function updateFilename2Frequencies(filename, filename2FrequencyObjects) {
    updateFilenameCount(filename, filename2FrequencyObjects.allEmotions)

    const valence = getValence(filename)

    switch (valence) {
        case NEUTRAL_VALENCE:
            updateFilenameCount(filename, filename2FrequencyObjects.positiveEmotions)
            updateFilenameCount(filename, filename2FrequencyObjects.negativeEmotions)
            break;
        case POSITIVE_VALENCE:
            updateFilenameCount(filename, filename2FrequencyObjects.positiveEmotions)
            break;
        case NEGATIVE_VALENCE:
            updateFilenameCount(filename, filename2FrequencyObjects.negativeEmotions)
            break;
        default:
            throw new Error(`Invalid valence: ${valence}`);
    }
}

function getValence(filename) {

    const emotionId = getEmotionIdFromFilename(filename);
    return getValenceFromEmotionId(emotionId);
}

function updateFilenameCount(filename, filename2Frequency) {
    // Update the filename count in the ret object
    if (filename in filename2Frequency) {
        filename2Frequency[filename]++;
    } else {
        filename2Frequency[filename] = 1;
    }
}

function initializeFilename2FrequencyObj() {
    // Initialize an object to store the filename dictionaries
    const ret = {
        allEmotions: {},
        positiveEmotions: {},
        negativeEmotions: {}
    };

    for (const filename of Object.keys(filename2MetaData)) {
        ret.allEmotions[filename] = 0;
        const valence = getValence(filename)
        switch (valence) {
            case NEUTRAL_VALENCE:
                ret.positiveEmotions[filename] = 0;
                ret.negativeEmotions[filename] = 0;
                break;
            case POSITIVE_VALENCE:
                ret.positiveEmotions[filename] = 0;
                break;
            case NEGATIVE_VALENCE:
                ret.negativeEmotions[filename] = 0;
                break;
            default:
                throw new Error(`Invalid valence: ${valence}`);
        }
    }
    return ret
}




