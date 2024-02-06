import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

const client = new Client({
  authStrategy: new LocalAuth()
});


client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session: any) => {
  console.log('Autenticado com sucesso');
  // Salve a sessão para reutilização
  // Pode ser armazenado em um banco de dados ou arquivo
});

client.on('message', (message: Message) => {
  // Lógica para responder às mensagens recebidas
  if (message.body.toLowerCase() === 'oi') {
    message.reply('Olá! Como posso ajudar você?');
  }
});

client.initialize();