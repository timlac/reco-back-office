import {ALL, NEGATIVE_VALENCE, NEUTRAL_VALENCE, PILOT, POSITIVE_VALENCE} from "../config";
import {getEmotionIdFromFilename} from "./videoMetaDataHelper";
import {getValenceFromEmotionId} from "nexa-js-sentimotion-mapper";
import pilotFilenames from "../data/pilot_filenames.json";


function getValence(filename) {
    const emotionId = getEmotionIdFromFilename(filename);
    return getValenceFromEmotionId(emotionId);
}

function filterByValence(frequency2Filename, targetValence) {
    const filtered = {};

    // Iterate through the keys of the object
    Object.keys(frequency2Filename).forEach((key) => {
        const filteredFiles = frequency2Filename[key].filter((filename) => {
            const valence = getValence(filename)
            return valence === (targetValence || NEUTRAL_VALENCE);
        });
        // Add the key-value pair to the filtered object if there are filtered files
        if (filteredFiles.length > 0) {
            filtered[key] = filteredFiles;
        }
    });
    return filtered;
}


function filterByFilenames(frequency2Filename, filenames) {
    const filtered = {};

    // Iterate through the keys of the object
    Object.keys(frequency2Filename).forEach((key) => {
        const filteredFiles = frequency2Filename[key].filter((filename) => {
            return filenames.includes(filename)
        });
        // Add the key-value pair to the filtered object if there are filtered files
        if (filteredFiles.length > 0) {
            filtered[key] = filteredFiles;
        }
    });
    return filtered;
}


export function filterFrequency2Filename(frequency2Filename, filterOn) {
    switch (filterOn) {
        case POSITIVE_VALENCE:
        case NEGATIVE_VALENCE:
            return filterByValence(frequency2Filename, filterOn)
        case ALL:
            return frequency2Filename
        case PILOT:
            return filterByFilenames(frequency2Filename, pilotFilenames)
        default:
            console.log("no valid option for valence selected in create user")
        }
}