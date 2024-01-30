import React, {useState} from 'react';
import {Col, InputNumber, Row, Slider} from 'antd';

const NumberOfSamplesSlider = ({numberOfSamples, onValueChange}) => {
    const [inputValue, setInputValue] = useState(1);
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