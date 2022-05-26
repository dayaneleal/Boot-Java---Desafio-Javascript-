window.onload = () => {
  let verificaUsuario = async (usuario, senha) => {
    const url = 'js/usuario.json'

    dadosUser = await fetch(url)
    dadosUserJson = await dadosUser.json()

    for (user of dadosUserJson.users) {
      if (user.user === usuario) {
        console.log(user.pws)
        if (user.pws == senha) {
          return (window.location.href = 'panel.html')
        }
      }
    }
    return alert('Usuário não encontrado!')
  }

  let btn = document.querySelector('.btn')

  btn.addEventListener('click', () => {
    let usuario = document.querySelector('#usuario').value
    let senha = document.querySelector('#pwd').value

    verificaUsuario(usuario, senha)
  })
}
