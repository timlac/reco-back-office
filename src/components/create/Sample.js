const lodash = require('lodash');

export function sample(df) {
    // Get unique categories (emotion_id)
    const categories = lodash.uniq(df.map((row) => row.emotion_id));

    // Categorize videos based on all category combinations
    const categoryVideos = {};
    categories.forEach((category) => {
        categoryVideos[category] = [];
    });

    df.forEach((row) => {
        const category = row.emotion_id;
        categoryVideos[category].push(row.filename);
    });

    // Initialize an empty array to store the final set of 132 videos for each rater
    const ret = [];

    // Stratified sampling within each category combination
    categories.forEach((category) => {
        const videos = categoryVideos[category];

        if (videos.length > 0) {
            const selectedVideo = lodash.sample(videos);
            ret.push(selectedVideo);
        }
    });

    return ret;
}