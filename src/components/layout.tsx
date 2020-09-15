import React, { useState } from 'react'
import '../styles/layout.less'
import { Breadcrumb, Layout, Menu } from 'antd'
import { AppstoreAddOutlined, TableOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AmplifySignOut } from '@aws-amplify/ui-react'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

interface Props {
    children: React.ReactNode | null
    collapsed?: boolean
    title: string
    pageKey: string
}

const BaseLayout = (props: Props) => {
    const { children, pageKey, title } = props
    const [collapsed, setCollapsed] = useState(props.collapsed)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    console.log(pageKey)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={[pageKey]}>
                    <Menu.Item key="index" icon={<TableOutlined />}>
                        <Link href='/'>Index</Link>
                    </Menu.Item>
                    <Menu.Item key="add" icon={<AppstoreAddOutlined />}>
                        <Link href='/threat-scenario'>Add</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Threat Scenario</Breadcrumb.Item>
                        <Breadcrumb.Item>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <AmplifySignOut />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default BaseLayout
