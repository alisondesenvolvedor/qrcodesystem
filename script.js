// Função para registrar a entrada do funcionário
function registrarEntrada() {
  // Aqui você obtém o valor do campo de entrada de email
  const email = document.getElementById("inputEmail").value;

  // Verifica se o navegador suporta localStorage
  if (typeof(Storage) !== "undefined") {
      // Recupera o histórico de emails (se existir)
      let historicoEmails = JSON.parse(localStorage.getItem("historicoEmails")) || [];
      
      // Adiciona o novo email ao histórico
      historicoEmails.push(email);

      // Limita o histórico a no máximo 5 emails
      if (historicoEmails.length > 5) {
          historicoEmails = historicoEmails.slice(-5);
      }

      // Armazena o histórico de emails atualizado
      localStorage.setItem("historicoEmails", JSON.stringify(historicoEmails));

      // Limpa o campo de entrada
      document.getElementById("inputEmail").value = "";

      // Atualize o histórico de emails exibido
      carregarHistoricoEmails();
  } else {
      alert("Seu navegador não suporta armazenamento local. Não é possível salvar o email.");
  }
}


// Função para carregar e exibir o histórico de emails
function carregarHistoricoEmails() {
  if (typeof(Storage) !== "undefined") {
      const historicoEmails = JSON.parse(localStorage.getItem("historicoEmails")) || [];
      const historicoList = document.getElementById("historicoEmailList");
      historicoList.innerHTML = "";

      // Exibe o histórico de emails no estilo de lista
      historicoEmails.forEach(function(email) {
          const listItem = document.createElement("li");
          listItem.textContent = email;
          listItem.addEventListener("click", function() {
              // Preenche o campo de entrada com o email clicado
              document.getElementById("inputEmail").value = email;
          });
          historicoList.appendChild(listItem);
      });
  }
}

// Chame a função para carregar o histórico de emails ao carregar a página
window.addEventListener('load', carregarHistoricoEmails);

// Função para abrir a câmera e capturar o QR Code
function abrirCamera() {
  const scanner = new Instascan.Scanner({ video: document.getElementById('camera') });

  scanner.addListener('scan', function (content) {
      // Aqui você capturou o conteúdo do QR Code
      // Pode ser o número de telefone ou email
      const email = content;

      // Verifica se o navegador suporta localStorage
      if (typeof(Storage) !== "undefined") {
          // Recupera o histórico de emails (se existir)
          let historicoEmails = JSON.parse(localStorage.getItem("historicoEmails")) || [];
          
          // Adiciona o novo email ao histórico
          historicoEmails.push(email);

          // Limita o histórico a no máximo 5 emails
          if (historicoEmails.length > 5) {
              historicoEmails = historicoEmails.slice(-5);
          }

          // Armazena o histórico de emails atualizado
          localStorage.setItem("historicoEmails", JSON.stringify(historicoEmails));

          // Atualize o histórico de emails exibido
          carregarHistoricoEmails();
      } else {
          alert("Seu navegador não suporta armazenamento local. Não é possível salvar o email.");
      }

      // Pare o scanner após a captura do QR Code
      scanner.stop();
  });

  // Inicie o scanner
  Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
          scanner.start(cameras[0]);
      } else {
          alert('Nenhuma câmera encontrada no dispositivo.');
      }
  });
}
