import _ from "lodash";


export function getRandomlyDistributedSamples(frequency2Filename, totalSamples) {
        // Initialize an array to hold the selected filenames
    const selectedFilenames = [];

    // Iterate over frequencies starting from the lowest
    const frequencies = Object.keys(frequency2Filename).map(Number).sort((a, b) => a - b);

    for (const freq of frequencies) {

        let filenames = frequency2Filename[freq]

        filenames = _.shuffle(filenames)
        // TODO
        // shuffle here

        // Add filenames to the selected list, up to the desired count
        for (const filename of filenames) {

            if (selectedFilenames.length < totalSamples) {
                selectedFilenames.push(filename);
            } else {
                break; // Stop if we've reached the desired count
            }
        }
    }
    return _.shuffle(selectedFilenames);
}