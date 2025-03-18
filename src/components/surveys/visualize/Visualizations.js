import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { ProgressView } from "./ProgressView";
import { TotalTimeSpentHistogram } from "./TotalTimeSpentHistogram";
import ItemBarChart from "./ItemBarChart";
import EmotionBarChart from "./EmotionBarChart";
import { api } from "../../../services/api";
import {useSurveyData} from "../../../contexts/SurveyDataProvider"; // API instance

export const Visualizations = () => {

    const {projectName} = useSurveyData()


    const [stats, setStats] = useState(null);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoadingStats(true);
        setError(null);

        try {
            const response = await api.get(`/projects/${projectName}/surveys/item_stats`);
            setStats(response.data);
        } catch (err) {
            setError("Failed to fetch survey stats");
            console.error("Error fetching stats:", err);
        } finally {
            setIsLoadingStats(false);
        }
    };

    return (
        <div>
            <Row gutter={2}>
                <Col span={12}>
                    <Card title="Item Occurrence">
                        {isLoadingStats ? (
                            <p>Loading survey stats...</p>
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : (
                            <>
                                <h3>Item Counts</h3>
                                <p>This chart displays how often different items occur in existing surveys.</p>
                                <ItemBarChart stats={stats.item_reply_count} />

                                <h3>Emotion Counts</h3>
                                <p>This chart displays how often different emotions occur in existing surveys.</p>
                                <EmotionBarChart stats={stats.emotion_reply_count} />
                            </>
                        )}
                    </Card>
                </Col>

                {/* ✅ These components do NOT depend on stats, so they stay outside */}
                <Col span={12}>
                    <Card title="Progress">
                        <ProgressView />
                    </Card>
                    <Card title="Time Consumption Analysis">
                        <h3>Total Time Spent</h3>
                        <TotalTimeSpentHistogram />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
