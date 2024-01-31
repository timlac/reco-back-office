import {getFilenamesForEmotion} from "../services/sampling2/getFilenamesForEmotion";

import mockFrequency2Filename from './__mock_data__/mockFrequency2Filename.json'


describe('getFilenamesForEmotion', () => {


    it('should return the correct number of filenames for a given emotion', () => {
        const result = getFilenamesForEmotion(mockFrequency2Filename, 38, 9);
        expect(result.length).toBe(9);
        // expect(result).toEqual(expect.arrayContaining(['happy1.mp4', 'happy2.mp4']));
    });

    // it('should handle cases where fewer filenames are available than requested', () => {
    //     const result = getFilenamesForEmotion(mockFrequency2Filename, 'sad', 3);
    //     expect(result.length).toBe(2); // Only 2 'sad' videos are available
    //     expect(result).toEqual(expect.arrayContaining(['sad1.mp4', 'sad2.mp4']));
    // });

    // Add more test cases as needed...
});
