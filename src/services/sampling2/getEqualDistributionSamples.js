import {getFilenamesForEmotion} from "./getFilenamesForEmotion";

export function getEqualDistributionSamples(frequency2Filename, totalSamples, emotions) {
    // Calculate the number of samples per emotion for equal distribution
    const samplesPerEmotion = Math.floor(totalSamples / emotions.length);
    let samplesCollected = 0;

    // Initialize an array to hold all selected filenames
    const selectedFilenames = [];

    // Retrieve samples for each emotion
    for (const emotion of emotions) {
        // Determine the number of samples to fetch for this emotion
        let count = samplesPerEmotion;

        // For the last emotion, adjust the count to fill up to the totalSamples if needed
        if (emotion === emotions[emotions.length - 1]) {
            count = totalSamples - samplesCollected;
        }

        const filenames = getFilenamesForEmotion(frequency2Filename, emotion, count);
        selectedFilenames.push(...filenames);
        samplesCollected += filenames.length;
    }

    return selectedFilenames;
}
