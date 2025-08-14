const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

const casosRouter = require('./routes/casosRoutes');
app.use('/casos', casosRouter);

const agentesRouter = require('./routes/agentesRoutes');
app.use('/agentes', agentesRouter);

const swaggerDocs = require('./docs/swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(
        `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
    );
});
