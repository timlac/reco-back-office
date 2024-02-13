import {getEmotionFromId} from "nexa-js-sentimotion-mapper";


function transformMeta(metadata, flattenedSurvey) {
    flattenedSurvey["emotion_1"] = getEmotionFromId(metadata.emotion_1_id)
    if (metadata.mix === 1) {
        flattenedSurvey["emotion_2"] = getEmotionFromId(metadata.emotion_2_id)
    }
    Object.keys(metadata).forEach((key) => {
        flattenedSurvey[key] = metadata[key]
    })
}

function transformReply(reply, replyFormat, flattenedSurvey) {
    if (replyFormat.reply_structure === "dimensions") {
        for (const [index, dimension] of replyFormat.dimensions.entries()) {
            flattenedSurvey["reply_dim_" + dimension.label] = parseInt(reply[index]) || 0;
        }
    } else if (replyFormat.reply_structure === "categories") {
        flattenedSurvey["reply"] = reply[0]
    } else {
        throw Error("no valid reply structure found")
    }
}

export const flattenSurveyItems = (surveyData, replyFormat) => {
    let flattenedData = [];

    surveyData.forEach((survey) => {

        const surveyItems = survey?.survey_items

        // If there are survey items, flatten them
        if (surveyItems && surveyItems.length > 0) {
            surveyItems.forEach((item, index) => {

                // skip items without reply...
                if (item.has_reply === 1) {
                    // Clone the survey object to avoid mutating the original data
                    let flattenedSurvey = {
                        user_id: survey.user_id,
                        survey_id: survey.survey_id,
                        survey_item_index: index,
                    };

                    // Append survey item attributes to the cloned survey object
                    Object.keys(item).forEach((key) => {
                        if (key !== "metadata" && key !== "reply") {
                            flattenedSurvey[key] = item[key];
                        }
                    });

                    transformMeta(item.metadata, flattenedSurvey)

                    try {
                        transformReply(item.reply, replyFormat, flattenedSurvey)
                    } catch (error) {
                        console.log(error)
                    }

                    // Add the flattened survey to the result array
                    flattenedData.push(flattenedSurvey);
                }
            });
        } else {
            // If there are no survey items, just add the survey itself
            flattenedData.push(survey);
        }
    });

    return flattenedData;
};