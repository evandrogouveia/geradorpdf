const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

//======================================= API CLIENTES =======================================

//retornas todos os clientes ou um cliente pelo ID opcional
router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = ?';
    execSQLQuery('SELECT * FROM clientes ' + filter, res, parseInt(req.params.id));
});

//deleta o cliente pelo ID
router.delete('/clientes/:id',(req, res) => {
    execSQLQuery('DELETE FROM clientes WHERE id =' + parseInt(req.params.id), res);
});

//adiciona um novo cliente
router.post('/clientes', (req, res) => {
    const cnpj = req.body.cnpj;
    const nome = req.body.nome;
    execSQLQuery(`INSERT INTO clientes(cnpj,nome) VALUES('${cnpj}','${nome}')`, res);
});

//atualiza o cliente
router.patch('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cnpj = req.body.cnpj.substring(0,18);
    execSQLQuery(`UPDATE clientes SET nome='${nome}', cnpj='${cnpj}' WHERE ID =${id}`, res);
});


//======================================= API PRODUTOS =======================================

//retornas todos os produtos ou um produto pelo ID opcional
router.get('/produtos/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = ?';
    execSQLQuery('SELECT * FROM produtos ' + filter, res, parseInt(req.params.id));
});

//deleta o produto pelo ID
router.delete('/produtos/:id',(req, res) => {
    execSQLQuery('DELETE FROM produtos WHERE ID =' + parseInt(req.params.id), res);
});

//adiciona um novo produto
router.post('/produtos', (req, res) => {
    const codigo = req.body.codigo.substring(0,150);
    const descricao = req.body.descricao.substring(0,160);
    execSQLQuery(`INSERT INTO produtos(codigo, descricao) VALUES('${codigo}','${descricao}')`, res);
});

//atualiza o produto
router.patch('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const codigo = req.body.codigo.substring(0,150);
    const descricao = req.body.descricao.substring(0,160);
    execSQLQuery(`UPDATE produtos SET codigo='${codigo}', descricao='${descricao}' WHERE ID =${id}`, res);
});


//======================================= API CERTIFICADOS =======================================

//retornas todos os certificados ou um certificado pelo ID opcional
router.get('/certificados/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = ?';
    execSQLQuery('SELECT * FROM certificados ' + filter, res, parseInt(req.params.id));
});

//deleta o certificado pelo ID
router.delete('/certificados/:id',(req, res) => {
    execSQLQuery('DELETE FROM certificados WHERE ID =' + parseInt(req.params.id), res);
});

//adiciona um novo certificado
router.post('/certificados', (req, res) => {
    const numero_certificado = req.body.numero_certificado;
    const data_certificado = req.body.data_certificado;
    const cnpj_cliente = req.body.cnpj_cliente;
    const nome_cliente = req.body.nome_cliente;
    const codigo_produto = req.body.codigo_produto;
    const nota_fiscal = req.body.nota_fiscal;
    const descricao= req.body.descricao;
    const quantidade = req.body.quantidade;
    const rastreabilidade = req.body.rastreabilidade;
    const observacao = req.body.observacao;
    const fator_seguranca = req.body.fator_seguranca;
    const carga_vertical = req.body.carga_vertical;
    const fator_vertical = req.body.fator_vertical;
    const carga_basket = req.body.carga_basket;
    const fator_basket = req.body.fator_basket;
    const carga_chocker = req.body.carga_chocker;
    const fator_chocker = req.body.fator_chocker;
    const tipo = req.body.tipo;

    execSQLQuery(`INSERT INTO certificados(numero_certificado, data_certificado, cnpj_cliente, 
                  nome_cliente, codigo_produto, nota_fiscal, descricao, quantidade, rastreabilidade,
                  observacao, fator_seguranca, carga_vertical, fator_vertical, carga_basket,
                  fator_basket, carga_chocker, fator_chocker, tipo) VALUES('${numero_certificado}','${data_certificado}','${cnpj_cliente}','${nome_cliente}'
          ,'${codigo_produto}','${nota_fiscal}','${descricao}','${quantidade}','${rastreabilidade}'
          ,'${observacao}','${fator_seguranca}','${carga_vertical}','${fator_vertical}'
          ,'${carga_basket}','${fator_basket}','${carga_chocker}','${fator_chocker}','${tipo}')`, res);
});

//atualiza o certificado
router.patch('/certificados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const codigo = req.body.codigo.substring(0,150);
    const descricao = req.body.descricao.substring(0,160);
    execSQLQuery(`UPDATE certificados SET codigo='${codigo}', descricao='${descricao}' WHERE ID =${id}`, res);
});

app.use('/', router);

app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res, id) {
    const connection = mysql.createConnection({
        host: 'logicargo_db.mysql.dbaas.com.br',
        port: '3306',
        user: 'logicargo_db',
        password: 'logicargo@2018',
        database: 'logicargo_db'
    });

    connection.query(sqlQry, [id], function(error, results, fields){
        if(error)
        res.json(error);
        else
        res.json(results);
        connection.end();
        console.log('executou');
    });
}