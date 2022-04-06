const React = require('react');
const { Menu, Typography } = require('antd');
const { CaretLeftFilled } = require('@ant-design/icons');
// const { setScreen } = require('../redux/screenSlice');
const { Text } = Typography;

export function PageHeader({ title }) {
    return (
        <Menu
            theme="dark"
            style={{
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                height: 30,
                justifyContent: 'center',
            }}
        >
            <button
                // className="link-button"
                style={{
                    position: 'absolute',
                    left: 5,
                    backgroundColor: 'inherit',
                    color: '#ddd',
                    fontSize: 17,
                }}
                // onClick={() => dispatch(setScreen('home'))}
                className="opacity link-button"
            >
                <CaretLeftFilled size={40} />
                Back
            </button>

            <span
                style={{
                    verticalAlign: 'middle',
                    fontSize: 20,
                }}
            >
                <Text
                    strong
                    style={{
                        color: '#ddd',
                    }}
                    type="warning"
                >
                    {title}
                </Text>
            </span>
        </Menu>
    );
}
