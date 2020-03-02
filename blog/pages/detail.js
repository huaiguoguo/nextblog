import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import '../public/style/pages/detail.css';
// import ReactMarkdown from 'react-markdown';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import Axios from 'axios';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx';

import servicePath from '../config/apiUrl';

const Detail = props => {
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

	let html = marked(props.content);

	let markdown = '';
	let detail = '';
	const [mydetail, setDetail] = useState(detail.data);
	return (
		<div className="container">
			<Head>
				<title>detail</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<div>
						<div className="bread-div">
							<Breadcrumb>
								<Breadcrumb.Item>
									<a href="/">首页</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>
									<a href="/">视频列表</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>xxxx</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<div className="detail-title">{props.title}</div>
							<div className="list-icon center">
								<span>
									<Icon type="calendar" />
									{detail.addTime}
								</span>
								<span>
									<Icon type="folder" />
									{detail.typeName}
								</span>
								<span>
									<Icon type="fire" />
									{detail.view_count}人
								</span>
							</div>
							<div className="detail-content" dangerouslySetInnerHTML={{ __html: html }}>
								{/* <ReactMarkdown source={markdown} escapeHtml={false} /> */}
							</div>
						</div>
					</div>
				</Col>
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />
					<Affix offsetTop={5}>
						<div className="detail-nav comm-box">
							<div className="nav-title">{detail.typeName}</div>
							{tocify && tocify.render()}
							{/* <MarkNav className="article-menu" source={html} headingTopOffset={10} ordered={false} /> */}
						</div>
					</Affix>
				</Col>
			</Row>
			<Footer />
		</div>
	);
};

Detail.getInitialProps = async context => {
	const id = context.query.id;
	const promise = new Promise(resolve => {
		Axios(servicePath.detail + id)
			.then(res => {
				resolve(res.data.data[0]);
			})
			.catch(error => {
				console.log(error);
			});
	});
	return await promise;
};

export default Detail;
