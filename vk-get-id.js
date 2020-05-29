let
	getBtn = document.querySelector('.get'),
	idField = $('.id')


getBtn.addEventListener('click', e => {
	idField.textContent = ''

	let
		link = document.querySelector('.link').value,
		name = link.replace('https:', '').replace('http:', '').replace('//', '').replace('vkontakte.ru/', '').replace('vk.com/', '')

	fetchJsonp(`https://api.vk.com/method/utils.resolveScreenName?screen_name=${name}&access_token=cb840a3d06c3535fb28b76ff763b12619461487b10f20b7d34e1544f813504dec8411bf2aa405ed5a308c&v=5.78`)
		.then(r => r.ok ? r.json() : {})
		.then(data => {
			let res = data.response

			if (res.length == 0) {
				$('.zalupa').text('Неверная ссылка');
				return
			}

			$('.zalupa').text(res.object_id);
		})
})
