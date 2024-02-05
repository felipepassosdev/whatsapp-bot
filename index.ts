import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

const PORT = process.env.PORT || 3000; // Utiliza a porta fornecida pelo Vercel ou 3000 localmente

const client = new Client({
  authStrategy: new LocalAuth()
});


client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session: any) => {
  console.log('Autenticado com sucesso');
  // Salvar a sessão para reutilização (em um banco de dados, por exemplo)
});

client.on('message', (message: Message) => {
  // Lógica para responder às mensagens recebidas
  if (message.body.toLowerCase() === 'oi') {
    message.reply('Olá! Como posso ajudar você?');
  }
});

client.initialize().then(() => {
  console.log(`Bot iniciado na porta ${PORT}`);
});

// Adiciona um listener para evitar que o Vercel entre em modo de inatividade
// Isso faz uma solicitação HTTP a cada 5 minutos para manter o bot ativo
if (process.env.NODE_ENV === 'production') {
  const express = require('express');
  const app = express();

  app.get('/', (req: any, res: any) => {
    res.send('Bot está ativo!');
  });

  const server = app.listen(PORT, () => {
    console.log(`Servidor Express ouvindo na porta ${PORT}`);
  });

  // Configura um listener para manter a aplicação ativa no Vercel
  setInterval(() => {
    server.emit('ping');
  }, 300000); // a cada 5 minutos
}