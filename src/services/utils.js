import {mapFilenamesToEmotionIds} from "./metadataManager";

export function getFilenames(surveyItems) {
    return surveyItems.map(item => item.filename).flat();

}

export function getAllFilenames(surveyData) {
    let ret = []
    for (const survey of surveyData) {

        const filenames = getFilenames(survey.survey_items)
        ret = ret.concat(filenames)
    }
    return ret
}


export function getAllEmotionIds(surveyData) {
    const allFilenames = getFilenames(surveyData)
    return mapFilenamesToEmotionIds(allFilenames)
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}