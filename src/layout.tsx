import React from 'react';
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (

        <div className="main">
            <Layout className='main' style={{ minHeight: "100vh", }}>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="demo-logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                </Header>
                <Layout>
                    <Sider width={200} style={{}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: 0 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>

                            <ArrowLeftOutlined style={{ fontSize: 24, marginRight: 12, color: "#ffff" }} />
                            <ArrowRightOutlined style={{ fontSize: 24, color: "#fff" }} />
                            <input style={{ width: 440, height: 40, borderRadius: 40 }} type="text" placeholder='Tìm kiếm bài hát, lời bài hát,...' />
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 0,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                            }}
                        >
                            <div className="row">
                                <div className="col-3 text-center" style={{ backgroundColor: "#461974" }}>
                                    <img className='mw-100' style={{ width: '300px', height: "300px", borderRadius: "10px" }} src="https://i.pinimg.com/originals/f2/b3/5c/f2b35cb4eac9c65fc9f79bf1d9c7fa4a.png" alt="" />

                                </div>
                                <div className="col-9" style={{ backgroundColor: "#461974" }}>
                                    <div className="title " style={{ color: '#fff' }}>
                                        <h5>Lời tựa của ngôi sao Vpop hiện nay</h5>
                                        <div className="row" style={{ color: "#fff" }}>
                                            <div className="col-5">
                                                <h5>Bài hát</h5>
                                            </div>
                                            <div className="col-5">
                                                <h5>Album</h5>
                                            </div>
                                            <div className="col-2 " >
                                                <h5 style={{ float: "right", marginRight: "20px" }}>
                                                    Thời gian
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-5" style={{ display: "flex" }}>
                                                <i className="bi bi-music-note-beamed pe-2 pt-2" ></i>
                                                <img className='mw-100' style={{ width: 40, height: 40 }} src="https://tse1.mm.bing.net/th?id=OIP.FJnM6RBp0BFrhq7Hvz0pVAAAAA&pid=Api&P=0&h=180" alt="" />
                                                <h6 className="title-music ps-2" style={{}} >Hãy trao cho anh</h6> <br />
                                                <p className='title-song' style={{ position: "relative", top: 18, left: -123 }}>Sơn Tùng MTP </p>
                                            </div>
                                            <div className="col-5 album text-center">
                                                <p>Album</p>
                                            </div>
                                            <div className="col-2">
                                                <p className='text-center'> Time</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

        </div>

    );
};

export default App;