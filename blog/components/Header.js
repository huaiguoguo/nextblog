import React, { useState, useEffect } from 'react';
import '../public/style/components/header.css';
import { Row, Col, Menu, Icon } from 'antd';
import Item from 'antd/lib/list/Item';
import MenuItem from 'antd/lib/menu/MenuItem';

import Router from 'next/router';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const Header = () => {
	const [navArray, setNavArray] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(servicePath.gettypeinfo).then(res => {
				console.log(res.data.data);
				return res.data.data;
			});
			setNavArray(result);
		};
		fetchData();
		// return () => {
		// 	cleanup;
		// };
	}, []);

	const handleClick = e => {
		console.log(e);
		if (e.key == 0) {
			Router.push('/index');
		} else {
			Router.push('/list?id=' + e.key);
		}
	};

	return (
		<div className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={15} xl={12}>
					<span className="header-logo">白开水</span>
					<span className="header-text">专注全栈开发</span>
				</Col>
				<Col xs={0} sm={0} md={14} lg={8} xl={6}>
					<Menu mode="horizontal" onClick={handleClick}>
						<Menu.Item key="0">
							<Icon type="home" />
							首页
						</Menu.Item>
						{navArray.map(item => {
							return (
								<Menu.Item key={item.Id}>
									<Icon type={item.icon} />
									{item.typeName}
								</Menu.Item>
							);
						})}
					</Menu>
				</Col>
			</Row>
		</div>
	);
};

export default Header;
