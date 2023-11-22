

export function FrequencyCalculator(existingUsers, videoData) {

    // Initialize an empty object to store the filename dictionary
    const filenameCounts = {};

    // Iterate through the dataArray
    for (const item of videoData) {
        // Extract the filename from each item
        const filename = item.filename;
        // Add the filename as a key to the filenameDictionary with an initial value of 0
        filenameCounts[filename] = 0;
    }

    // Iterate through the jsonData array
    for (const item of existingUsers) {
        // Check if the 'items' property is an array
        if (Array.isArray(item.items)) {
            // Iterate through the 'items' array
            for (const itemData of item.items) {
                // Extract the 'filename' property from each itemData
                const filename = itemData.filename;

                // Update the filename count in the filenameCounts object
                if (filename in filenameCounts) {
                    filenameCounts[filename]++;
                } else {
                    filenameCounts[filename] = 1;
                }
            }
        }
    }

    // Now, filenameCounts contains the counts of each filename
    console.log(filenameCounts);
    return filenameCounts
}


export function CreateFrequencyDict(filenameCounts) {
    return Object.entries(filenameCounts).reduce((acc, [filename, count]) => {
        // If the count key doesn't exist in the accumulator, initialize it with an empty array
        if (!acc[count]) {
            acc[count] = [];
        }

        // Add the filename to the array for this count
        acc[count].push(filename);

        return acc;
    }, {});
}