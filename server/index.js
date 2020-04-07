const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const CONFIG = require('./config/config');
const { addUser, removeUser, getUser, getUserInRoom } = require('./helpers/users.js');

const PORT = CONFIG.CONFIG.APP.PORT;

const router = require('./router/router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const LogModel = require('./model/LogModel');

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

let session_id = '';

const { interpretarResponse } = require('./helpers/nlp');

const assistant = new AssistantV2({
    version: '2020-01-28',
    authenticator: new IamAuthenticator({
        apikey: CONFIG.CONFIG.WATSON.APIKEY,
    }),
    url: CONFIG.CONFIG.WATSON.URL,
    disableSslVerification: true,
});

io.on('connection', (socket) => {

    socket.on('join', async ({ name, room }, callback) => {

        await assistant.createSession({
            assistantId: CONFIG.CONFIG.WATSON.ID,
        })
            .then(res => {
                session_id = res.result.session_id;
            })
            .catch(err => {
                console.log(err);
            });


        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        callback();

    });

    socket.on('sendMessage', async (message, callback) => {
        const user = getUser(socket.id);

        if (user.name) {
            io.to(user.room).emit('message', { user: user.name, text: message });
            const log = {
                id_conversacion: socket.id,
                mensaje: message,
                intent: 'user',
                fecha: new Date().toUTCString()
            };
            await LogModel.insertLog(log);
            assistant.message({
                assistantId: CONFIG.CONFIG.WATSON.ID,
                sessionId: session_id,
                input: {
                    'message_type': 'text',
                    'text': message
                }
            })
                .then(async (res) => {
                    // console.log(JSON.stringify(res, null, 2));
                    console.log("hola");
                    const response = await interpretarResponse(res.result);
                    let intent = '';
                    if (res.result.output.intents.length > 0) {
                        intent = res.result.output.intents[0].intent;
                    } else {
                        intent = 'default';
                    }
                    const log_bot = {
                        id_conversacion: socket.id,
                        mensaje: response.text,
                        intent,
                        fecha: new Date().toUTCString()
                    }
                    await LogModel.insertLog(log_bot);
                    io.to(user.room).emit('message', response);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

        callback();

    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        }
        console.log("Disconnect");
    });


});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
