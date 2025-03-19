import React, { useState } from "react";
import { Button, Checkbox, Drawer } from "antd";
import { api } from "../../../services/api";
import { exportToCsv } from "../../../services/exportToCsv";
import { flattenSurveyItems } from "../../../services/export/flattenSurveyItems";
import { useSurveyData } from "../../../contexts/SurveyDataProvider";

const ExportItemsDrawer = () => {
    const { projectName, projectData } = useSurveyData();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onlyFinished, setOnlyFinished] = useState(false); // ✅ State for the checkbox

    const toggleDrawer = () => setOpen(!open);

    const fetchAndExport = async () => {
        setLoading(true);
        try {
            const response = await api.get(`projects/${projectName}/surveys?includeItems=true`);

            let surveyData = response.data;

            // ✅ Filter out unfinished surveys if checkbox is checked
            if (onlyFinished) {
                surveyData = surveyData.filter(survey => survey.progress === 1);
            }

            // Flatten the survey data
            const flattenedData = flattenSurveyItems(surveyData, projectData.reply_format.template_json);

            exportToCsv(flattenedData, "export.csv");

        } catch (error) {
            console.error("Error fetching or processing survey data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={toggleDrawer} style={{ marginBottom: 16, marginLeft: 16 }}>
                Export Items
            </Button>

            <Drawer title="Export Survey Items" onClose={toggleDrawer} open={open}>
                {/* ✅ Checkbox for filtering finished surveys */}
                <Checkbox
                    checked={onlyFinished}
                    onChange={(e) => setOnlyFinished(e.target.checked)}
                    style={{ marginBottom: 16 }}
                >
                    Only Finished Surveys
                </Checkbox>

                <Button type="primary" onClick={fetchAndExport} loading={loading}>
                    {loading ? "Exporting..." : "Export Now"}
                </Button>
            </Drawer>
        </>
    );
};

export default ExportItemsDrawer;
