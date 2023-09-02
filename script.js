function registrarEntrada() {
  const email = document.getElementById("inputEmail").value;
  
  // Implemente aqui a lógica para registrar a entrada com o email capturado
  
  // Atualize #entradaStatus com o resultado
}

// Código para iniciar o scanner
const videoElement = document.getElementById('camera');
const scanner = new Instascan.Scanner({ video: videoElement });

scanner.addListener('scan', function (content) {
  // Aqui você captura o conteúdo do QR Code (por exemplo, um número de telefone)
  const qrCodeContent = content;

  // Atualize o campo de email com o conteúdo do QR Code
  document.getElementById("inputEmail").value = qrCodeContent;
});

// Inicialize o scanner
Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
      scanner.start(cameras[0]);
  } else {
      alert('Nenhuma câmera encontrada no dispositivo.');
  }
});
