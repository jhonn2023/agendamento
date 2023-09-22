import firebird from "node-firebird";

const options = {
                Host: 'localhost',  
                port: 3050,
                database: 'c://system//banco//bd.gdb',
                user: 'sysdba',
                password: 'masterkey',
};

function executeQuery(ssql, callback) {

firebird.attach(options, function(err, db) {

    if (err){
      return callback(err,[]);
  }

    // db = DATABASE
    db.query(ssql, function(err, result) {
        // IMPORTANT: close the connection
        db.detach();
          if (err) {
            return callback(err, []);
          } else {
            return callback(undefined, result);
            //console.log(result)
          } 
    });
    });
}
    export {executeQuery};