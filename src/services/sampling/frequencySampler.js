import {sampleFromFilenames} from "./sampleFromFilenames";
import {getEmotionIdFromFilename, mapFilenamesToEmotionIds} from "../videoMetaDataHelper";

export class FrequencySampler {
    constructor(frequency2Filename) {
        this.frequency2Filename = frequency2Filename;
    }

    getSampleBatch(numberOfEmotionAlternatives) {
        let minCount = this.getMinCount()
        console.log("min count: ", minCount)

        let sampleBatch = sampleFromFilenames(
            this.frequency2Filename[minCount],
            numberOfEmotionAlternatives
        )

        this.updateFrequencyData(minCount, sampleBatch)

        while (sampleBatch.length < numberOfEmotionAlternatives) {
            minCount += 1;
            const fillerSamples = this.getFillerSamples(minCount, sampleBatch, numberOfEmotionAlternatives)
            sampleBatch = sampleBatch.concat(fillerSamples)
        }
        return sampleBatch;
    }

    getFillerSamples(minCount, sampleBatch, numberOfEmotionAlternatives) {
        console.log("min count in filler ", minCount)


        const sampledEmotionIds = new Set([...mapFilenamesToEmotionIds(sampleBatch)]);

        const maxNumberOfSamples = numberOfEmotionAlternatives - sampledEmotionIds.size

        const fillerSamples = sampleFromFilenames(
            this.frequency2Filename[minCount],
            maxNumberOfSamples,
            sampledEmotionIds
        )
        this.updateFrequencyData(minCount, fillerSamples)
        return fillerSamples
    }

    updateFrequencyData(minCount, sampleFilenames) {
        this.frequency2Filename[minCount] =
            this.frequency2Filename[minCount].filter(filename => !sampleFilenames.includes(filename))
    }

    getMinCount() {
        // Filter keys where the corresponding values list is not empty
        const nonEmptyKeys = Object.keys(this.frequency2Filename).filter(
            key => this.frequency2Filename[key].length > 0
        );
        return Math.min(...nonEmptyKeys.map(Number));
    }

    filterFrequency2Filename(emotionIdsToFilterBy) {
        for (const [freq, filenames] of Object.entries(this.frequency2Filename)) {

            this.frequency2Filename[freq] = filenames.filter(
                (filename) => emotionIdsToFilterBy.has(
                    getEmotionIdFromFilename(filename)
                )
            )
        }
    }

    getAllFilenames() {
        return Object.values(this.frequency2Filename).flat();
    }

    getUniqueEmotionIds() {
        return new Set( mapFilenamesToEmotionIds(this.getAllFilenames() ))
    }
}