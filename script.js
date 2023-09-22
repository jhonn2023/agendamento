let pendenteAgendamentos = [];
let concluidaAgendamentos = [];
let editingIndex = -1;

function agendar() {
  if (editingIndex !== -1) {
    salvarEdicao();
  } else {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const horario = document.getElementById("horario").value;
    const professor = document.getElementById("profe").value;

    // Obter os dias da semana selecionados
    const diasSemana = [];
    const checkboxes = document.getElementsByName("diasSemana");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        diasSemana.push(checkboxes[i].value);
      }
    }

    // Verificar se pelo menos um dia da semana foi selecionado
    if (diasSemana.length === 0) {
      alert("Por favor, selecione pelo menos um dia da semana");
      return;
    }

    const agendamento = { nome, telefone, horario, professor, diasSemana };
    pendenteAgendamentos.push(agendamento);

    updatePendenteList();
    limparCampos();
  }
}

function salvarEdicao() {
  if (editingIndex !== -1) {
    const agendamentoEditado = {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      horario: document.getElementById("horario").value,
      professor: document.getElementById("profe").value,
      diasSemana: [], // Reinicializa os dias da semana
    };

    // Obter os dias da semana selecionados
    const checkboxes = document.getElementsByName("diasSemana");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        agendamentoEditado.diasSemana.push(checkboxes[i].value);
      }
    }

    pendenteAgendamentos[editingIndex] = agendamentoEditado;
    editingIndex = -1;

    updatePendenteList();
    limparCampos();

    const botaoAgendar = document.querySelector("button[onclick='agendar()']");
    botaoAgendar.textContent = "Agendar";
  }
}

function preencherCamposParaEdicao(index) {
  const agendamento = pendenteAgendamentos[index];
  document.getElementById("nome").value = agendamento.nome;
  document.getElementById("telefone").value = agendamento.telefone;
  document.getElementById("horario").value = agendamento.horario;
  document.getElementById("profe").value = agendamento.professor;

  // Marcar os checkboxes para os dias da semana selecionados
  const checkboxes = document.getElementsByName("diasSemana");
  for (let i = 0; i < checkboxes.length; i++) {
    if (agendamento.diasSemana.includes(checkboxes[i].value)) {
      checkboxes[i].checked = true;
    } else {
      checkboxes[i].checked = false;
    }
  }
}

function editarAgendamento(index) {
  editingIndex = index;
  preencherCamposParaEdicao(index);

  const botaoAgendar = document.querySelector("button[onclick='agendar()']");
  botaoAgendar.textContent = "Salvar Edição";
}

function concluirAgendamento(index) {
  const agendamento = pendenteAgendamentos.splice(index, 1)[0];
  concluidaAgendamentos.push(agendamento);

  updatePendenteList();
  updateConcluidaList();
}

function excluirAgendamento(agendamento) {
  const index = concluidaAgendamentos.indexOf(agendamento);
  concluidaAgendamentos.splice(index, 1);
  updateConcluidaList();
}

function updatePendenteList() {
  const pendenteList = document.getElementById("pendente-list");
  pendenteList.innerHTML = "";

  pendenteAgendamentos.forEach((agendamento, index) => {
    const li = document.createElement("li");
    li.textContent = `${agendamento.nome} - ${agendamento.horario}`;

    // Mostrar os dias da semana selecionados
    const dias = document.createElement("p");
    dias.textContent = `Dias: ${agendamento.diasSemana.join(", ")}`;

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.addEventListener("click", () => editarAgendamento(index));

    const concluirBtn = document.createElement("button");
    concluirBtn.textContent = "Concluir";
    concluirBtn.addEventListener("click", () => concluirAgendamento(index));

    li.appendChild(dias); // Adicionar os dias da semana ao elemento da lista
    li.appendChild(editarBtn);
    li.appendChild(concluirBtn);

    pendenteList.appendChild(li);
  });
}

function updateConcluidaList() {
  const concluidaList = document.getElementById("concluida-list");
  concluidaList.innerHTML = "";

  concluidaAgendamentos.forEach((agendamento) => {
    const li = document.createElement("li");
    li.textContent = `${agendamento.nome} - ${agendamento.horario}`;

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.addEventListener("click", () => excluirAgendamento(agendamento));

    li.appendChild(excluirBtn);

    concluidaList.appendChild(li);
  });
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("horario").value = "";
  document.getElementById("profe").value = "";

  // Desmarcar os checkboxes
  const checkboxes = document.getElementsByName("diasSemana");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function mostrarDetalhes(index) {
  const agendamento = concluidaAgendamentos[index];
  document.getElementById("detalhes-nome").textContent = agendamento.nome;
  document.getElementById("detalhes-telefone").textContent = agendamento.telefone;
  document.getElementById("detalhes-horario").textContent = agendamento.horario;
  document.getElementById("detalhes-professor").textContent = agendamento.professor;
  document.getElementById("detalhes-dias").textContent = agendamento.diasSemana.join(", ");

  document.getElementById("detalhes-agendamento").style.display = "block";
}

function fecharDetalhes() {
  document.getElementById("detalhes-agendamento").style.display = "none";
}

updatePendenteList();
updateConcluidaList();
function updateConcluidaList() {
  const concluidaList = document.getElementById("concluida-list");
  concluidaList.innerHTML = "";

  concluidaAgendamentos.forEach((agendamento, index) => {
    const li = document.createElement("li");
    li.textContent = `${agendamento.nome} - ${agendamento.horario}`;

    const verMaisBtn = document.createElement("button");
    verMaisBtn.textContent = "Ver mais";
    verMaisBtn.id = "ver-mais-btn";
    verMaisBtn.addEventListener("click", () => mostrarDetalhes(index));

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.addEventListener("click", () => excluirAgendamento(agendamento));

    li.appendChild(verMaisBtn);
    li.appendChild(excluirBtn);

    concluidaList.appendChild(li);
  });
}




