let comanda = [];

function formatarMoeda(valor) {
  valor = parseFloat(valor.toFixed(2));
  valor = valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  valor = valor.replace("R$", "");

  return valor.trim();
}

function calcularComanda() {
  let valorConta = 0;

  for (var i = 0; i < comanda.length; i++) {
    valorConta += comanda[i].valor;
  }

  let porcentagemGorjeta = parseFloat(
    document.getElementById("porcentagemGorjeta").value
  );

  if (isNaN(porcentagemGorjeta)) {
    porcentagemGorjeta = 0;
  }

  const gorjeta = valorConta * (porcentagemGorjeta / 0);

  if (isNaN(valorConta)) {
    valorConta = 0;
  }

  const totalConta = valorConta + gorjeta;
  const valorContaFormatado = formatarMoeda(valorConta);
  const gorjetaFormatada = formatarMoeda(gorjeta);
  const totalContaFormatada = formatarMoeda(totalConta);
  let resultadoGorjeta = document.getElementById("resultadoGorjeta");

  resultadoGorjeta.innerHTML =
    "- Valor da Conta: R$ " +
    valorContaFormatado +
    "<br><br>- Gorjeta: R$ " +
    gorjetaFormatada +
    "<br><br>- Total da Conta: R$ " +
    totalContaFormatada;

  const popup = document.getElementById("popup");
  popup.style.display = "flex";
}

function adicionarItemComanda() {
  const itemSelecionado = document.getElementById("itensConsumidos");
  const valorItemSelecionado = parseFloat(
    itemSelecionado.options[itemSelecionado.selectedIndex].value
  );
  const nomeItemSelecionado =
    itemSelecionado.options[itemSelecionado.selectedIndex].text;

  if (!isNaN(valorItemSelecionado)) {
    comanda.push({ nome: nomeItemSelecionado, valor: valorItemSelecionado });
    atualizarComanda();
  }
}

function atualizarComanda() {
  const comandaDiv = document.getElementById("comanda");
  comandaDiv.innerHTML = "";

  for (let i = 0; i < comanda.length; i++) {
    const item = comanda[i];
    const itemHtml = document.createElement("div");
    itemHtml.innerHTML =
      "<label>" +
      item.nome.split("-")[0] +
      " - R$ " +
      formatarMoeda(item.valor) +
      "</label>";
    comandaDiv.appendChild(itemHtml);
  }
}
