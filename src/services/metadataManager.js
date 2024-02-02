let projectMetadata = {};

export const updateProjectMetadata = (newMetadata) => {
    projectMetadata = newMetadata;
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

export const getAllEmotionIdsInData = () => {
    console.log(projectMetadata)

    const allEmotionIds = Object.values(projectMetadata).map(item => item.emotion_1_id);

    console.log(allEmotionIds)
    return Array.from(new Set(allEmotionIds)); // Convert to Set and back to Array to ensure uniqueness
}