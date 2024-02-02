import {filterFrequency2Filename} from "../filenameHandling/filterFilenames";
import {getAllEmotionIdsInData, getFilenameMetadata} from "../metadataManager";
import {sampleEmotionIds} from "./sampling2/sampleEmotionIds";
import {getEqualDistributionSamples} from "./sampling2/getEqualDistributionSamples";
import {ALL} from "../../config";


function getEmotionIds(frequency2Filename, emotionsPerSurvey){
    // Get all emotion IDs present in the project metadata
    const allEmotionIds = getAllEmotionIdsInData();

    // Determine which emotion IDs to use for the survey
    let emotionIds;
    if (allEmotionIds.length > emotionsPerSurvey) {
        emotionIds = sampleEmotionIds(frequency2Filename, emotionsPerSurvey);
    } else {
        emotionIds = allEmotionIds;
    }
    return emotionIds
}


export const generateSurveyItems = (frequency2Filename, emotionsPerSurvey, valence = ALL) => {
    // Filter filenames based on the subset selection
    const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, valence);

    const emotionIds = getEmotionIds(frequency2Filename, emotionsPerSurvey)

    // Get a balanced sample of filenames based on the selected emotion IDs and the desired number of samples per survey
    const samples = getEqualDistributionSamples(
        filteredFrequency2Filename,
        emotionIds,
        emotionsPerSurvey);

    // Construct survey items with the necessary metadata
    const surveyItems = samples.map(filename => {
        const metaData = getFilenameMetadata(filename);
        return {
            "filename": filename,
            "video_id": metaData.video_id,
            "emotion_id": metaData.emotion_1_id,
        };
    });

        // Return both survey items and the selected emotion IDs
    return {
        surveyItems,
        emotionIds
    };
};
