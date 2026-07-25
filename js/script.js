let questoes = [];
let indiceAtual = 0;
let pontuacao = 0;

fetch('questoes.txt')
    .then(response => response.text())
    .then(data => {
        const linhas = data.split('\n');
        questoes = linhas.map(linha => {
            const partes = linha.split('|').map(p => p.trim());
            if (partes.length >= 5) {
                return {
                    pergunta: partes[0],
                    correta: partes[1],
                    opcoes: [partes[1], partes[2], partes[3], partes[4]].sort(() => Math.random() - 0.5)
                };
            }
        }).filter(q => q !== undefined);
        mostrarQuestao();
    });

function mostrarQuestao() {
    if (indiceAtual < questoes.length) {
        const q = questoes[indiceAtual];
        document.getElementById('question').innerText = q.pergunta;
        const opDiv = document.getElementById('options');
        opDiv.innerHTML = '';
        q.opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.innerText = opcao;
            btn.onclick = () => verificarResposta(btn, q.correta);
            opDiv.appendChild(btn);
        });
    } else {
        document.getElementById('quiz').innerHTML = `<h2>Fim do teste!</h2><p>Você acertou ${pontuacao} de ${questoes.length} perguntas.</p>`;
        document.getElementById('next-btn').style.display = 'none';
    }
}

function verificarResposta(botao, correta) {
    const botoes = document.getElementById('options').getElementsByTagName('button');
    for (let b of botoes) {
        if (b.innerText === correta) b.classList.add('correct');
        else if (b === botao) b.classList.add('wrong');
        b.disabled = true;
    }
    if (botao.innerText === correta) pontuacao++;
    document.getElementById('next-btn').style.display = 'block';
}

function proximaQuestao() {
    indiceAtual++;
    document.getElementById('next-btn').style.display = 'none';
    mostrarQuestao();
}
