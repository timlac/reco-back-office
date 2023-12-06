import {getEmotionIdFromFilename, mapFilenamesToEmotionIds} from "../../services/videoMetaDataHelper";
const lodash = require('lodash');

// Maybe create a general filename to emotion dict when the app starts up?
function createFilename2EmotionDict(filenames) {
    // Create dictionary of {emotion: [filenames]}
    const ret = {};
    filenames.forEach((filename) => {
        const emotion = getEmotionIdFromFilename(filename)

        // Check if key already exist
        if (emotion in ret){
            // push filename to key if it does exist
            ret[emotion].push(filename);
        } else {
            // initialize key with current filename if it does not exist
            ret[emotion] = [filename];
        }
    })
    return ret
}


/**
 * Samples on video per unique emotion in filenames
 * E.g. if there are 11 unique emotions then 11 videos will be sampled...
 */
export function getSampleSet(filenames, maxSamples) {

    // Get unique uniqueEmotions (emotion_id)
    const uniqueEmotions = new Set ( mapFilenamesToEmotionIds(filenames) )

    console.log("uniqueEmotions: ", uniqueEmotions)

    // Create dictionary of {emotion: [filenames]}
    const emotion2Filenames = createFilename2EmotionDict(filenames)

    // Initialize an empty array to store the final set of videos
    const ret = [];

    // sample one video per emotion
    uniqueEmotions.forEach((emotion) => {

        // stop sampling if there are already enough samples
        if (ret.length >= maxSamples) {
            return ret
        }

        const videos = emotion2Filenames[emotion];

        if (videos.length > 0) {
            const selectedVideo = lodash.sample(videos);
            ret.push(selectedVideo);
        } else {
            console.log("Something went wrong no videos found for emotion in getSampleSet")
        }
    });
    return ret
}