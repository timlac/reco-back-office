import {updateProjectMetadata} from "../services/metadataManager";
import mockProjectMetadata from "./__mock_data__/mockProjectMetadata.json";
import mockFrequency2Filename from "./__mock_data__/mockFrequency2Filename.json";
import {getAllEmotionIds, sampleEmotionIds} from "../services/sampling2/sampleEmotionIds";

describe('getFilenamesForEmotion', () => {
    // Initialize the project metadata before each test
    beforeEach(() => {
        updateProjectMetadata(mockProjectMetadata);
    });

    it('should return the correct sample size', () => {
        const sampleSize = 5

        const allEmotions = getAllEmotionIds(mockFrequency2Filename)

        const result = sampleEmotionIds(allEmotions, sampleSize)

        expect(result.length).toBe(sampleSize)

    });
});