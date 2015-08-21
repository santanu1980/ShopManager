
function orderRouteConfig(app) {

    this.app = app;
    this.routeTable =[];
    this.init();
}

orderRouteConfig.prototype.init = function() {
    var self = this;
    this.addRoute();
    this.processRoute();
}

orderRouteConfig.prototype.processRoute = function() {
    var self = this;

    self.routeTable.forEach(function(route) {
        if(route.requestType == 'get') {
            self.app.get(route.requestUrl, route.callbackfunction);
        }
        else if (route.requestType == 'post') {
            self.app.post(route.requestUrl, route.callbackfunction);
        }
        else if (route.requestType == 'delete') {
            self.app.delete(route.requestUrl, route.callbackfunction);
        }
        else if (route.requestType == 'put') {
            self.app.put(route.requestUrl, route.callbackfunction);
        }
    });
}



orderRouteConfig.prototype.addRoute = function() {
    var self = this;
    
    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/IsAdmin',
            callbackfunction : function (req, res) {
                res.send(self.app.IsAdmin);
            }
        });
    
    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/User',
            callbackfunction : function (req, res) {
                res.send(self.app.CurrentUser);
            }
        });

    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/createorder',
            callbackfunction : function(req, res) {
                res.render('createorder', {title :"Create Order"});
            }
        });

    self.routeTable.push(
        {
            requestType : 'post',
            requestUrl  : '/createorder',
            callbackfunction : function(req, res) {

                var input = JSON.parse(JSON.stringify(req.body));
                var id = (Math.random().toString(16) + "000000000").substr(2, 8);
                req.getConnection(function (err, connection) {
                    var payment = "Pending";
                    var orderstatus = "Not delivered";
                    var data = {
                        id          : id,
						custname    : input.custname,
						custemail   : input.custemail,
						ordertype   : input.ordertype,
						noorder     : input.noorder,
                        orderdate   : input.orderdate,
                        payment     : payment,
                        orderstatus : orderstatus
                    };
                   
                    console.log(data); 
                    					
					var query = connection.query('INSERT INTO `order` SET ?',data, function(err, rows) {
						if (err)
						console.log("Error inserting : %s ",err );
                    });
                    console.log(query.sql);
					//res.redirect("Order create successfully");
				}); 
				console.log("Santanu");
            }
        });

    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/vieworder',
            callbackfunction : function (req, res) {
                res.render('vieworder', {title :"View Order Summary"});
            }
        });

    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/historyorder',
            callbackfunction : function (req, res) {
                res.render('orderhistory', { title : "Order History..." });
            }
        });
            
    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/viewalloders',
            callbackfunction : function (req, res) {
                req.getConnection(function (err, connection) {
                    
                    connection.query('SELECT * FROM `order` WHERE payment = ? OR  orderstatus = ?',["Pending", "Not Delivered"], function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        res.json(rows);
                           
                    });
       
                });
            }

        }
    );
    self.routeTable.push(
        {
            requestType : 'delete',
            requestUrl  : '/deleteorder/:id',
            callbackfunction : function (req, res) {
                req.getConnection(function (err, connection) {
                    var id = req.params.id;
                    connection.query('DELETE FROM `order`  WHERE id = ?', [id], function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        //res.json(rows);
                        //res.redirect('/createorder');   
                    });
                    connection.query('SELECT * FROM `order`', function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        res.json(rows);    
                    });
       
                });
                
            }
        });

    self.routeTable.push(
        {
            requestType: 'put',
            requestUrl: '/updateorder/:id',
            callbackfunction: function (req, res) {
                req.getConnection(function (err, connection) {
                    var id = req.params.id;
                    var input = JSON.parse(JSON.stringify(req.body));

                    connection.query('UPDATE `order` SET payment = ? , orderstatus = ? WHERE id = ?', [input.paymentstatus, input.orderstatus, id], function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        //res.json(rows);
                        //res.redirect('/createorder');   
                    });
                    connection.query('SELECT * FROM `order` WHERE payment = ?',["Pending"], function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        res.json(rows);
                    });

                });

            }
        });

    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/adminlogin',
            callbackfunction : function (req, res) {
                self.app.CurrentUser = "";
                self.app.IsAdmin = false;
                res.render('adminlogin', { title : "Administrator Login..." });
            }
        });

    self.routeTable.push(
        {
            requestType : 'post',
            requestUrl  : '/adminlogin',
            callbackfunction : function (req, res) {
                req.getConnection(function (err, connection) {
                    var input = [];
                    input.status = "";
                    var input = JSON.parse(JSON.stringify(req.body));
                    self.app.IsAdmin = false;
                    self.app.CurrentUser = "";
                    connection.query('SELECT Password, IsAdmin FROM `login` WHERE BINARY Username =  BINARY ?', input.adminname, function (err, rows) {
                        if (err) {
                            console.log("Error Selecting : %s ", err);
                            input.status = "Error";
                            res.json(input);
                        }
                        else {
                            if (rows.length == 1 && rows[0].Password == input.adminpasswd) {
                                self.app.CurrentUser = input.adminname;
                                input.status = "Ok";
                                if(rows[0].IsAdmin[0] == 1)
                                    self.app.IsAdmin = true;
                                res.json(input);
                            }
                            else {
                                input.status = "Error";
                                res.json(input);
                            }
                        }
                    });

                });
            }
        });

    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/payment',
            callbackfunction : function (req, res) {
                res.redirect('payment', { title : "View Order Summary" });
            }
        });
    
    self.routeTable.push(
        {
            requestType : 'get',
            requestUrl  : '/historyoders',
            callbackfunction : function (req, res) {
                req.getConnection(function (err, connection) {
                    
                    connection.query('SELECT * FROM `order` ', function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        console.log(rows);
                        res.json(rows);
                           
                    });
       
                });
            }

        }
    );
    
}

module.exports = orderRouteConfig;