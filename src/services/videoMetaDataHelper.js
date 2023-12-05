import api from "./api";

let filename2MetaData = {}; // This will hold your video data once fetched

const fetchVideoData = async () => {
    try {
        const response = await api.get("video_metadata")
        const videoMetaData = await response.data;

        filename2MetaData = videoMetaData.reduce((acc, video) => {
            const {filename, ...otherAttributes} = video;
            acc[filename] = otherAttributes;
            return acc;
        }, {});

    } catch (error) {
        console.error('Failed to fetch video data:', error);
    }
};

const mapFilenames2MetaData = (filenames) => {
    return filenames.map(filename => filename2MetaData[filename]);
}

const getEmotionFromFilename = (filename) => {
    return filename2MetaData[filename].emotion_id
}


const mapFilenamesToEmotions = (filenames) => {
    return filenames.map(filename => filename2MetaData[filename].emotion_id);
}


export { fetchVideoData, mapFilenames2MetaData, mapFilenamesToEmotions, filename2MetaData, getEmotionFromFilename };
