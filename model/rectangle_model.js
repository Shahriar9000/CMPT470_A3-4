const mysql = require('mysql');

// Reference: https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
// Initializing connection to database
const connection = mysql.createConnection({
    host: "db4free.net",
    user: 'shahriar',
    password: '1q2w3e4r5t6y',
    database: 'database_cmpt'
});

// host: "34.69.117.115",
// user: 'root',
// password: '1q2w3e4r5t6y',
// database: 'cmpt470'

connection.connect(error => {
    if (error) throw error;
    console.log('Connection to database successful.');
})


const Rectangle = function(rectangle) {
    this.width = rectangle.width;
    this.height = rectangle.height;
    this.color = rectangle.color;
}

Rectangle.ADD_RECTANGLE = (body, result) => {

    const query = "INSERT INTO rectangles (width, height, color) VALUES ?";
    const values = [[body.width, body.height, body.color]];
    // console.log(values);
    connection.query(query, [values], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Created rectangle: ', { id: res.insertId, ...body });
        result(null, { id: res.insertId, ...body });
    });
};

Rectangle.GET_ALL_RECTANGLES = result => {
    const query = "SELECT * FROM rectangles";

    connection.query(query, (err, res) => {
         if (err) {
             console.log('error: ', err);
             result(null, err);
             return;
         }
         console.log('Rectangles: ', res);
         result(null, res);
     });
 };

Rectangle.FIND_BY_ID = (ID, result) => {
    const query ="SELECT * FROM rectangles WHERE id=?";
    connection.query(query, ID, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.height) {
            console.log('Found rectangle: ', res[0]);
            result(null, res[0]);
            return;
        }

        // Rectangle with id not found
        result({ kind: 'not_found' }, null);
    });
};

Rectangle.update = (id, rectangle, result) => {
    const query ='UPDATE rectangles SET width=?, height=?, color=? WHERE id=?'
    const values = [rectangle.width, rectangle.height, rectangle.color, id]
    connection.query(query, values, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }
            // id not found
            if (res.affectedRows == 0) {
                result({ kind: 'id_not_found' }, null);
                return;
            }

            console.log('Updated rectangle: ', { id: id, ...rectangle });
            result(null, { id: id, ...rectangle });
        }
    );
};

Rectangle.delete = (id, result) => {

    const query = 'DELETE FROM rectangles WHERE id=?';
    connection.query(query, id, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }
            //  id not found
            if (res.affectedRows == 0) {
                result({ kind: 'id_not_found' }, null);
                return;
            }

            console.log('Deleted rectangle with id: ', id);
            result(null, res);
        });
};

Rectangle.delete_all = result => {
    const query = 'DELETE FROM rectangles';
    connection.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        
        console.log('Deleted allrectangles');
        result(null, res);
    });
};

module.exports = Rectangle;