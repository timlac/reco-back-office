import mockFrequency2Filename from './__mock_data__/mockFrequency2Filename.json';
import {getFilesForEmotionId} from "../services/survey/sampling/getFilesForEmotionId";
import {getEvenlyDistributedSamples} from "../services/survey/sampling/getEvenlyDistributedSamples";
import {updateProjectMetadata} from "../services/metadataManager";
import mockProjectMetadata from "./__mock_data__/mockProjectMetadata.json";

// Mocking getFilesForEmotionId function
jest.mock("../services/survey/sampling/getFilesForEmotionId", () => ({
    getFilesForEmotionId: jest.fn()
}));

describe('getEvenlyDistributedSamples', () => {
    beforeEach(() => {
        // Reset mocks before each test
        getFilesForEmotionId.mockReset();
        updateProjectMetadata(mockProjectMetadata);
    });

    it('should return an equal distribution of samples for each emotion', () => {
        // Setup mock return values for getFilesForEmotionId
        getFilesForEmotionId.mockImplementation((frequency2Filename, emotion, count) => {
            // Return an array of 'count' filenames for the given emotion
            // Adjust this logic based on your actual mock data and requirements
            return Array.from({ length: count }, (_, index) => `file_${emotion}_${index + 1}.mp4`);
        });

        const emotions = [12, 33, 34]; // Example emotion IDs
        const totalSamples = 9; // Total samples to distribute among the emotions

        const result = getEvenlyDistributedSamples(mockFrequency2Filename, emotions, totalSamples);
        expect(result.length).toBe(totalSamples);

        // Expect 3 samples per emotion
        emotions.forEach(emotion => {
            const emotionSamples = result.filter(filename => filename.includes(`_${emotion}_`));
            expect(emotionSamples.length).toBe(3);
        });
    });

    it('should adjust the last emotion\'s count if totalSamples is not evenly divisible', () => {
        // Setup mock return values
        getFilesForEmotionId.mockImplementation((frequency2Filename, emotion, count) => {
            // Return 'count' filenames for the given emotion
            return Array.from({ length: count }, (_, index) => `file_${emotion}_${index + 1}.mp4`);
        });

        const emotions = [12, 33, 34]; // Example emotion IDs
        const totalSamples = 10; // Total samples, not evenly divisible by the number of emotions

        const result = getEvenlyDistributedSamples(mockFrequency2Filename, emotions, totalSamples);
        expect(result.length).toBe(totalSamples);

        // Expect 3 samples for the last emotion and 3 or 4 for others
        const lastEmotionSamples = result.filter(filename => filename.includes(`_${emotions[emotions.length - 1]}_`));
        expect(lastEmotionSamples.length).toBe(4);

        // Check other emotions
        for (let i = 0; i < emotions.length - 1; i++) {
            const emotionSamples = result.filter(filename => filename.includes(`_${emotions[i]}_`));
            expect(emotionSamples.length).toBeGreaterThanOrEqual(3);
            expect(emotionSamples.length).toBeLessThanOrEqual(4);
        }
    });

    // Additional tests for edge cases, such as having more requested samples than available
    // and handling invalid inputs, can also be added here
});
