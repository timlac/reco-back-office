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