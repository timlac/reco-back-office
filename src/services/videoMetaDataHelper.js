import {videoMetadatApi} from "./api";

let filename2MetaData = {}; // This will hold your video data once fetched

const fetchVideoData = async () => {
    try {
        const response = await videoMetadatApi.get("videos")
        const videoMetaData = await response.data;

        console.log(videoMetaData)

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

const getEmotionIdFromFilename = (filename) => {
    try {
        return filename2MetaData[filename].emotion_id;
    } catch (error) {
        // Handle the case when the filename doesn't exist in filename2MetaData
        console.error(`Error retrieving emotion_id for filename "${filename}":`, error);
    }
};

const mapFilenamesToEmotionIds = (filenames) => {
    return filenames.map(filename => filename2MetaData[filename].emotion_id);
}


export { fetchVideoData, mapFilenames2MetaData, mapFilenamesToEmotionIds, filename2MetaData, getEmotionIdFromFilename };
