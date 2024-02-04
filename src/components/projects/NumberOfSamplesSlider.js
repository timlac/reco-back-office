import React, {useEffect, useState} from 'react';
import {Col, InputNumber, Row, Slider} from 'antd';

const NumberOfSamplesSlider = ({numberOfSamples, onValueChange, emotionSamplingEnabled}) => {
    const [inputValue, setInputValue] = useState(numberOfSamples);

    useEffect(() => {
        setInputValue(numberOfSamples); // Update inputValue when numberOfSamples changes
    }, [numberOfSamples]);

    const onChange = (newValue) => {
        setInputValue(newValue);
        if (onValueChange) {
            onValueChange(newValue); // Call the passed callback function with the new value
        }
    };
    
    return (
        <Row>
            <Col span={18}>
                <Slider
                    disabled={!emotionSamplingEnabled}
                    min={1}
                    max={numberOfSamples}
                    marks={{
                        1: 1,
                        [numberOfSamples]: numberOfSamples
                    }}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    disabled={!emotionSamplingEnabled}
                    min={1}
                    max={numberOfSamples}
                    style={{
                        margin: '0 16px',
                    }}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

export default NumberOfSamplesSlider