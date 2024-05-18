document.getElementById('formularioConsumo').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os valores dos inputs
    const nomeEletrodomestico = document.getElementById('nomeEletrodomestico').value;
    const potencia = parseFloat(document.getElementById('potencia').value);
    const horas = parseInt(document.getElementById('horas').value);
    
    // Verifica se os valores de potência e horas são válidos
    if (isNaN(potencia) || isNaN(horas)) {
        alert('Por favor, insira valores válidos para potência e horas.');
        return; // Interrompe a execução se os valores não forem válidos
    }

    // Verifica se o valor das horas é maior que 24
    if (horas > 24) {
        alert('O valor das horas não pode ser maior que 24.');
        return; // Interrompe a execução se o valor das horas for maior que 24
    }

    // Calculo do consumo em média
    const consumo = (potencia * horas) / 1000; // Convertendo de Watts para kWh
    
    // Calcula o valor gasto no final do mês 
    const tarifa = 0.69; // Tarifa em reais por kWh segundo a CPFL Paulista
    const custoMensal = consumo * 30 * tarifa; // Faz a conta para um resultado mensal
    
    // Função que vai mostrar o resultado
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `O consumo médio diário de ${nomeEletrodomestico} é de ${consumo.toFixed(2)} kWh.<br>`;
    elementoResultado.innerHTML += `O valor gasto no final do mês com ${nomeEletrodomestico} é de R$${custoMensal.toFixed(2)}.`;

    // Função para a listagem dos "itens"
    const elementoLista = document.getElementById('lista');
    let itemLista = elementoLista.querySelector(`li[data-nome="${nomeEletrodomestico}"]`);
    if (!itemLista) {
        itemLista = document.createElement('li');
        itemLista.dataset.nome = nomeEletrodomestico;
        // Define um ID único para o item
        const itemId = `item-${Date.now()}`;
        itemLista.id = itemId;
        elementoLista.appendChild(itemLista);
    }

    // Atualiza a contagem do item
    const quantidadeAtual = parseInt(itemLista.dataset.quantidade) || 0;
    itemLista.dataset.quantidade = quantidadeAtual + 1;

    itemLista.innerHTML = `${nomeEletrodomestico} - ${itemLista.dataset.quantidade} ${nomeEletrodomestico} - R$${custoMensal.toFixed(2)}`;

    // Adiciona botão de excluir ao item da lista
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('botao-excluir');
    // Adiciona o ID do item ao botão de exclusão
    botaoExcluir.dataset.itemId = itemLista.id;
    botaoExcluir.addEventListener('click', function() {
        const itemId = this.dataset.itemId;
        const itemExcluir = document.getElementById(itemId);
        if (itemExcluir) {
            elementoLista.removeChild(itemExcluir);
            // Recalcular o total
            const totalAtual = parseFloat(elementoTotal.textContent.split('R$')[1]) || 0; 
            const novoTotal = totalAtual - custoMensal; // Deduz o valor do item excluído do total
            elementoTotal.textContent = `Valor total (aproximado) no final do mês: R$${novoTotal.toFixed(2)}`;
            
            // Remover os dados salvos do usuário do armazenamento local
            localStorage.removeItem(nomeEletrodomestico);
        }
    });

    itemLista.appendChild(botaoExcluir); // Adiciona o botão de excluir ao item da lista

    // Faz o cálculo e soma ao total, e mostra para o usuário
    const elementoTotal = document.getElementById('total');
    const totalAtual = parseFloat(elementoTotal.textContent.split('R$')[1]) || 0; 
    const novoTotal = totalAtual + custoMensal; // Utiliza o valor antigo e soma com o novo item calculado
    elementoTotal.textContent = `Valor total (aproximado) no final do mês: R$${novoTotal.toFixed(2)}`;

    // Salvar os dados do usuário no armazenamento local (localStorage)
    const dadosUsuario = {
        nomeEletrodomestico,
        potencia,
        horas,
        consumo,
        custoMensal
    };

    localStorage.setItem(nomeEletrodomestico, JSON.stringify(dadosUsuario));
});
