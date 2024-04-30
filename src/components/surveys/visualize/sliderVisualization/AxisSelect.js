import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const AxisSelect = ({ availableAxes, selectedAxes, onAxisChange }) => {
    return (
        <div style={{ display: 'flex', marginBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
            {/* Container for the Y Axis */}
            <div>
                <p>Y Axis</p>
                <Select
                    value={selectedAxes.y}
                    onChange={(value) => onAxisChange('y', value)}
                    style={{ width: 300 }}
                >
                    {availableAxes.map((axis, index) => (
                        <Option key={axis.label} value={index}>{axis.label}</Option>
                    ))}
                </Select>
            </div>
            {/* Container for the X Axis */}
            <div style={{ marginRight: 20 }}> {/* Add some spacing between the X and Y axis selectors */}
                <p>X Axis</p>
                <Select
                    value={selectedAxes.x}
                    onChange={(value) => onAxisChange('x', value)}
                    style={{ width: 300 }}
                >
                    {availableAxes.map((axis, index) => (
                        <Option key={axis.label} value={index}>{axis.label}</Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};
