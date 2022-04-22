import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { PRIMARY_TEXT } from '../constants';

export function FormNavigationHeader({
    decrementStep,
    incrementStep,
    stepNum,
    backButtonDisabled,
    nextButtonDisabled,
    finalStepNumber,
}) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <button
                style={{
                    backgroundColor: 'inherit',
                    color: '#ddd',
                    fontSize: 17,
                }}
                onClick={() => decrementStep()}
                className="opacity link-button"
                disabled={backButtonDisabled}
            >
                <CaretLeftFilled size={40} />
                Back
            </button>
            <Typography.Text
                strong
                style={{
                    color: PRIMARY_TEXT,
                    fontSize: 20,
                    marginLeft: 50,
                    marginRight: 50,
                }}
                align="center"
            >
                {stepNum} / {finalStepNumber}
            </Typography.Text>

            <button
                style={{
                    backgroundColor: 'inherit',
                    color: '#ddd',
                    fontSize: 17,
                }}
                onClick={() => incrementStep()}
                className="opacity link-button"
                disabled={nextButtonDisabled}
            >
                Next
                <CaretRightFilled size={40} />
            </button>
        </div>
    );
}
