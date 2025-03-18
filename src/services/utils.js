import _ from "lodash";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Function to format milliseconds into seconds
export function formatTimeToSeconds(milliseconds) {
    if (milliseconds == null) return '';
    return `${(milliseconds / 1000).toFixed(2)} s`;
}


export function getSliderNames(projectData) {
    return projectData.reply_format.template_json.dimensions
}

export function getReplyFormat(projectData) {
    console.log(projectData)

    return projectData.reply_format.template_json.reply_structure
}

export function getTotalTimeSpent(surveyItems) {
    let totalTimeSpent = 0
    for (const item of surveyItems) {
        totalTimeSpent += item.time_spent_on_item
    }
    return totalTimeSpent
}

export function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return hDisplay + mDisplay + sDisplay;
}


export function getFinished(surveys) {
    return surveys.filter(obj => obj.progress === 1);
}

export function getStarted(surveys) {
    // Filter surveys where progress is greater than 0 and less than 1
    return surveys.filter(obj => obj.progress > 0 && obj.progress < 1);
}

export function customStd(array) {
    const avg = _.sum(array) / array.length;
    return Math.sqrt(_.sum(_.map(array, (i) => Math.pow((i - avg), 2))) / array.length);
}