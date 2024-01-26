import filename2MetaData from "../../data/filename2metadata.json";

export function createFilename2Frequency(surveys) {

    // Initialize an object to store the filename dictionaries
    const filename2Frequency = {}
    for (const filename of Object.keys(filename2MetaData)) {
        filename2Frequency[filename] = 0;
    }

    // Iterate through the surveys array
    for (const survey of surveys) {
        // Check if the 'items' property is an array
        if (Array.isArray(survey.survey_items)) {
            // Iterate through the 'items' array
            for (const itemData of survey.survey_items) {
                // Extract the 'filename' property from each itemData
                const filename = itemData.filename;
                try {
                    if (filename in filename2Frequency) {
                        filename2Frequency[filename]++;
                    } else {
                        filename2Frequency[filename] = 1;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    return filename2Frequency
}

export function invertFilename2Frequency(filename2Frequency) {
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




