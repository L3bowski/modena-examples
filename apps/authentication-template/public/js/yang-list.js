$(function() {
	var itemsList = $('#yang-list');
	var createButton = $('#create-button');
	var unauthorizedMsg = $('#unauthorized-msg');

	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			itemsList.addClass('hidden');
			itemsList.empty();
			createButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasSomePermission(user, ['yang:view', 'yang:create'])) {
				if (window.application.userHasPermission(user, 'yang:view')) {
					$.ajax({
						method: 'GET',
						url: '/api/yang?$modena=authentication-template',
						dataType: 'json'
					})
					.then(function (yang) {
						yang.forEach(function(element) {
							itemsList.append('<p><a href="/yang/details?id=' + element.id + '&$modena=authentication-template">' + element.name + '</a></p>');
						});
						itemsList.removeClass('hidden');
					})
					.fail(window.application.ajaxFailHandler);
				}

				if (window.application.userHasPermission(user, 'yang:create')) {
					createButton.removeClass('hidden');
				}
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['yang:view', 'yang:create']);
	}
});