$(function() {
	var itemsList = $('#ying-list');
	var createButton = $('#create-button');
	var unauthorizedMsg = $('#unauthorized-msg');

	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			itemsList.addClass('hidden');
			itemsList.empty();
			createButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasSomePermission(user, ['ying:view', 'ying:create'])) {
				if (window.application.userHasPermission(user, 'ying:view')) {
					$.ajax({
						method: 'GET',
						url: '/modena-authentication-template/api/ying',
						dataType: 'json'
					})
					.then(function (ying) {
						ying.forEach(function(element) {
							itemsList.append('<p><a href="/modena-authentication-template/ying/details?id=' + element.id + '">' + element.name + '</a></p>');
						});
						itemsList.removeClass('hidden');
					})
					.fail(window.application.ajaxFailHandler);
				}

				if (window.application.userHasPermission(user, 'ying:create')) {
					createButton.removeClass('hidden');
				}
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['ying:view', 'ying:create']);
	}
});