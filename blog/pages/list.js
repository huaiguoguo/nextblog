import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, List, Icon, Breadcrumb } from 'antd';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';

const MyList = list => {
	const [myList, setMyList] = useState(list.data);
	useEffect(() => {
		setMyList(list.data);
		// return () => {
		// 	cleanup
		// };
	});
	return (
		<div className="container">
			<Head>
				<title>Create Next App kwg kwg</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} lx={14}>
					<div className="bread-div">
						<Breadcrumb>
							<Breadcrumb.Item>
								<a href="/">首页</a>
							</Breadcrumb.Item>
							<Breadcrumb.Item>视频教程</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<List
						header={<div>最新日志</div>}
						itemLayout="vertical"
						dataSource={myList}
						renderItem={item => (
							<List.Item>
								<div className="list-title">
									<Link href={{ pathname: '/detail', query: { id: item.id } }}>
										<a>{item.title}</a>
									</Link>
								</div>
								<div className="list-icon">
									<span>
										<Icon type="calendar" />
										&nbsp;{item.addTime}&nbsp;&nbsp;
									</span>
									<span>
										<Icon type="folder" />
										&nbsp;{item.typeName}&nbsp;&nbsp;
									</span>
									<span>
										<Icon type="fire" />
										&nbsp;{item.view_count}人&nbsp;&nbsp;
									</span>
								</div>
								<div className="list-context">{item.introduce}</div>
							</List.Item>
						)}
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} lx={4}>
					<Author />
					<Advert />
				</Col>
			</Row>
			<Footer />
		</div>
	);
};

MyList.getInitialProps = async context => {
	const type_id = context.query.id;
	const promise = new Promise(resolve => {
		axios(servicePath.getlist + type_id)
			.then(res => {
				console.log('成功');
				console.log(res);
				resolve(res.data);
			})
			.catch(error => {
				console.log('error:' + error);
			});
	});
	return await promise;
};

export default MyList;
