let projectMetadata = {};

export const updateProjectMetadata = (newMetadata) => {
    projectMetadata = newMetadata;
    console.log("newMetadata: ", newMetadata)

};

export const getFilenameMetadata = (filename) =>  {
    return projectMetadata[filename]
}

export const mapFilenames2MetaData = (filenames) => {
    return filenames.map(filename => projectMetadata[filename]);
}

export const getEmotionIdFromFilename = (filename) => {
    try {
        return projectMetadata[filename].emotion_1_id;
    } catch (error) {
        // Handle the case when the filename doesn't exist in filename2MetaData
        console.error(`Error retrieving emotion_id for filename "${filename}":`, error);
    }
};

export const mapFilenamesToEmotionIds = (filenames) => {
    return filenames.map(filename => projectMetadata[filename].emotion_1_id);
}