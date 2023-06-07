const path = require('path');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const getPool = require('./libs/connect');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//salva o caminho para a raiz do projeto
global.__basedir = __dirname;

async function init(){
    try {
        // opens a global connection
        await getPool.connect();
        
        //config parsing middleware
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use((err, req, res, nxt) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {  // error handler for malformed request body
                return res.status(400).send({ success: false, msg: err.message, body: err.body.replaceAll('\r', ' ').replaceAll('\n', ' ').replaceAll('\"', '\'')});
            }
            nxt();
        });

        app.use(cors());
        
        // arq estaticos
        app.use(express.static(path.join(__dirname, 'public')));
        
        // middleware for cookies
        // app.use(cookieParser());
        
        // importa todas as rotas
        app.use(require('./routes'));

        app.listen(port, () => console.log(`Servidor escutando a porta http://localhost:${port}`));

        // If the Node process ends, close the connection
        process.on('SIGTERM', getPool.disconnect).on('SIGINT', getPool.disconnect);
    } catch (error) {
        console.log(error)
    }
}

init();