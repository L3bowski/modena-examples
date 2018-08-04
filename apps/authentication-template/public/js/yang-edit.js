$(function() {
	var elementWrapper = $('#element-wrapper');
	var elementId = elementWrapper.data('element-id');
	var elementName = $('#element-name');
	var actionButton = $('#action-button');
	var unauthorizedMsg = $('#unauthorized-msg');

	if (elementId && elementId != '') {
		updatePageLoad();
	}
	else {
		createPageLoad();
	}

	function createPageLoad() {
		actionButton.on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/api/yang?$modena=authentication-template',
				contentType: 'application/json',
				data: JSON.stringify({
					name: elementName.val()
				})
			})
			.then(function (element) {
				document.location.href = '/yang/details?id=' + element.id + '&$modena=authentication-template';
			})
			.fail(window.application.ajaxFailHandler);
		});

		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			actionButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasPermission(user, 'yang:create')) {
				elementWrapper.removeClass('hidden');
				actionButton.removeClass('hidden');
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['yang:create']);
	}

	function updatePageLoad() {
		actionButton.on('click', function() {
			$.ajax({
				method: 'PUT',
				url: '/api/yang?$modena=authentication-template',
				contentType: 'application/json',
				data: JSON.stringify({
					id: elementId,
					name: elementName.val()
				})
			})
			.then(function (element) {
				document.location.href = '/yang/details?id=' + element.id + '&$modena=authentication-template';
			})
			.fail(window.application.ajaxFailHandler);
		});

		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			actionButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasPermission(user, 'yang:edit')) {
				return $.ajax({
					method: 'GET',
					url: '/api/yang/getById',
					dataType: 'json',
					data: {
						id: elementId,
						$modena: 'authentication-template'
					}
				})
				.then(function (element) {
					elementName.val(element.name);
					elementWrapper.removeClass('hidden');
					actionButton.removeClass('hidden');
				})
				.fail(window.application.ajaxFailHandler);
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['yang:edit']);
	}
});