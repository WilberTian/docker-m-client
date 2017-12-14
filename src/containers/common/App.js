import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Cookie from 'tiny-cookie';

import { Layout, Menu, Icon, message } from 'antd';

import LoadingScreenComponent from '../../components/LoadingScreenComponent';
import loginService from '../../services/loginService';

import './app.less';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends PureComponent {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            collapsed: false,
            displayDetailLogo: false,
            username: '',
            navStatus: this.props.route.navStatus
        };
    }

    async componentWillMount() {
        const username = Cookie.get('username');
        if (username) {
            this.setState({
                loading: false,
                username
            });
        } else {
            try {
                const result = await loginService.validateLogin();
                this.setState({
                    loading: false,
                    username: result.data.username
                });
            } catch (ex) {
                if (ex.message !== '') {
                    message.config({
                        duration: 10,
                    });
                    message.error(ex.message);
                }
            }
        }
    }

    _onCollapse() {
        this.setState({
            collapsed: !this.state.collapsed,
            displayDetailLogo: !this.state.displayDetailLogo
        });
    }

    _onMenuItemSelect(item) {
        window.location.href = `/html/${item.key}.html`;
    }

    _handleLogout() {
        window.location.href = '/manage/logout';
    }

    render() {
        const { children } = this.props;
        const logo = require('../../images/logo.png');

        return (
            <div style={{ width: '100%', height: '100%' }}>
                { this.state.loading && <LoadingScreenComponent /> }
                { !this.state.loading && <Layout className="app-container">
                    <Sider
                      trigger={null}
                      collapsible
                      collapsed={this.state.collapsed}
                    >
                        { !this.state.displayDetailLogo && <div className="brand">
                            <div className="logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <span className="brand-name">
                                Docker M
                            </span>
                        </div> }
                        { this.state.displayDetailLogo && <div className="brand">
                            <img className="small-logo" src={logo} alt="small logo" />
                            <span className="small-brand-name">
                                Admin
                            </span>
                        </div> }
                        <Menu
                          theme="dark"
                          defaultSelectedKeys={[this.state.navStatus.sub]}
                          defaultOpenKeys={[this.state.navStatus.system]}
                          mode="inline"
                          onSelect={::this._onMenuItemSelect}
                        >
                            <SubMenu
                              key="containerSystem"
                              title={<span><Icon type="appstore" /><span>Container</span></span>}
                            >
                                <Menu.Item key="containers">Containers</Menu.Item>
                            </SubMenu>
                            <SubMenu
                              key="ImageSystem"
                              title={<span><Icon type="appstore" /><span>Image</span></span>}
                            >
                                <Menu.Item key="images">Images</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                              className="trigger"
                              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                              onClick={::this._onCollapse}
                            />
                            <div className="header-content">
                                <span className="login-user-info">
                                    欢迎，{this.state.username}
                                </span>
                                {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                                <span className="logout" onClick={::this._handleLogout}>退出</span>
                                {/* eslint-enable jsx-a11y/no-static-element-interactions */}
                            </div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            { children }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            ©Copyright 2017 Docker M
                        </Footer>
                    </Layout>
                </Layout> }
            </div>
        );
    }

}

export default App;
