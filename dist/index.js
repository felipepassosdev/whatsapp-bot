"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode = __importStar(require("qrcode-terminal"));
const PORT = process.env.PORT || 3000; // Utiliza a porta fornecida pelo Vercel ou 3000 localmente
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth()
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('authenticated', (session) => {
    console.log('Autenticado com sucesso');
    // Salvar a sessão para reutilização (em um banco de dados, por exemplo)
});
client.on('message', (message) => {
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
    app.get('/', (req, res) => {
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
