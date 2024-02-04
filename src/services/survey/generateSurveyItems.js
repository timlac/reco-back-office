import {filterFrequency2Filename} from "../filenameHandling/filterFilenames";
import {getAllEmotionIdsInData, getFilenameMetadata} from "../metadataManager";
import {sampleEmotionIds} from "./sampling/sampleEmotionIds";
import {getEvenlyDistributedSamples} from "./sampling/getEvenlyDistributedSamples";
import {ALL} from "../../config";
import {getRandomlyDistributedSamples} from "./sampling/getRandomlyDistributedSamples";


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


export const generateSurveyItems = (frequency2Filename,
                                    emotionsPerSurvey,
                                    samplesPerSurvey,
                                    EmotionSamplingEnabled,
                                    valence = ALL,
                                    ) => {


    console.log("EmotionSamplingEnabled", EmotionSamplingEnabled)
    console.log("samples per survey: ", samplesPerSurvey)

    // Filter filenames based on the subset selection
    const filteredFrequency2Filename = filterFrequency2Filename(frequency2Filename, valence);

    let samples = []
    let emotionIds = []

    if (EmotionSamplingEnabled){
        emotionIds = getEmotionIds(frequency2Filename, emotionsPerSurvey, samplesPerSurvey)

        // Get a balanced sample of filenames based on the selected emotion IDs and the desired number of samples per survey
        samples = getEvenlyDistributedSamples(
            filteredFrequency2Filename,
            emotionIds,
            emotionsPerSurvey);
    } else{
        samples = getRandomlyDistributedSamples(frequency2Filename, samplesPerSurvey)
    }

    // Construct survey items with the necessary metadata
    const surveyItems = samples.map(filename => {
        const metaData = getFilenameMetadata(filename);
        return {
            "filename": filename,
            "video_id": metaData.video_id,
            "mix": metaData.mix,
            "emotion_1_id": metaData.emotion_1_id,
            "emotion_2_id": metaData.emotion_2_id
        };
    });

        // Return both survey items and the selected emotion IDs
    return {
        surveyItems,
        emotionIds
    };
};
