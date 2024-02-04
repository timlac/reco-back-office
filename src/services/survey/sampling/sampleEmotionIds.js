import _ from 'lodash';
import {mapFilenamesToEmotionIds} from "../../metadataManager";


export function sampleEmotionIds(frequency2Filename, sampleSize) {
    // Step 1: Sort frequencies in ascending order
    const sortedFrequencies = Object.keys(frequency2Filename).sort((a, b) => a - b);

    let collectedFilenames = [];

    // Step 2: Collect filenames starting from the lowest frequency
    for (const frequency of sortedFrequencies) {
        collectedFilenames = collectedFilenames.concat(frequency2Filename[frequency]);
        const emotionIds = mapFilenamesToEmotionIds(collectedFilenames)

        const uniqueIds = new Set(emotionIds)

        // Break the loop if we've collected enough unique emotion IDs
        if (uniqueIds.size >= sampleSize) break;
    }

    // Extract unique emotion IDs again in case the loop didn't break (covers all frequencies)
    const finalEmotionIds = mapFilenamesToEmotionIds(collectedFilenames);
    const uniqueFinalIds = Array.from(new Set(finalEmotionIds));

    // Sample 'sampleSize' unique emotion IDs or use all if fewer than sampleSize
    return _.sampleSize(uniqueFinalIds, Math.min(sampleSize, uniqueFinalIds.length));
}
