let
	getBtn = document.querySelector('.get'),
	idField = $('.id')


getBtn.addEventListener('click', e => {
	idField.textContent = ''

	let
		link = document.querySelector('.link').value,
		name = link.replace('https:', '').replace('http:', '').replace('//', '').replace('vkontakte.ru/', '').replace('vk.com/', '')

	fetchJsonp(`https://api.vk.com/method/utils.resolveScreenName?screen_name=${name}&access_token=d166a2d8779a6a7855dc3157ee38f12f1f62e0581bac95081765a8872c48247785b706a7afe9b52a8f768&v=5.78`)
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
