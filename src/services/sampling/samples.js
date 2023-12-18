import {shuffle} from "lodash";
import {getEmotionIdFromFilename, mapFilenamesToEmotionIds} from "../videoMetaDataHelper";

export class Samples {

    constructor() {
        this.filenames = new Set()
        this.emotionAlternatives = new Set()
    }

    get shuffledFilenames() {
        return shuffle([...this.filenames])
    }

    addSamples(sampleBatch) {
        sampleBatch.forEach(sample => {
            this.filenames.add(sample);
        });
    }

    setEmotionAlternatives(sampleBatch) {
        this.emotionAlternatives = new Set(mapFilenamesToEmotionIds([...sampleBatch]))

        console.log("set emotion alternatives to: ", this.emotionAlternatives)

    }

    assertFilenamesHaveValidEmotionIds() {
        for (const filename of this.filenames) {
            const emotionId = getEmotionIdFromFilename(filename);
            if (!this.emotionAlternatives.has(emotionId)) {
                throw new Error(`Invalid emotionId for filename "${filename}"`);
            }
        }
    }
}