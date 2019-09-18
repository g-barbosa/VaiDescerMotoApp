const puxaApi = (linha) => 
	fetch('https://noxxonsat-nxnet.appspot.com/rest/usuarios/v2?linha='+linha,{
        method: 'get',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': 'ENTRE NO SITE DA EMTU PARA PEDIR UMA CHAVE'
       }
     })
	.then(response => {return response.json()})

export default puxaApi