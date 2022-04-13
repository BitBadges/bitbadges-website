import { useNavigate } from 'react-router-dom';

const React = require('react');
const { Menu, Dropdown, Popover } = require('antd');

export function Tabs({ setTab, tabInfo, widthPerTab, theme, noSelectedKeys }) {
    const navigate = useNavigate();

    const tabs = tabInfo.map((tab) => {
        const menuItem = (
            <Menu.Item
                disabled={tab.disabled}
                style={{
                    width: widthPerTab,
                    textAlign: 'center',
                    float: 'left',
                }}
                key={tab.key}
                onClick={
                    tab.onClick
                        ? tab.onClick
                        : ({ item, key, keyPath, domEvent }) => {
                              setTab(tab.key);
                          }
                }
                id={tab.key}
            >
                {tab.content}
            </Menu.Item>
        );
        if (tab.subMenuOverlay) {
            return (
                <Dropdown
                    placement="bottom"
                    overlay={tab.subMenuOverlay ? tab.subMenuOverlay : <></>}
                    onClick={({ item, key, keyPath, domEvent }) => {
                        navigate(tab.key);
                    }}
                    trigger={tab.subMenuTrigger}
                >
                    {menuItem}
                </Dropdown>
            );
        } else if (tab.popoverContent) {
            return <Popover content={tab.popoverContent}>{menuItem}</Popover>;
        } else {
            return menuItem;
        }
    });

    return (
        // <Content style={{ padding: '0' }}>
        <Menu
            style={{ display: 'flex' }}
            theme={theme ? theme : 'dark'}
            mode="horizontal"
            defaultSelectedKeys={noSelectedKeys ? undefined : [tabInfo[0].key]}
            selectedKeys={noSelectedKeys ? [] : undefined}
            disabledOverflow
        >
            {tabs}
        </Menu>
        // </Content>
    );
}
