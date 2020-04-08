module.exports.index = function(app, request, response) {
	var connection = app.config.dbConnection()
	var noticiasDao = new app.app.models.NoticiasDAO(connection)

	noticiasDao.getCincoUltimasNoticias(function(error, result){
		response.render("home/index", {noticias : result})
	})
}