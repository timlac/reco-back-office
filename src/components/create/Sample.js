const lodash = require('lodash');


/**
 * This function performs repeated sampling three times over while not producing any duplicate samples
 * @param {array} videoData an array with video file names and their corresponding meta information
 * @returns {array} of video file names.
 */
export function repeatedSampling(videoData) {

    const samples1 = sample(videoData);

    // Filter videoData to exclude rows that match samples1
    const videoDataFiltered1 = videoData.filter((row) => !samples1.includes(row.filename));

    // Obtain samples2 based on the filtered data
    const samples2 = sample(videoDataFiltered1);

    // Filter videoDataFiltered1 to exclude rows that match samples2 for the third sampling
    const videoDataFiltered2 = videoDataFiltered1.filter((row) => !samples2.includes(row.filename));

    // Obtain samples3 based on the second filtered data
    const samples3 = sample(videoDataFiltered2);

    return samples1.concat(samples2, samples3);
}


export function sample(df) {
    // Get unique categories (emotion_id)
    const categories = lodash.uniq(df.map((row) => row.emotion_id));

    // Categorize videos based on all category combinations
    const categoryVideos = {};
    categories.forEach((category) => {
        categoryVideos[category] = [];
    });

    df.forEach((row) => {
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