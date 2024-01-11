import filename2MetaData from "../data/filename2Metadata.json";

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


export { mapFilenames2MetaData, mapFilenamesToEmotionIds, filename2MetaData, getEmotionIdFromFilename };
