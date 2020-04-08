module.exports.formulario_inclusao_noticia = function(app, request, response) {
	response.render("admin/form_add_noticia", {validacao : {}, noticia: {}})
}

module.exports.noticias_salvar = function(app, request, response){
	var noticia = request.body

	request.assert('titulo', 'Título é obrigatório').notEmpty()
	request.assert('resumo', 'Resumo é obrigatório').notEmpty()
	request.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100)
	request.assert('autor', 'Autor é obrigatório').notEmpty()
	request.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'})
	request.assert('noticia', 'Noticia é obrigatório').notEmpty()

	var errors = request.validationErrors()

	if (errors) {
		response.render("admin/form_add_noticia", {validacao : errors, noticia : noticia})
		return;
	}

	var connection = app.config.dbConnection()
	var noticiasDAO = new app.app.models.NoticiasDAO(connection)

	noticiasDAO.salvarNoticia(noticia,function(error, result){
		response.redirect('/noticias')
	})
}