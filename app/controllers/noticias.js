module.exports.noticias = function(app, request, response) {
	var connection = app.config.dbConnection()
	var noticiasDAO = new app.app.models.NoticiasDAO(connection)
	noticiasDAO.getNoticias(function(error, result){
		response.render("noticias/noticias", {noticias : result})
	})
}

module.exports.noticia = function(app, request, response) {
	var connection = app.config.dbConnection()
	var noticiasDAO = new app.app.models.NoticiasDAO(connection)
	var id_noticia = request.query
	noticiasDAO.getNoticia(id_noticia, function(error, result){
		response.render("noticias/noticia", {noticia : result})
	})
}