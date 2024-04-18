export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Function to format milliseconds into seconds
export function formatTimeToSeconds(milliseconds) {
    if (milliseconds == null) return '';
    return `${(milliseconds / 1000).toFixed(2)} seconds`;
}