'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
	async index() {
		this.ctx.body = 'hi api';
	}

	async checkLogin() {
		const userName = this.ctx.request.body.userName;
		const passWord = this.ctx.request.body.password;
		const sql = `select userName from admin_user where userName='${userName}' and password = '${passWord}'`;
		const res = await this.app.mysql.query(sql);
		if (res.length > 0) {
			const openId = new Date().getTime();
			this.ctx.session.openId = { openId };
			this.ctx.body = { data: '登录成功', openId };
		} else {
			this.ctx.body = { data: '登录失败' };
		}
	}
}

module.exports = MainController;
