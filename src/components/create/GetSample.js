import {getEmotionFromFilename, mapFilenamesToEmotions} from "../../services/videoMetaDataHelper";

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
 * @param frequencyDict
 * @returns {array} of video file names.
 */
export function repeatedSampling(frequencyDict) {

    console.log("in repeated sampling")

    // if (emotionCategories.length < 44) {
    //     // Need to retrieve fillers from higher up, but just from emotions not in current set
    //     // Get the filenames associated with the minimum count
    //     const filenamesWithHigherCount = frequencyDict[minCount + 1];
    //     const videoDataHigherCount = videoData.filter((row) => filenamesWithHigherCount.includes(row.filename));
    // }

    const totalSamplesNeeded = 129; // Adjust this number as needed
    const allSamples = getUniqueSamples(frequencyDict, totalSamplesNeeded);

    return allSamples
}

function getUniqueSamples(frequencyDict, totalSamples) {

    console.log("in get unique samples")

    const sampledSet = new Set();
    let results = [];

    while (results.length < totalSamples) {

        console.log("sampledSet")
        console.log(sampledSet)

        // find the minimum key
        const minCount = Math.min(...Object.keys(frequencyDict).map(Number));

        console.log("minCount")
        console.log(minCount)


        // Get the filenames associated with the minimum count
        const filenamesWithMinCount = frequencyDict[minCount];

        // filter out sampled filenames
        const remainingData = filenamesWithMinCount.filter(filename => !sampledSet.has(filename));

        console.log("remainingData")
        console.log(remainingData)

        // sample on the selected data
        let newSamples = getSample(remainingData);

        console.log("new samples")
        console.log(newSamples)
        // These new samples will not be long enough, maybe I can just collect some more here.

        console.log(newSamples.length)

        if (newSamples.length < 43){
            const moreFilenames = frequencyDict[minCount + 1]

            const remainingData = moreFilenames.filter(filename => !sampledSet.has(filename));
            const fillerSamples = getSample(remainingData);


            // A list of all emotions in newSamples
            const existingEmotionIds = new Set( mapFilenamesToEmotions(newSamples) )

            // a dict of {filename: emotion} for all filler samples
            const fillerSamplesWithEmotions = {}
            for (const filename of fillerSamples){
                fillerSamplesWithEmotions[filename] = getEmotionFromFilename(filename)
            }

            // want to get all filenames in fillerSamplesWithEmotions, except the ones where key is in existingEmotionIds

            const filteredFillerSamples = []
            for (let filename in fillerSamplesWithEmotions) {
                if (!existingEmotionIds.has(fillerSamplesWithEmotions[filename])) {
                    filteredFillerSamples.push(filename)
                }
            }

            console.log("fillerFilenames")
            console.log(filteredFillerSamples)


            newSamples = newSamples.concat(filteredFillerSamples)
            console.log("new samples after concat")
            console.log(newSamples)
        }

        newSamples.forEach(sample => {
            sampledSet.add(sample);
            results.push(sample);
        });
    }

    return results;
}

export function getSample(filenames) {
    // Maybe I should try to sample the complete video metadata instead of just the video ids...
    // or create some kind of general method to retrieve the metadata

    // Get unique emotions (emotion_id)
    const emotions = lodash.uniq(mapFilenamesToEmotions(filenames));


    // Create dictionary of {emotion: [filenames]}
    const emotionFilenames = {};
    filenames.forEach((filename) => {
        const emotion = getEmotionFromFilename(filename)

        // Check if key already exist
        if (emotion in emotionFilenames){
            // push filename to key if it does exist
            emotionFilenames[emotion].push(filename);
        } else {
            // initialize key with current filename if it does not exist
            emotionFilenames[emotion] = [filename];
        }
    });

    // Initialize an empty array to store the final set of 44 videos
    const ret = [];

    // sample one video per emotion
    emotions.forEach((emotion) => {
        const videos = emotionFilenames[emotion];

        if (videos.length > 0) {
            const selectedVideo = lodash.sample(videos);
            ret.push(selectedVideo);
        }
    });

    return ret;
}