'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	const adminauth = app.middleware.adminauth();
	router.get('/admin/index', adminauth, controller.admin.main.index);
	router.post('/admin/login', controller.admin.main.checkLogin);
	router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
	router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
	router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
};
