var mysql = require('mysql');

var mySqlConnectionString = require('./mySqlConnectionString.js');

var mySqlConnectionStringProvider = {
    getMySQLConnection : function() {
        var connection = mysql.createConnection(mySqlConnectionString.connectionType.dev);

        connection.connection(function(err) {
            if(err){
                throw err;
            }
            console.log('Connected Successfully');
        });

        return connection;

    },

    colseMySQLConnection : function(currentConnection) {

        if(currentConnection) {
            currentConnection.end(function(err) {
                if(err) {
                    throw err;
                }
                console.log('Connection closed successfully');
            })
        }
    }
}

module.expoerts.mySqlConnectionStringProvider = mySqlConnectionStringProvider;  