const lodash = require('lodash');

//
// function getMinCountVideoData(filenameCounts, videoData) {
//     return videoData.filter(
//         (row) => getMinCountFilenames(filenameCounts).includes(row.filename)
//     )
// }
//
// function getEmotionsInSample(videoData) {
//     return lodash.uniq(videoData.map((row) => row.emotion_id));
// }


/**
 * This function performs repeated sampling three times over while not producing any duplicate samples
 * @param {array} videoData an array with video file names and their corresponding meta information
 * @param frequencyDict
 * @returns {array} of video file names.
 */
export function repeatedSampling(videoData, frequencyDict) {

    // Convert the keys to numbers (since they are likely string representations of numbers)
    // and find the minimum key
    const minCount = Math.min(...Object.keys(frequencyDict).map(Number));

    // Get the filenames associated with the minimum count
    const filenamesWithMinCount = frequencyDict[minCount];

    console.log("filenamesWithMinCount")
    console.log(filenamesWithMinCount)


    const videoDataMinCount= videoData.filter((row) => filenamesWithMinCount.includes(row.filename));

    const totalSamplesNeeded = 132; // Adjust this number as needed
    const allSamples = getUniqueSamples(videoDataMinCount, totalSamplesNeeded);

    return allSamples

    // console.log("videoDataMinCount")
    // console.log(videoDataMinCount)
    //
    // const samples1 = getSample(videoDataMinCount);
    //
    // // Filter videoData to exclude rows that match samples1
    // const videoDataFiltered1 = videoDataMinCount.filter((row) => !samples1.includes(row.filename));
    //
    // // Obtain samples2 based on the filtered data
    // const samples2 = getSample(videoDataFiltered1);
    //
    // // Filter videoDataFiltered1 to exclude rows that match samples2 for the third sampling
    // const videoDataFiltered2 = videoDataFiltered1.filter((row) => !samples2.includes(row.filename));
    //
    // // Obtain samples3 based on the second filtered data
    // const samples3 = getSample(videoDataFiltered2);

    // return samples1.concat(samples2, samples3);
}

function getUniqueSamples(data, totalSamples) {
    const sampledSet = new Set();
    let results = [];

    while (results.length < totalSamples) {
        const remainingData = data.filter(row => !sampledSet.has(row.filename));
        const newSamples = getSample(remainingData);
        newSamples.forEach(sample => {
            sampledSet.add(sample);
            results.push(sample);
        });


        console.log(newSamples)
        console.log(sampledSet)

        // Break if there's no more data left to sample
        if (remainingData.length === 0) {
            break;
        }
    }

    return results;
}

export function getSample(videoDataToSample) {
    // Get unique categories (emotion_id)
    const categories = lodash.uniq(videoDataToSample.map((row) => row.emotion_id));

    // Categorize videos based on all category combinations
    const categoryVideos = {};
    categories.forEach((category) => {
        categoryVideos[category] = [];
    });

    videoDataToSample.forEach((row) => {
        const category = row.emotion_id;
        categoryVideos[category].push(row.filename);
    });

    // Initialize an empty array to store the final set of 132 videos for each rater
    const ret = [];

    // Stratified sampling within each category combination
    categories.forEach((category) => {
        const videos = categoryVideos[category];

        if (videos.length > 0) {
            const selectedVideo = lodash.sample(videos);
            ret.push(selectedVideo);
        }
    });

    return ret;
}