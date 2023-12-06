
export function createFrequency2FilenameObj(Filename2FrequencyObj) {
    return {
        allEmotions: invertFilename2Frequency(Filename2FrequencyObj.allEmotions),
        positiveEmotions: invertFilename2Frequency(Filename2FrequencyObj.positiveEmotions),
        negativeEmotions: invertFilename2Frequency(Filename2FrequencyObj.negativeEmotions)
    }
}

function invertFilename2Frequency(filename2Frequency) {
    return Object.entries(filename2Frequency).reduce((acc, [filename, count]) => {
        // If the count key doesn't exist in the accumulator, initialize it with an empty array
        if (!acc[count]) {
            acc[count] = [];
        }
        // Add the filename to the array for this count
        acc[count].push(filename);
        return acc;
    }, {});
}
