import {getEmotionIdFromFilename, mapFilenamesToEmotionIds} from "../../services/videoMetaDataHelper";
import {getSampleSet} from "./GetSampleSet";

export function getUserSamples(frequencyDict, totalSamplesNeeded=132) {

    // Get unique emotions (emotion_id)
    const numberOfUniqueEmotions = new Set( mapFilenamesToEmotionIds(Object.keys(frequencyDict) )).size

    const retSamples = new Set();

    while (retSamples.size < totalSamplesNeeded) {

        // find the minimum key
        let minCount = Math.min(...Object.keys(frequencyDict).map(Number));
        // sample on the selected data
        let newSamples = getSampleSet( filterDuplicateFilenames( frequencyDict[minCount], retSamples ) );

        let sampledEmotionIds = new Set();
        while (newSamples.length < numberOfUniqueEmotions){
            minCount += 1
            // A list of all emotions in newSamples
            sampledEmotionIds = new Set([...sampledEmotionIds, ...mapFilenamesToEmotionIds(newSamples)])

            // sample the remaining data
            const fillerSamples = getSampleSet( filterDuplicateFilenamesAndEmotions(
                frequencyDict[minCount],
                retSamples,
                sampledEmotionIds)
            );
            // concat filler samples to new samples
            newSamples = newSamples.concat(fillerSamples)
        }

        newSamples.forEach(sample => {
            retSamples.add(sample);
        });
    }

    return [...retSamples];
}

function filterDuplicateFilenamesAndEmotions(filenames, retSamples, sampledEmotionIds) {
    return filenames.filter(filename =>
        !retSamples.has(filename) &&
        !sampledEmotionIds.has(getEmotionIdFromFilename(filename)))
}

function filterDuplicateFilenames(filenames, retSamples) {
    return filenames.filter(filename => !retSamples.has(filename))
}
