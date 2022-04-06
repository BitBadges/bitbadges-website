import { useNavigate } from 'react-router-dom';

const React = require('react');
const { Menu, Dropdown } = require('antd');

export function Tabs({ setTab, tabInfo, widthPerTab, theme, noSelectedKeys }) {
    const navigate = useNavigate();

    const tabs = tabInfo.map((tab) => {
        return (
            <Dropdown
                placement="bottom"
                overlay={tab.subMenuOverlay ? tab.subMenuOverlay : <></>}
            >
                <Menu.Item
                    disabled={tab.disabled}
                    style={{
                        width: widthPerTab,
                        textAlign: 'center',
                        float: 'left',
                    }}
                    key={tab.key}
                    onClick={() => {
                        navigate(`/${tab.key}`);
                    }}
                >
                    {tab.content}
                </Menu.Item>
            </Dropdown>
        );
    });

    return (
        // <Content style={{ padding: '0' }}>
        <Menu
            style={{ display: 'flex' }}
            theme={theme ? theme : 'dark'}
            mode="horizontal"
            defaultSelectedKeys={noSelectedKeys ? undefined : [tabInfo[0].key]}
            selectedKeys={noSelectedKeys ? [] : undefined}
            // onClick={({ item, key, keyPath, domEvent }) => {
            //     setTab(key);
            // }}
        >
            {tabs}
        </Menu>
        // </Content>
    );
}
