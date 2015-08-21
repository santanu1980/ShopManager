 var connectionProvider = require('../../mySqlConnectionStringProvider.js');
 
 var orderDao = {
	 createOrder : function (order, onsuccessfullCallback) {
		 var insertStatement = "INSERT INTO order SET?";
		 var connection = connectionProvider.mySqlConnectionStringProvider.getMySQLConnection();
		 
		 var Order = {
			 custname : order.custname,
			 custemail : order.custemail,
			 ordertype : order.ordertype,
			 noorder   : order.noorder,
			 orderdate : new Date()
		 }
		 if(connection) {
			 connection.query(insertStatement,Order, function(err, result) {
				 if(err) {
					 
				 }
				 
				 onsuccessfullCallback(status : 'Successful');
				 console.log(result);
			 });
		 }
	 }
 }