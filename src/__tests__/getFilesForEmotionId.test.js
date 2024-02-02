import mockProjectMetadata from './__mock_data__/mockProjectMetadata.json'
import mockFrequency2Filename from './__mock_data__/mockFrequency2Filename.json'
import {getFilesForEmotionId} from "../services/sampling2/getFilesForEmotionId";
import {mapFilenamesToEmotionIds, updateProjectMetadata} from "../services/metadataManager";


describe('getFilenamesForEmotion', () => {
    // Initialize the project metadata before each test
    beforeEach(() => {
        updateProjectMetadata(mockProjectMetadata);
    });

    it('should return the correct number of filenames for a given emotion', () => {
        const emotionId = 38;
        const numFiles = 9;

        const result = getFilesForEmotionId(mockFrequency2Filename, emotionId, numFiles);
        expect(result.length).toBe(numFiles);

        // Use mapFilenamesToEmotionIds to get an array of emotion IDs for all filenames
        const emotionIds = mapFilenamesToEmotionIds(result);
        emotionIds.forEach(id => expect(id).toBe(emotionId));

    });

    it('should handle cases where fewer filenames are available than requested', () => {
        const emotionId = 34;
        const numFiles = 500;

        const result = getFilesForEmotionId(mockFrequency2Filename, emotionId, numFiles);
        expect(result.length).toBe(104);
    });

    // Add more test cases as needed...
});
