import {getFilesForEmotionId} from "./getFilesForEmotionId";
import {getAllEmotionIds, sampleEmotionIds} from "./sampleEmotionIds";



export function getEqualDistributionSamples(frequency2Filename, totalSamples, numberOfEmotions) {

    const allEmotionIds = getAllEmotionIds(frequency2Filename)
    let emotionIds = null

    if (numberOfEmotions < allEmotionIds) {
        emotionIds = sampleEmotionIds(allEmotionIds)
    } else {
        emotionIds = allEmotionIds
    }

    // Calculate the number of samples per emotion for equal distribution
    const samplesPerEmotion = Math.floor(totalSamples / emotionIds.length);
    let samplesCollected = 0;

    // Initialize an array to hold all selected filenames
    const selectedFilenames = [];

    // Retrieve samples for each emotion
    for (const emotion of emotionIds) {
        // Determine the number of samples to fetch for this emotion
        let count = samplesPerEmotion;

        // For the last emotion, adjust the count to fill up to the totalSamples if needed
        if (emotion === emotionIds[emotionIds.length - 1]) {
            count = totalSamples - samplesCollected;
        }

        const filenames = getFilesForEmotionId(frequency2Filename, emotion, count);
        selectedFilenames.push(...filenames);
        samplesCollected += filenames.length;
    }

    return selectedFilenames;
}
