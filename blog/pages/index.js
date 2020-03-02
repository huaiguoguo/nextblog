import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Icon } from 'antd';
import axios from 'axios';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../public/style/pages/index.css';
import servicePath from '../config/apiUrl';
import marked from 'marked';
import Tocify from '../components/tocify.tsx';
const Home = list => {
	const tocify = new Tocify();

	const renderer = new marked.Renderer();

	renderer.heading = function(text, level, raw) {
		const anchor = tocify.add(text, level);
		return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}></h${level}></a>\n`;
	};
	marked.setOptions({
		renderer: renderer,
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value;
		}
	});

	const [myList, setMyList] = useState(list.data);
	return (
		<div className="container">
			<Head>
				<title>Create Next App kwg kwg</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
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
								<div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
							</List.Item>
						)}
					/>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />
				</Col>
			</Row>
			<Footer />
		</div>
	);
};

Home.getInitialProps = async () => {
	const promise = new Promise(resolve => {
		axios(servicePath.list)
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

export default Home;
