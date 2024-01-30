import {Samples} from "./samples";
import {FrequencySampler} from "./frequencySampler";
import {mapFilenamesToEmotionIds} from "../videoMetaDataHelper";


// TODO: Maybe the neutral emotions should be divided 50/50 from the beginning to avoid neutral emotions crowding the lowest freq


// Function to assert the length of sampleBatch
function assertSampleBatchLength(sampleBatch, expectedLength) {
    if (sampleBatch.length !== expectedLength) {
        throw new Error(`Sample batch length should be ${expectedLength}, but it is ${sampleBatch.length}.`);
    }
}

// Function to assert that filenames in sampleBatch are unique
function assertUniqueFilenames(sampleBatch) {
    const filenameSet = new Set(sampleBatch);
    if (filenameSet.size !== sampleBatch.length) {
        throw new Error("Filenames in sampleBatch are not unique.");
    }
}

// Function to assert that emotionIds in sampleBatch are unique
function assertUniqueEmotionIds(sampleBatch) {
    const emotionIdSet = new Set(mapFilenamesToEmotionIds(sampleBatch));
    if (emotionIdSet.size !== sampleBatch.length) {
        throw new Error("EmotionIds in sampleBatch are not unique.");
    }
}


export function generateSamples(frequency2Filename,
                                batchSize,
                                total) {

    const samples = new Samples()
    const sampler = new FrequencySampler(frequency2Filename);

    if (batchSize > sampler.getUniqueEmotionIds().size) {
        throw new Error("Invalid number of unique emotions");
    }

    while (samples.filenames.size < total) {
        // Calculate how many more samples are needed to reach the total
        const remaining = total - samples.filenames.size;

        // Determine the size of the next sample batch, ensuring it doesn't exceed the remaining needed
        const nextBatchSize = Math.min(batchSize, remaining);

        console.log("nextBatchSize ", nextBatchSize)

        const sampleBatch = sampler.getSampleBatch(nextBatchSize);

        assertSampleBatchLength(sampleBatch, batchSize)
        assertUniqueFilenames(sampleBatch)
        assertUniqueEmotionIds(sampleBatch)

        if (samples.filenames.size === 0) {
            console.log("freezing emotion alternatives")
            samples.setEmotionAlternatives(sampleBatch)
            sampler.filterFrequency2Filename(samples.emotionAlternatives)
        }

        samples.addSamples(sampleBatch)
    }

    if (samples.filenames.size !== total){
        throw new Error(`Total samples should be ${total} but it is ${samples.filenames.size}`)
    }
    samples.assertFilenamesHaveValidEmotionIds()

    return samples;
}