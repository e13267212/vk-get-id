'use strict'

let
	btnGet =  document.querySelector('.btn-get'),
	btnDl =   document.querySelector('.btn-dl')

let table = document.querySelector('table tbody')


btnGet.addEventListener('click', e => {
	table.innerHTML = '<tr class="table-info"><td colspan="2">Получение списка друзей...</td></tr>'

	btnDl.style.display = 'none'
	btnDl.setAttribute('href', 'javascript:void(0)')

	let userID = document.querySelector('.id').value

	if (!userID) {
		table.innerHTML = '<tr class="table-warning"><td colspan="2">ID пользователя не указан.</td></tr>'; return
	}

	btnDl.setAttribute('download', userID + '.txt')

	fetchJsonp(`https://api.vk.com/method/friends.get?user_id=${userID}&access_token=d166a2d8779a6a7855dc3157ee38f12f1f62e0581bac95081765a8872c48247785b706a7afe9b52a8f768&v=5.78&fields=nick`)
		.then(response => {
		response.json().then((data) => {
			if (data.error) {
				document.querySelector('table th').innerHTML = '<tr class="table-danger"><td colspan="2">Ошибка: <q>' + data.error.error_msg + '</q>.</td></tr>'; return
			}

			let friends = data.response

			let friendsList = ''

			if (friends.count == 0) {
				document.querySelector('table th').innerHTML = '<tr class="table-warning"><td colspan="2">У пользователя нет открытых друзей, или нет друзей вообще.</td></tr>'; return
			}

			document.querySelector('table th').textContent = ''
			friendsList = ""

			friends.items.forEach(friend => {
				table.innerHTML += '<tr><td>[<a href="@' + friend.id + '" target="_blank" rel="nofollow noopener">' + friend.id + '</a>]</td><td>' + friend.first_name + ' ' + friend.last_name + '</td></tr>'
				friendsList += '@' + friend.id + ' | ' + friend.first_name + ' ' + friend.last_name + '\r\n'
			})


			btnDl.style.display = 'inline-block'
			btnDl.setAttribute('href', 'data:text/plain;charset=utf-8;base64,' + base64.encode(friendsList + '\n'))
			// нативный btoa() не может в символы юникода :(
		})
	})
})

function loadFrame(){
	document.getElementById('frame').scrollTop = 310;
	document.getElementById('frame').scrollLeft = 40;
}
