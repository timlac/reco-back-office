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

    // if (emotionCategories.length < 44) {
    //     // Need to retrieve fillers from higher up, but just from emotions not in current set
    //     // Get the filenames associated with the minimum count
    //     const filenamesWithHigherCount = frequencyDict[minCount + 1];
    //     const videoDataHigherCount = videoData.filter((row) => filenamesWithHigherCount.includes(row.filename));
    // }

    const totalSamplesNeeded = 132; // Adjust this number as needed
    const allSamples = getUniqueSamples(videoData, frequencyDict, totalSamplesNeeded);

    return allSamples
}

function getUniqueSamples(videoData, frequencyDict, totalSamples) {
    const sampledSet = new Set();
    let results = [];

    while (results.length < totalSamples) {

        // and find the minimum key
        const minCount = Math.min(...Object.keys(frequencyDict).map(Number));

        // Get the filenames associated with the minimum count
        const filenamesWithMinCount = frequencyDict[minCount];

        const videoDataMinCount = videoData.filter((row) => filenamesWithMinCount.includes(row.filename));


        const remainingData = videoDataMinCount.filter(row => !sampledSet.has(row.filename));
        let newSamples = getSample(remainingData);

        console.log("new samples")
        console.log(newSamples)
        // These new samples will not be long enough, maybe I can just collect some more here.

        if (newSamples.length < 44){
            const moreFilenames = frequencyDict[minCount + 1]

            const remainingData = moreFilenames.filter(row => !sampledSet.has(row.filename));
            const fillerSamples = getSample(remainingData);

            // TODO: The current problem is that newSamples is just list of filenames, and as such does not have any emotion ids.
            // I need to either change the sampling method such that it returns the metadata objects.
            // Or I can create some function that retrieves the emotions or the metadata in general from the videoData object.
            // This might be a good idea actually it doesn't really make sense to pass around the metadata object everywhere the way I do now. 

            // Assuming each video object has a unique identifier in the 'id' property
            const existingEmotionIds = new Set(newSamples.map(video => video.emotion_id));

            console.log(existingEmotionIds)

            newSamples = fillerSamples.filter(video => !existingEmotionIds.has(video.emotion_id))
        }

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
    // Maybe I should try to sample the complete video metadata instead of just the video ids...
    // or create some kind of general method to retrieve the metadata



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