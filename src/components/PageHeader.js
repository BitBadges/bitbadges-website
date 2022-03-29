const React = require('react');
const { Menu, Typography } = require('antd');
const { CaretLeftFilled } = require('@ant-design/icons');
// const { setScreen } = require('../redux/screenSlice');
const { Text } = Typography;
const { useSelector, useDispatch } = require('react-redux');

export function PageHeader({ title }) {
    const dispatch = useDispatch();
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
            <a
                style={{
                    position: 'absolute',
                    left: 5,
                    backgroundColor: 'inherit',
                    color: '#ddd',
                    fontSize: 17,
                }}
                // onClick={() => dispatch(setScreen('home'))}
                className="opacity"
            >
                <CaretLeftFilled size={40} />
                Back
            </a>

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
