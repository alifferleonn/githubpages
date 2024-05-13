document.getElementById('formularioConsumo').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os valores dos inputs
    const nomeEletrodomestico = document.getElementById('nomeEletrodomestico').value;
    const potencia = parseInt(document.getElementById('potencia').value);
    const horas = parseInt(document.getElementById('horas').value);
    
    // Calcula o consumo médio diário em kWh
    const consumo = (potencia * horas) / 1000; // Convertendo de Watts para kWh
    
    // Calcula o valor gasto no final do mês (considerando uma tarifa de R$0,50 por kWh)
    const tarifa = 0.69; // Tarifa em reais por kWh
    const custoMensal = consumo * 30 * tarifa; // Multiplica pelo número de dias no mês
    
    // Exibe o resultado
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `O consumo médio diário de ${nomeEletrodomestico} é de ${consumo.toFixed(2)} kWh.<br>`;
    elementoResultado.innerHTML += `O valor gasto no final do mês com ${nomeEletrodomestico} é de R$${custoMensal.toFixed(2)}.`;

    // Adiciona o item à lista
    const elementoLista = document.getElementById('lista');
    const itemLista = document.createElement('li');
    itemLista.textContent = `${nomeEletrodomestico} - R$${custoMensal.toFixed(2)}`;
    elementoLista.appendChild(itemLista);

    // Calcula o total e exibe
    const elementoTotal = document.getElementById('total');
    const totalAtual = parseFloat(elementoTotal.textContent.split('R$')[1]) || 0; // Extrai o valor numérico atual do total
    const novoTotal = totalAtual + custoMensal;
    elementoTotal.textContent = `Valor total (aproximado) no final do mês: R$${novoTotal.toFixed(2)}`;
});
