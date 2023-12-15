import {Samples} from "./samples";
import {FrequencySampler} from "./frequencySampler";

export function generateSamples(frequency2Filename,
                                numberOfEmotionAlternatives = 11,
                                totalSamplesNeeded = 132) {

    const samples = new Samples()
    const sampler = new FrequencySampler(frequency2Filename);

    if (numberOfEmotionAlternatives > sampler.getUniqueEmotionIds().size) {
        throw new Error("Invalid number of unique emotions");
    }

    while (samples.filenames.size < totalSamplesNeeded) {
        const sampleBatch = sampler.getSampleBatch(numberOfEmotionAlternatives)

        console.log("sampleBatch: ", sampleBatch)
        console.log("sampleBatch length: ", sampleBatch.length)


        if (samples.filenames.size === 0) {
            console.log("freezing emotion alternatives")
            samples.setEmotionAlternatives(sampleBatch)
            sampler.filterFrequency2Filename(samples.emotionAlternatives)
        }

        samples.addSamples(sampleBatch)
    }

    return samples;
}