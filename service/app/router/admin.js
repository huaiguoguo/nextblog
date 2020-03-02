'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.get('/admin/index', controller.admin.main.index);
	router.post('/admin/login', controller.admin.main.checkLogin);
};
