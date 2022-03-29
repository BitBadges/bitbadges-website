const React = require('react');
const { Layout } = require('antd');
const PageHeader = require('../components/PageHeader');
const { Content } = Layout;

export function Swap({}) {
    return (
        <Content style={{ padding: '0', width: '100%', height: 30 }}>
            <PageHeader title={'Swap'} />
            <div className="site-layout-content">Coming Soon</div>
        </Content>
    );
}
