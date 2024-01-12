import React from 'react';
import { useParams } from 'react-router-dom';
import {SurveyDataProvider} from "../../contexts/SurveyDataProvider";

const withSurveyData = (WrappedComponent) => {
    return (props) => {
        const { surveyType } = useParams();

        const ret = useParams()

        console.log("ret: ", ret)
        console.log("surveyType: ", surveyType)

        return (
            <SurveyDataProvider surveyType={surveyType}>
                <WrappedComponent {...props} />
            </SurveyDataProvider>
        );
    };
};

export default withSurveyData;
