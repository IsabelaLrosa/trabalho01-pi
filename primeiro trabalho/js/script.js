class Cliente {
    constructor() { //é chamado toda vez que a classe é instanciada 
        this.clientes = JSON.parse(localStorage.getItem('tbClientes')) || []
    }

    static fields = ['nome', 'nascimento', 'estadocivil', 'sexo']

    salva(cliente) {
        this.clientes.push(cliente) //o push adiciona no fim do array
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso ✔')
        this.lista() //atualiza a listagem 
        //limpando os campos
        document.getElementById('nome').value = ''
        document.getElementById('nascimento').value = ''
        document.getElementById('estadocivil').value = ''
    }

    lista() {
        const tbody = document.getElementById('listaClientes')
        if (this.clientes.length == 0) {
            tbody.innerHTML = '<tr><td colspan=4> Não há nenhum cadastro ainda</td></tr>'
        } else {
            const linhas = this.clientes.map(cliente => {
                return `
        <tr>
            <td>${cliente.nome}</td> 
            <td>${new Date(cliente.nascimento).toLocaleDateString()}</td>
            <td>${cliente.estadocivil}</td>
            <td>${cliente.sexo}</td>
        </tr>
        `
            })
            tbody.innerHTML = linhas.join('')
        }
    }
}
//criando o objeto cliente
const cliente = new Cliente() //o objeto é minusculo e a classe é maiúscula (cliente=objeto; Cliente=classe)

document.getElementById('formCliente').addEventListener('submit', (event) => {
    event.preventDefault() // evita que a página seja recarregada
    let valorSexo = ''
    if (document.getElementById('masculino').checked) {
        valorSexo = 'Masculino'
    } else {
        valorSexo = 'Feminino'
    }

    const registro = {
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        estadocivil: document.getElementById('estadocivil').value,
        sexo: valorSexo
    }
    //salvando os dados 
    cliente.salva(registro)
})

//carregar a listagem automaticamente no momento que carregar a página
window.onload = function () {
    cliente.lista()
}