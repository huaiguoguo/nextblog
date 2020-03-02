'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const result = await this.app.mysql.get('post', {});
		console.log(result);
		const { ctx } = this;
		ctx.body = result;
	}

	async getArticleList() {
		const sql = `select article.id as id, 
												article.title as title, 
												article.introduce as introduce, 
												FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, 
												article.view_count as view_count, 
												type.typeName as typeName 
								from article LEFT JOIN type on article.type_id = type.id`;
		const result = await this.app.mysql.query(sql);
		this.ctx.body = { data: result };
	}

	async getArticleById() {
		const id = this.ctx.params.id;
		console.log('================params.id是');
		console.log(id);
		const sql = `select article.id as id, 
												article.title as title, 
												article.introduce as introduce, 
												article.article_content as content, 
												FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, 
												article.view_count as view_count, 
												type.typeName as typeName 
									from article LEFT JOIN type on article.type_id = type.id 
									where article.id=${id}`;
		console.log('sql是');
		console.log(sql);
		const result = await this.app.mysql.query(sql);
		this.ctx.body = { data: result };
	}

	async getTypeInfo() {
		const result = await this.app.mysql.select('type');
		this.ctx.body = { data: result };
	}

	async getListByTypeId() {
		const type_id = this.ctx.params.type_id;
		const sql = `select article.id as id, 
										article.title as title, 
										article.introduce as introduce, 
										article.article_content as content, 
										FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, 
										article.view_count as view_count, 
										type.typeName as typeName 
								from article LEFT JOIN type on article.type_id = type.id 
								where type_id=${type_id}`;
		const result = await this.app.mysql.query(sql);
		this.ctx.body = { data: result };
	}
}

module.exports = HomeController;
