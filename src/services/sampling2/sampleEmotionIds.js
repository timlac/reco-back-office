import _ from 'lodash';
import {mapFilenamesToEmotionIds} from "../metadataManager";


export function getAllEmotionIds(frequency2Filename) {
    const allFilenames = [];

    Object.values(frequency2Filename).forEach(filenames => {
        allFilenames.push(...filenames);
    });

    return mapFilenamesToEmotionIds(allFilenames);
}

export function sampleEmotionIds(allEmotionIds, sampleSize) {
    // Remove duplicates to ensure uniqueness
    const uniqueEmotionIds = Array.from(new Set(allEmotionIds));

    // Sample 'sampleSize' unique emotion IDs
    return _.sampleSize(uniqueEmotionIds, sampleSize);
}