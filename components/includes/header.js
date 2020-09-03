import React, { Component } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link'
const { SubMenu } = Menu;
class Header extends Component {
    state = {
        current: 'mail',
	};
	handleClick = ({item, key}) => {
		if(key === 'shoLogin'){
			this.props.showLoginClick();
		}
	};
    render() {
        const { current } = this.state;
        return (
			<Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
				<Menu.Item key="mail" icon={<MailOutlined />}>
					<Link href="/">
						<a>Home</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="app" icon={<AppstoreOutlined />}>
					<Link href="/SinoTrade_login">
						<a>登入</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="shoLogin" icon={<AppstoreOutlined />}>
					<a>壓登入</a>
				</Menu.Item>
				<SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
					<Menu.ItemGroup title="Item 1">
						<Menu.Item key="setting:1">Option 1</Menu.Item>
						<Menu.Item key="setting:2">Option 2</Menu.Item>
					</Menu.ItemGroup>
					<Menu.ItemGroup title="Item 2">
						<Menu.Item key="setting:3">Option 3</Menu.Item>
						<Menu.Item key="setting:4">Option 4</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
				<Menu.Item key="goOrder">
					<Link href="/goOrder">
						<a>goOrder</a>
					</Link>
				</Menu.Item>
			</Menu>
        )
    }
}

export default Header;