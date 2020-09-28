/**
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 回调方法
 */
exports.addData = function (model, conditions) {

	return new Promise((resolve, reject) => {

		model.create(conditions, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共populate Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 回调方法
 */
exports.addDataPopulate = function (model, conditions, path) {

	return new Promise((resolve, reject) => {

		model.create(conditions, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results.execPopulate(path));

			}

		});

	});

}

/**
 * 公共update方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param update 更新条件{set{id:xxx}}
 * @param options
 */
exports.updateData = function (model, conditions, update, options) {

	return new Promise((resolve, reject) => {

		model.update(conditions, update, options, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共remove方法
 * @param model
 * @param conditions
 */
exports.removeData = function (model, conditions) {

	return new Promise((resolve, reject) => {

		model.remove(conditions, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 */
exports.findData = function (model, conditions, fields, options) {

	return new Promise((resolve, reject) => {

		model.find(conditions, fields, options, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共findOneAndUpdate方法
 * @param model
 * @param conditions
 * @param update
 * @param options
 */
exports.findOneAndUpdateData = function (model, conditions, update, options) {

	return new Promise((resolve, reject) => {

		model.findOneAndUpdate(conditions, update, options, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共populate findOneAndUpdate方法
 * @param model
 * @param conditions
 * @param update
 * @param options
 * @param path
 */
exports.findOneAndUpdateDataPopulate = function (model, conditions, update, options ,path) {

	return new Promise((resolve, reject) => {

		model.findOneAndUpdate(conditions, update, options).populate(path).exec((error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共countDocuments方法
 * @param model
 * @param conditions
 */
exports.countData = function (model, conditions) {

	return new Promise((resolve, reject) => {

		model.countDocuments(conditions, (error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}

/**
 * 公共populate find方法
 * 是关联查找
 * @param model
 * @param conditions
 * @param fields
 * @param options
 * @param path :The field need to be refilled （需要覆盖的字段）
 * @param pop_fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in)
 * @param pop_refmodel （关联的字段，有path可为null）
 * @param pop_options
 */
exports.findDataPopulation = function (model, conditions, fields, options, path, pop_fields, pop_refmodel, pop_options) {

	return new Promise((resolve, reject) => {

		model.find(conditions, fields, options).populate(path, pop_fields, pop_refmodel, pop_options).exec((error, results) => {

			if (error) {

				reject(error);

			} else {

				resolve(results);

			}

		});

	});

}
