import {getEmotionIdFromFilename, mapFilenamesToEmotionIds} from "../../services/videoMetaDataHelper";

import {getValenceFromEmotionId} from 'nexa-js-sentimotion-mapper';
import {NEGATIVE_VALENCE, NEUTRAL_VALENCE, POSITIVE_VALENCE} from "../../config";


const lodash = require('lodash');


function hasMatchingValence(key, targetValence) {
    const emotionId = getEmotionIdFromFilename(key);
    const valence = getValenceFromEmotionId(emotionId);
    return (valence === targetValence || valence === NEUTRAL_VALENCE)
}

/**
 * This function performs repeated sampling three times over while not producing any duplicate samples
 * @param frequencyDict
 * @returns {array} of video file names.
 */
export function repeatedSampling(frequencyDict, valence) {

    const frequencyDictValence = Object.fromEntries(
        Object.entries(frequencyDict).filter(([key, value]) =>
            hasMatchingValence(key, valence)
        )
    );
    console.log("in repeated sampling")
    const totalSamplesNeeded = 132; // Adjust this number as needed
    const allSamples = getUniqueSamples(frequencyDictValence, totalSamplesNeeded);

    return allSamples
}

function getUniqueSamples(frequencyDict, totalSamplesNeeded) {

    // Get unique emotions (emotion_id)
    const uniqueEmotions = lodash.uniq(mapFilenamesToEmotionIds(Object.keys(frequencyDict)));

    console.log("in get unique samples")

    const sampledFilenames = new Set();
    let results = [];

    while (results.length < totalSamplesNeeded) {

        console.log("sampledFilenames")
        console.log(sampledFilenames)

        // find the minimum key
        const minCount = Math.min(...Object.keys(frequencyDict).map(Number));

        console.log("minCount")
        console.log(minCount)


        // Get the filenames associated with the minimum count
        const filenamesWithMinCount = frequencyDict[minCount];

        // filter out already sampled filenames
        const remainingData = filenamesWithMinCount.filter(filename => !sampledFilenames.has(filename));

        console.log("remainingData")
        console.log(remainingData)

        // sample on the selected data
        let newSamples = getSample(remainingData);

        console.log("new samples")
        console.log(newSamples)
        // These new samples will not be long enough, maybe I can just collect some more here.

        console.log(newSamples.length)

        if (newSamples.length < uniqueEmotions.length){
            const moreFilenames = frequencyDict[minCount + 1]






            const remainingData = moreFilenames.filter(filename => !sampledFilenames.has(filename));
            const fillerSamples = getSample(remainingData);


            // A list of all emotions in newSamples
            const existingEmotionIds = new Set( mapFilenamesToEmotionIds(newSamples) )

            // a dict of {filename: emotion} for all filler samples
            const fillerSamplesWithEmotions = {}
            for (const filename of fillerSamples){
                fillerSamplesWithEmotions[filename] = getEmotionIdFromFilename(filename)
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
            sampledFilenames.add(sample);
            results.push(sample);
        });
    }

    return results;
}

/**
 * Samples on video per unique emotion in filenames
 * E.g. if there are 11 unique emotions then 11 videos will be sampled...
 */
export function getSample(filenames, maxSamples) {

    // Get unique emotions (emotion_id)
    const emotions = lodash.uniq(mapFilenamesToEmotionIds(filenames));

    // Create dictionary of {emotion: [filenames]}
    const emotionFilenames = {};
    filenames.forEach((filename) => {
        const emotion = getEmotionIdFromFilename(filename)

        // Check if key already exist
        if (emotion in emotionFilenames){
            // push filename to key if it does exist
            emotionFilenames[emotion].push(filename);
        } else {
            // initialize key with current filename if it does not exist
            emotionFilenames[emotion] = [filename];
        }
    });

    // Initialize an empty array to store the final set of videos
    const ret = [];

    // sample one video per emotion
    emotions.forEach((emotion) => {

        // stop sampling if there are already enough samples
        if (ret.length >= maxSamples) {
            return ret
        }

        const videos = emotionFilenames[emotion];

        if (videos.length > 0) {
            const selectedVideo = lodash.sample(videos);
            ret.push(selectedVideo);
        } else {
            console.log("Something went wrong no videos found for emotion in getSample")
        }
    });

    return ret;
}