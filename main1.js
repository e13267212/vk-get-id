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

	fetchJsonp(`https://api.vk.com/method/friends.get?user_id=${userID}&access_token=cb840a3d06c3535fb28b76ff763b12619461487b10f20b7d34e1544f813504dec8411bf2aa405ed5a308c&v=5.78&fields=nick`)
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
				friendsList += '@id' + friend.id + ' | ' + friend.first_name + ' ' + friend.last_name + '\r\n'
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
