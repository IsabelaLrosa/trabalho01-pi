class Quadra {
    constructor() { //é chamado toda vez que a classe é instanciada 
        this.quadras = JSON.parse(localStorage.getItem('tbQuadras')) || []
    }

    static fields = ['tipodequadra', 'data', 'horáriosdisponíveis', 'valorfixo', 'aluguelPago']

    salva(quadra) {
        this.quadras.push(quadra) //o push adiciona no fim do array
        localStorage.setItem('tbQuadras', JSON.stringify(this.quadras))
        alert('Aluguel salvo com sucesso ✔')
        this.lista() //atualiza a listagem 
        //limpando os campos
        document.getElementById('tipodequadra').value = ''
        document.getElementById('data').value = ''
        document.getElementById('horáriosdisponíveis').value = ''
        document.getElementById('valorfixo').value = '300.00'
        document.getElementById('aluguelPago').value = ''
    }
    lista() {
        const tbody = document.getElementById('listaQuadras')

        if (this.quadras.length == 0) { //retorna o tamanho do array
            tbody.innerHTML = '<tr><td colspan=5>Não há nenhuma informação cadastrada ainda.</td></tr>'
        } else {
            const linhas = this.quadras.map(quadra => {
                return `
        <tr>
            <td>${quadra.tipodequadra}</td> 
            <td>${new Date(quadra.data).toLocaleDateString()}</td>
            <td>${quadra.horáriosdisponíveis}</td>
            <td>${quadra.valorfixo}</td>
            <td>${quadra.aluguelPago}</td>
        </tr>
        `
            })
            tbody.innerHTML = linhas.join('')
        }
    }
}
//criando o objeto cliente
const quadra = new Quadra() //o objeto é minusculo e a classe é maiúscula (cliente=objeto; Cliente=classe)

document.getElementById('formQuadras').addEventListener('submit', (event) => {
    event.preventDefault() // evita que a página seja recarregada
    let aluguelPago = ''
    if (document.getElementById('aluguelPago').checked) {
        aluguelPago = 'Sim'
    } else {
        aluguelPago = 'Não'
    }

    const registro = {
        tipodequadra: document.getElementById('tipodequadra').value,
        data: document.getElementById('data').value,
        horáriosdisponíveis: document.getElementById('horáriosdisponíveis').value,
        valorfixo: document.getElementById('valorfixo').value,
        aluguelPago: aluguelPago
    }
    //salvando os dados 
    quadra.salva(registro)
})

//carregar a listagem automaticamente no momento que carregar a página
window.onload = function () {
    quadra.lista()
}