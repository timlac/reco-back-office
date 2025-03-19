import React, { useState } from 'react';
import { Button, Checkbox, Drawer, Form } from 'antd';
import { exportToCsv } from "../../../services/exportToCsv";
import { useSurveyData } from "../../../contexts/SurveyDataProvider";

const ExportDrawer = () => {
    const { surveyData, getSurveyUrl, getSurveyHttpsUrl } = useSurveyData();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const toggleDrawer = () => setOpen(!open);

    const handleExport = ({ OnlyFinished }) => {
        let exportData = OnlyFinished ? surveyData.filter(survey => survey.progress === 1) : surveyData;

        exportData = exportData.map(item => ({
            ...item,
            url: getSurveyUrl(item.survey_id),
            https_url: getSurveyHttpsUrl(item.survey_id),
        }));

        exportToCsv(exportData, 'export.csv');
    };

    return (
        <>
            <Button type="primary" onClick={toggleDrawer} style={{ marginBottom: 16, marginLeft: 16 }}>
                Export
            </Button>

            <Drawer title="Export Options" onClose={toggleDrawer} open={open}>
                <Form form={form} layout="vertical" onFinish={handleExport}>
                    <Form.Item name="OnlyFinished" valuePropName="checked">
                        <Checkbox>Only Finished Surveys</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Export Now
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default ExportDrawer;
