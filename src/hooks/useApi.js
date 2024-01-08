import { useSurveyData } from '../contexts/SurveyDataProvider';
import {emotionCategoriesApi, emotionScalesApi} from "../services/api";

const useApi = () => {
    const { apiType } = useSurveyData()

    const getApi = () => {
        switch (apiType) {
            case 'categories':
                return emotionCategoriesApi;
            case 'scales':
                return emotionScalesApi;
            // Add more cases as needed
            default:
                throw Error("no api defined")
        }
    };

    return getApi();
};

export default useApi;
