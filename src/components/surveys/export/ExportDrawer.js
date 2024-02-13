import React, {useState} from 'react';
import {Button, Checkbox, Drawer, Form} from 'antd';
import {exportToCsv} from "../../../services/exportToCsv";
import {flattenSurveyItems} from "../../../services/export/flattenSurveyItems";
import {useSurveyData} from "../../../contexts/SurveyDataProvider";

const ExportDrawer = () => {

    const {surveyData, projectData, getSurveyUrl} = useSurveyData()


    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const toggleDrawer = () => setOpen(!open);

    const handleExport = (values) => {

        let exportData = [...surveyData]; // Create a shallow copy of surveyData

        if (!values.IncludeUnfinished) {
            exportData = exportData.filter(survey => survey.progress === 1);
        }

        if (values.includeSurveyItems) {
            exportData = flattenSurveyItems(exportData, projectData.reply_format)
        } else {
            exportData = exportData.map(item => {
                // Use the spread operator to clone the item if you want to avoid mutating the original data
                const newItem = {...item};
                delete newItem.survey_items; // Replace 'attributeToRemove' with the actual attribute name
                return newItem;
            });
        }

        if (values.includeUrl) {
            exportData = exportData.map(item => (
                    {
                        ...item,
                        url: getSurveyUrl(item.survey_id)
                    }
                )
            );
        }

        // Example export function, adjust according to your actual export logic
        exportToCsv(exportData, 'export.csv');
        // setOpen(false); // Optionally close the drawer after export
    };

    return (
        <>
            <Button type="primary" onClick={toggleDrawer}
                    style={
                        {
                            marginBottom: 16,
                            marginLeft: 16
                        }
                    }>
                Export
            </Button>

            <Drawer title="Select Export Options" onClose={toggleDrawer} open={open}>
                <Form form={form} layout="vertical" onFinish={handleExport}>
                    <Form.Item name="includeUrl" valuePropName="checked">
                        <Checkbox>Include Survey Urls</Checkbox>
                    </Form.Item>
                    <p><b>Note:</b> survey items without replies will
                        automatically be filtered out on export.</p>
                    <Form.Item name="includeSurveyItems" valuePropName="checked">
                        <Checkbox>Include Survey Items</Checkbox>
                    </Form.Item>
                    <Form.Item name="IncludeUnfinished" valuePropName="checked">
                        <Checkbox>Include Unfinished Surveys</Checkbox>
                    </Form.Item>
                    {/* Add more Form.Item elements for other checkboxes as needed */}
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
