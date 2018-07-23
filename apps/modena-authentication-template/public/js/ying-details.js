$(function() {
	var elementWrapper = $('#element-wrapper');
	var elementId = elementWrapper.data('element-id');
	var editButton = $('#edit-element');
	var deleteButton = $('#delete-element');
	var unauthorizedMsg = $('#unauthorized-msg');
	
	pageLoad();

	function pageLoad() {

		deleteButton.on('click', function() {
			$.ajax({
				method: 'DELETE',
				url: '/modena-authentication-template/api/ying',
				contentType: 'application/json',
				data: JSON.stringify({
					id: elementId
				})
			})
			.then(function (element) {
				document.location.href = '/modena-authentication-template/ying/';
			})
			.fail(window.application.ajaxFailHandler);
		});

		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			editButton.addClass('hidden');
			deleteButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasSomePermission(user, ['ying:view', 'ying:edit', 'ying:delete'])) {
				if (window.application.userHasPermission(user, 'ying:view')) {
					$.ajax({
						method: 'GET',
						url: '/modena-authentication-template/api/ying/getById',
						dataType: 'json',
						data: {
							id: elementWrapper.data('element-id')
						}
					})
					.then(function (element) {
						elementWrapper.html(element.name);
						elementWrapper.removeClass('hidden');
					})
					.fail(window.application.ajaxFailHandler);
				}

				if (window.application.userHasPermission(user, 'ying:edit')) {
					editButton.removeClass('hidden');
				}

				if (window.application.userHasPermission(user, 'ying:delete')) {
					deleteButton.removeClass('hidden');
				}
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['ying:view', 'ying:edit', 'ying:delete']);
	}
});