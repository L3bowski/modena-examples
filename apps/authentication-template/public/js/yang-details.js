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
				url: '/api/yang?$modena=authentication-template',
				contentType: 'application/json',
				data: JSON.stringify({
					id: elementId
				})
			})
			.then(function (element) {
				document.location.href = '/yang?$modena=authentication-template';
			})
			.fail(window.application.ajaxFailHandler);
		});

		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			editButton.addClass('hidden');
			deleteButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user&& window.application.userHasSomePermission(user, ['yang:view', 'yang:edit', 'yang:delete'])) {
				if (window.application.userHasPermission(user, 'yang:view')) {
					$.ajax({
						method: 'GET',
						url: '/api/yang/getById',
						dataType: 'json',
						data: {
							id: elementWrapper.data('element-id'),
							$modena: 'authentication-template'
						}
					})
					.then(function (element) {
						elementWrapper.html(element.name);
						elementWrapper.removeClass('hidden');
					})
					.fail(window.application.ajaxFailHandler);
				}

				if (window.application.userHasPermission(user, 'yang:edit')) {
					editButton.removeClass('hidden');
				}

				if (window.application.userHasPermission(user, 'yang:delete')) {
					deleteButton.removeClass('hidden');
				}
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['yang:view', 'yang:edit', 'yang:delete']);
	}
});