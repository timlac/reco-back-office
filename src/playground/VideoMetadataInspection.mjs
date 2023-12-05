// import {filename2MetaData} from "../services/videoMetaDataHelper";

const videoMetadata = require('../../data/video_meta_data.json');


console.log(videoMetadata)

    // filename2MetaData = videoMetaData.reduce((acc, video) => {
    //             const {filename, ...otherAttributes} = video;
    //             acc[filename] = otherAttributes;
    //             return acc;
    //         }, {});