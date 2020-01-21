const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'logicargo_db.mysql.dbaas.com.br',
    port: '3306',
    user: 'logicargo_db',
    password: 'logicargo@2018',
    database: 'logicargo_db'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou');
    createTable(connection);
});

function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n"+
    "ID int NOT NULL AUTO_INCREMENT,\n"+
    "Nome varchar(150) NOT NULL,\n"+
    "CPF char(11) NOT NULL,\n"+
    "PRIMARY KEY (ID)\n"+
    ");";
            
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela');
    });           
}