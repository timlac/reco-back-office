export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Function to format milliseconds into seconds
export function formatTimeToSeconds(milliseconds) {
    if (milliseconds == null) return '';
    return `${(milliseconds / 1000).toFixed(2)} seconds`;
}


export function getSliderNames (projectData){
    return projectData.reply_format.template_json.dimensions
}

export function getReplyFormat(projectData) {
    return projectData.reply_format.reply_structure
}

export function getTotalTimeSpent(surveyItems){
    let totalTimeSpent = 0
    for (const item of surveyItems){
        totalTimeSpent += item.time_spent_on_item
    }
    return totalTimeSpent
}


export function getFinished(surveys) {
    return surveys.filter(obj => obj.progress === 1);
}

export function getStarted(surveys) {
    // Filter surveys where progress is greater than 0 and less than 1
    return surveys.filter(obj => obj.progress > 0 && obj.progress < 1);
}