const lodash = require('lodash');


function getMinCountFilenames(filenameCounts, retrieveCount) {
    // Collect all filenames that have the minimum count
    return Object.entries(filenameCounts).reduce((acc, [filename, count]) => {
        if (count === retrieveCount) {
            acc.push(filename);
        }
        return acc;
    }, []);
}

function getMinCountVideoData(filenameCounts, videoData, retrieveCount) {
    return videoData.filter(
        (row) => getMinCountFilenames(filenameCounts, retrieveCount).includes(row.filename)
    )
}

function getEmotionsInSample(videoData) {
    return lodash.uniq(videoData.map((row) => row.emotion_id));
}

function getSamplingData(filenameCounts, videoData) {
    // Find the minimum count
    let minCount = Math.min(...Object.values(filenameCounts));
    const minCountVideoData = getMinCountVideoData(filenameCounts, videoData, minCount)
    return minCountVideoData
    //
    // if (getEmotionsInSample(minCountVideoData).length === 44) {
    //     return minCountVideoData
    // } else {
    //     return getMinCountVideoData(filenameCounts, videoData, minCount+1)
    // }
}


/**
 * This function performs repeated sampling three times over while not producing any duplicate samples
 * @param {array} videoData an array with video file names and their corresponding meta information
 * @param filenameCounts
 * @returns {array} of video file names.
 */
export function repeatedSampling(videoData, filenameCounts) {

    console.log("in repeatedSampling")

    const videoDataMinCount = getSamplingData(filenameCounts, videoData)

    console.log(videoDataMinCount)

    const samples1 = sampler(videoDataMinCount);

    // Filter videoData to exclude rows that match samples1
    const videoDataFiltered1 = videoData.filter((row) => !samples1.includes(row.filename));

    // Obtain samples2 based on the filtered data
    const samples2 = sampler(videoDataFiltered1);

    // Filter videoDataFiltered1 to exclude rows that match samples2 for the third sampling
    const videoDataFiltered2 = videoDataFiltered1.filter((row) => !samples2.includes(row.filename));

    // Obtain samples3 based on the second filtered data
    const samples3 = sampler(videoDataFiltered2);

    return samples1.concat(samples2, samples3);
}


export function sampler(df) {
    // Get unique categories (emotion_id)
    const categories = lodash.uniq(df.map((row) => row.emotion_id));

    console.log(categories)


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