import {getEmotionIdFromFilename} from "../metadataManager";

export function getFilesForEmotionId(frequency2Filename, emotion, count) {
    // Initialize an array to hold the selected filenames
    const selectedFilenames = [];

    // Iterate over frequencies starting from the lowest
    const frequencies = Object.keys(frequency2Filename).map(Number).sort((a, b) => a - b);

    for (const freq of frequencies) {
        const filenames = frequency2Filename[freq].filter(filename =>
            getEmotionIdFromFilename(filename) === emotion
        );

        // Add filenames to the selected list, up to the desired count
        for (const filename of filenames) {
            if (selectedFilenames.length < count) {
                selectedFilenames.push(filename);
            } else {
                break; // Stop if we've reached the desired count
            }
        }

        // Check if we've collected enough filenames
        if (selectedFilenames.length >= count) break;
    }

    return selectedFilenames;
}
