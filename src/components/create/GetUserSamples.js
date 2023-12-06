import {
    getEmotionIdFromFilename,
    mapFilenamesToEmotionIds
} from "../../services/videoMetaDataHelper";
import {getSampleSet} from "./GetSampleSet";

const lodash = require('lodash');


function getUniqueEmotionIds(frequency2Filename) {
    let uniqueEmotionIds = new Set()
    for (const filenames of Object.values(frequency2Filename)) {
        console.log(mapFilenamesToEmotionIds(filenames))
        uniqueEmotionIds = new Set([...uniqueEmotionIds, ...mapFilenamesToEmotionIds(filenames)])
    }
    return uniqueEmotionIds
}

// set numberOfUniqueEmotionIds manually
// create a frozen set of the first set of unique emotions sampled
// filter out all filenames that doesn't correspond to these emotions
// proceed sampling.
// Since I'm working with a smaller dataset we might run out of samples...
// set the totalSamplesNeeded to some smaller number for the time being.


function filterFrequency2Filename(frequency2Filename, emotionIdsToFilterBy) {
    console.log("emotionIdsToFilterBy type: ", emotionIdsToFilterBy)


    const ret = {}
    for (const [freq, filenames] of Object.entries(frequency2Filename)) {

        console.log("filenames")
        console.log(filenames)

        ret[freq] = filenames.filter(
            (filename) => emotionIdsToFilterBy.has(
                getEmotionIdFromFilename(filename)
            )
        )
    }
    return ret
}


class Samples {

    constructor() {
        this.filenames = new Set ()
        this.emotionAlternatives = new Set ()
    }

    get shuffledFilenames() {
        return lodash.shuffle([...this.filenames])
    }
}


export function getUserSamples(frequency2Filename, numberOfEmotionAlternatives=11, totalSamplesNeeded=33) {

    console.log("numberOfEmotionAlternatives", numberOfEmotionAlternatives)

    const samples = new Samples()

    let numberOfUniqueEmotionIds = getUniqueEmotionIds(frequency2Filename).size
    if (numberOfEmotionAlternatives > numberOfUniqueEmotionIds) {
        console.log("something went wrong, there are not that many unique emotion among the filenames")
        // throw an error here, maybe raise it somewhere?
    }

    while (samples.filenames.size < totalSamplesNeeded) {

        // find the minimum key
        let minCount = Math.min(...Object.keys(frequency2Filename).map(Number));
        // currently samples on all emotions present in samples
        let newSamples = getSampleSet( filterDuplicateFilenames( frequency2Filename[minCount], samples.filenames ), numberOfEmotionAlternatives );

        console.log("newSamples without filler", newSamples)


        let sampledEmotionIds = new Set();
        while (newSamples <= numberOfEmotionAlternatives){
            minCount += 1
            // A list of all emotions in newSamples
            sampledEmotionIds = new Set([...sampledEmotionIds, ...mapFilenamesToEmotionIds(newSamples)])

            // sample the remaining data
            const fillerSamples = getSampleSet(
                filterDuplicateFilenamesAndEmotions
                (
                    frequency2Filename[minCount],
                    samples.filenames,
                    sampledEmotionIds)
                );

            console.log("filler samples", fillerSamples)

            // concat filler samples to new samples
            newSamples = newSamples.concat(fillerSamples)
        }

        if (samples.filenames.size === 0) {
            // if retSamples is empty, then freeze emotion alternatives and filter the filenames to only include filenames from these emotions
            samples.emotionAlternatives = new Set( mapFilenamesToEmotionIds([...newSamples]) )
            frequency2Filename = filterFrequency2Filename(frequency2Filename, samples.emotionAlternatives)
        }

        newSamples.forEach(sample => {
            samples.filenames.add(sample);
        });
    }

    console.log(samples)

    return samples;
}

function filterDuplicateFilenamesAndEmotions(filenames, retSamples, sampledEmotionIds) {
    return filenames.filter(filename =>
        !retSamples.has(filename) &&
        !sampledEmotionIds.has(getEmotionIdFromFilename(filename)))
}

function filterDuplicateFilenames(filenames, retSamples) {
    return filenames.filter(filename => !retSamples.has(filename))
}
