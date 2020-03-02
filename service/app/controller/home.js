'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}
	async list() {
		const { ctx } = this;
		ctx.body = '哈哈';
	}
	async test() {
		const { ctx } = this;
		ctx.body = 'test';
	}
}

module.exports = HomeController;
