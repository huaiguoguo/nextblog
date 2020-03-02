'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.get('/default/index', controller.default.home.index);
	router.get('/default/list', controller.default.home.getArticleList);
	router.get('/default/detail/:id', controller.default.home.getArticleById);
	router.get('/default/gettypeinfo', controller.default.home.getTypeInfo);
	router.get('/default/getlist/:type_id', controller.default.home.getListByTypeId);
};
