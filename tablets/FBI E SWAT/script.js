const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const formInvestigacao = document.getElementById("formInvestigacao");
const mensagemInvestigacao = document.getElementById("mensagemInvestigacao");
const formDenuncia = document.getElementById("formDenuncia");
const mensagemDenuncia = document.getElementById("mensagemDenuncia");

// WEBHOOKS SEPARADOS
const WEBHOOK_RECRUTAMENTO = "https://discord.com/api/webhooks/1507515528720285806/c24BWBsX1sEdaXGHntnbAhNUD_ct1jewdsyfpdeaJ3hZBCdS7WCqzYBwdoZX40DmuiF-";
const WEBHOOK_INVESTIGACAO = "https://discord.com/api/webhooks/1507515224133996655/QD8oALyK_wDNvQHLCrRyv4EIFvZo12uYDDX3BTLdxH4yOl1NCEJocAgoO1QikSac3f2G";
const WEBHOOK_DENUNCIA = "https://discord.com/api/webhooks/1507515022639763506/LfzVzRyIDiaN51uMIvZWONc7zKDvy4nFQQxTucJMTPvfoocIzv69G7p-kHY6sJ5H0a3m";

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

function pegarValor(id) {
  const campo = document.getElementById(id);
  return campo && campo.value.trim() ? campo.value.trim() : "Não informado";
}

function pegarSelecionados(id) {
  const campo = document.getElementById(id);
  if (!campo) return "Não informado";

  const selecionados = Array.from(campo.selectedOptions).map((option) => option.value);
  return selecionados.length ? selecionados.join(", ") : "Não informado";
}

function limitarTexto(texto, limite = 1024) {
  if (!texto) return "Não informado";
  return texto.length > limite ? texto.substring(0, limite - 3) + "..." : texto;
}

function mostrarErro(elemento, texto) {
  if (!elemento) return;
  elemento.classList.add("erro");
  elemento.textContent = texto;
}

function mostrarSucesso(elemento, texto) {
  if (!elemento) return;
  elemento.classList.remove("erro");
  elemento.textContent = texto;
}

async function enviarDiscord(webhook, payload, elementoMensagem, formularioParaLimpar) {
  if (!webhook || webhook.includes("COLE")) {
    mostrarErro(elementoMensagem, "❌ Coloque o Webhook correto no script.js.");
    return;
  }

  try {
    const resposta = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resposta.ok) throw new Error("Erro ao enviar");

    mostrarSucesso(elementoMensagem, "✅ Enviado para o Discord com sucesso!");
    if (formularioParaLimpar) formularioParaLimpar.reset();
  } catch (erro) {
    mostrarErro(elementoMensagem, "❌ Erro ao enviar. Confira se o Webhook está correto.");
  }
}

async function enviarDiscordComArquivos(webhook, payload, arquivos, elementoMensagem, formularioParaLimpar) {
  if (!webhook || webhook.includes("COLE")) {
    mostrarErro(elementoMensagem, "❌ Coloque o Webhook correto no script.js.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("payload_json", JSON.stringify(payload));

    Array.from(arquivos).forEach((arquivo, index) => {
      formData.append(`files[${index}]`, arquivo, arquivo.name);
    });

    const resposta = await fetch(webhook, {
      method: "POST",
      body: formData,
    });

    if (!resposta.ok) throw new Error("Erro ao enviar arquivos");

    mostrarSucesso(elementoMensagem, "✅ Denúncia enviada com provas para o Discord!");
    if (formularioParaLimpar) formularioParaLimpar.reset();
  } catch (erro) {
    mostrarErro(elementoMensagem, "❌ Erro ao enviar denúncia. Confira o Webhook e o tamanho dos arquivos.");
  }
}

// RECRUTAMENTO
if (formulario) {
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      username: "FBI RECRUTAMENTO",
      embeds: [{
        title: "📋 Nova inscrição FBI",
        color: 3447003,
        fields: [
          { name: "👤 Nome RP", value: limitarTexto(pegarValor("nome")), inline: true },
          { name: "🎂 Idade", value: limitarTexto(pegarValor("idade")), inline: true },
          { name: "💬 Discord", value: limitarTexto(pegarValor("discord")), inline: true },
          { name: "🆔 ID no jogo", value: limitarTexto(pegarValor("idgame")), inline: true },
          { name: "⏰ Tempo online", value: limitarTexto(pegarValor("tempo")), inline: true },
          { name: "🏴 Facções", value: limitarTexto(pegarValor("faccoes")), inline: true },
          { name: "🎙️ Microfone", value: limitarTexto(pegarValor("microfone")), inline: true },
          { name: "🚓 Experiência policial", value: limitarTexto(pegarValor("experiencia")), inline: true },
          { name: "🏛️ Departamento", value: limitarTexto(pegarValor("departamento")), inline: true },
          { name: "📝 Motivo", value: limitarTexto(pegarValor("motivo")), inline: false },
          { name: "❓ Função do FBI", value: limitarTexto(pegarValor("funcao_fbi")), inline: false },
          { name: "🚨 Suspeito alterado", value: limitarTexto(pegarValor("suspeito_alterado")), inline: false },
          { name: "🔎 Prova de crime", value: limitarTexto(pegarValor("prova_crime")), inline: false },
          { name: "📦 Cadeia de custódia", value: limitarTexto(pegarValor("cadeia_custodia")), inline: false },
          { name: "🔫 Suspeito armado", value: limitarTexto(pegarValor("suspeito_armado")), inline: false },
          { name: "🚑 Parceiro ferido", value: limitarTexto(pegarValor("parceiro_ferido")), inline: false },
          { name: "🛡️ Operação com refém", value: limitarTexto(pegarValor("operacao_refem")), inline: false },
          { name: "⭐ Profissionalismo", value: limitarTexto(pegarValor("profissionalismo")), inline: false },
        ],
        footer: { text: "Sistema FBI FiveM • Recrutamento" },
        timestamp: new Date().toISOString(),
      }]
    };

    await enviarDiscord(WEBHOOK_RECRUTAMENTO, payload, mensagem, formulario);
  });
}

// INVESTIGAÇÃO
if (formInvestigacao) {
  formInvestigacao.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      username: "FBI INVESTIGAÇÃO",
      embeds: [{
        title: "🕵️ Nova investigação aberta",
        color: 15158332,
        fields: [
          { name: "👮 Agente responsável", value: limitarTexto(pegarValor("agente")), inline: true },
          { name: "⭐ Cargo/Patente", value: limitarTexto(pegarValor("cargo")), inline: true },
          { name: "💬 Discord do agente", value: limitarTexto(pegarValor("discordAgente")), inline: true },
          { name: "👤 Suspeito", value: limitarTexto(pegarValor("suspeito")), inline: true },
          { name: "🆔 ID do suspeito", value: limitarTexto(pegarValor("idSuspeito")), inline: true },
          { name: "🏴 Organização", value: limitarTexto(pegarValor("organizacao")), inline: true },
          { name: "📁 Tipo da investigação", value: limitarTexto(pegarValor("tipoInvestigacao")), inline: true },
          { name: "⚠️ Prioridade", value: limitarTexto(pegarValor("prioridade")), inline: true },
          { name: "📍 Local", value: limitarTexto(pegarValor("localOcorrencia")), inline: true },
          { name: "📅 Data da ocorrência", value: limitarTexto(pegarValor("dataOcorrencia")), inline: true },
          { name: "📌 Status", value: limitarTexto(pegarValor("statusInvestigacao")), inline: true },
          { name: "📖 Relato", value: limitarTexto(pegarValor("relato")), inline: false },
          { name: "🧾 Provas coletadas", value: limitarTexto(pegarValor("provas")), inline: false },
          { name: "👥 Testemunhas", value: limitarTexto(pegarValor("testemunhas")), inline: false },
          { name: "✅ Medidas tomadas", value: limitarTexto(pegarValor("medidas")), inline: false },
          { name: "📝 Observações", value: limitarTexto(pegarValor("observacoes")), inline: false },
        ],
        footer: { text: "Sistema FBI FiveM • Investigação" },
        timestamp: new Date().toISOString(),
      }]
    };

    await enviarDiscord(WEBHOOK_INVESTIGACAO, payload, mensagemInvestigacao, formInvestigacao);
  });
}

// DENÚNCIA
if (formDenuncia) {
  formDenuncia.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputArquivos = document.getElementById("arquivosProvasDenuncia");
    const arquivos = inputArquivos ? inputArquivos.files : [];

    const payload = {
      username: "FBI DENÚNCIAS",
      embeds: [{
        title: "🚨 Nova denúncia recebida",
        color: 16711680,
        fields: [
          { name: "👤 Quem abriu a denúncia", value: limitarTexto(pegarValor("nomeDenunciante")), inline: true },
          { name: "🆔 Passaporte", value: limitarTexto(pegarValor("passaporte")), inline: true },
          { name: "📞 Telefone", value: limitarTexto(pegarValor("telefone")), inline: true },
          { name: "🎯 Nome do suspeito", value: limitarTexto(pegarValor("nomeSuspeitoDenuncia")), inline: true },
          { name: "⚖️ Crimes selecionados", value: limitarTexto(pegarSelecionados("crimesDenuncia")), inline: false },
          { name: "📝 Descrição", value: limitarTexto(pegarValor("descricaoDenuncia")), inline: false },
          { name: "🔗 Links das provas", value: limitarTexto(pegarValor("linksProvas")), inline: false },
        ],
        footer: { text: "Sistema FBI FiveM • Denúncias" },
        timestamp: new Date().toISOString(),
      }]
    };

    if (arquivos && arquivos.length > 0) {
      await enviarDiscordComArquivos(WEBHOOK_DENUNCIA, payload, arquivos, mensagemDenuncia, formDenuncia);
    } else {
      await enviarDiscord(WEBHOOK_DENUNCIA, payload, mensagemDenuncia, formDenuncia);
    }
  });
}
