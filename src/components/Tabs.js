const React = require('react');
const { Menu } = require('antd');

export function Tabs({ setTab, tabInfo, widthPerTab, theme, noSelectedKeys }) {
    const tabs = tabInfo.map((tab) => (
        <Menu.Item
            disabled={tab.disabled}
            style={{
                width: widthPerTab,
                textAlign: 'center',
                float: 'left',
            }}
            key={tab.key}
        >
            {tab.title}
        </Menu.Item>
    ));

    return (
        // <Content style={{ padding: '0' }}>
        <Menu
            style={{ display: 'flex' }}
            theme={theme ? theme : 'dark'}
            mode="horizontal"
            defaultSelectedKeys={noSelectedKeys ? undefined : [tabInfo[0].key]}
            selectedKeys={noSelectedKeys ? [] : undefined}
            onClick={({ item, key, keyPath, domEvent }) => {
                setTab(key);
            }}
        >
            {tabs}
        </Menu>
        // </Content>
    );
}
