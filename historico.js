// Referencie os elementos dos dias da semana e da área de agendamentos
const diasDaSemana = document.querySelectorAll('#dias-da-semana li');
const agendamentosDoDia = document.getElementById('agendamentos-do-dia');

// Simule dados de agendamentos (substitua com seus próprios dados)
const agendamentos = {
  segunda: ["Agendamento 1", "Agendamento 2"],
  terca: ["Agendamento 3", "Agendamento 4"],
  quarta: ["Agendamento 5"],
  quinta: ["Agendamento 6", "Agendamento 7"],
  sexta: [],
};

// Função para mostrar os agendamentos do dia selecionado
function mostrarAgendamentos(dia) {
  agendamentosDoDia.innerHTML = ''; // Limpa a área de agendamentos

  if (agendamentos[dia]) {
    agendamentos[dia].forEach((agendamento) => {
      const itemAgendamento = document.createElement('div');
      itemAgendamento.textContent = agendamento;
      agendamentosDoDia.appendChild(itemAgendamento);
    });
  } else {
    agendamentosDoDia.textContent = 'Não há agendamentos para este dia.';
  }
}

// Adicione um manipulador de eventos a cada dia da semana
diasDaSemana.forEach((dia) => {
  dia.addEventListener('click', () => {
    const diaSelecionado = dia.id;
    mostrarAgendamentos(diaSelecionado);
  });
});

// Adicione um evento de clique para destacar o dia clicado
const dias = document.querySelectorAll('.dia');

dias.forEach(dia => {
  dia.addEventListener('click', () => {
    // Remova a classe "clicado" de todos os dias
    dias.forEach(outroDia => {
      outroDia.classList.remove('clicado');
    });

    // Adicione a classe "clicado" apenas ao dia clicado
    dia.classList.add('clicado');
  });
});
