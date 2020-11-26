const Rectangle = require('../model/rectangle_model');

// Create and save a new rectangle
exports.ADD_RECTANGLE = (req, res) => {
    // Validate req
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be EMPTY !'
        });
    }

    // Save rectangle to db
    Rectangle.ADD_RECTANGLE(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Error ! Unable to create rectangle'
            });
        else res.send(data);
    });
};

// Get all rectangles
exports.FIND_ALL = (req, res) => {
    Rectangle.GET_ALL_RECTANGLES((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Error retrieving all rectangles'
            });
        else res.send(data);
    });
};

// Find rectangle by Id
exports.FIND_BY_ID = (req, res) => {
    Rectangle.FIND_BY_ID(req.body.id, (err, data) => {
        if (err)
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Rectangle with id=' + req.body.id + ' not found'
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Error retrieving rectangle with Id ' + req.body.id
                });
            }
        else res.send(data);
    });
};

// Update a rectangle by Id
exports.UPDATE_RECTANGLE = (req, res) => {
    // Validate req
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be EMPTY !'
        });
    }

    const rectangle_id = req.body.id;
    // Update rectangle
    Rectangle.update(rectangle_id, new Rectangle(req.body), (err, data) => {
            if (err)
                if (err.kind === 'id_not_found') {
                    res.status(404).send({
                        message: 'Rectangle with id=' + rectangle_id + ' not found'
                    });
                } else {
                    res.status(500).send({
                        message: 'Error updating rectangle with Id: ' + rectangle_id
                    });
                }
            else res.send(data);
        }
    );
};

// Delete a rectangle by Id
exports.DELETE_RECTANGLE = (req, res) => {

    const rectangle_id = req.body.id;
 
    Rectangle.delete(rectangle_id, (err, data) => {
        if (err)
            if (err.kind === 'id_not_found') {
                res.status(404).send({
                    message: 'Rectangle with id=' + rectangle_id + ' not found'
                });
            } else {
                res.status(500).send({
                    message: 'Error deleting rectangle with Id ' + rectangle_id
                });
            }
        else res.send({ message: 'Rectangle deleted' })
    })
};

// Delete all rectangles
exports.DELETE_ALL_RECTANGLE = (req, res) => {
    Rectangle.delete_all((err, data) => {
        if (err)
            res.status(500).send({
                message: 'Error deleting all rectangles'
            });
        else res.send({ message: 'All rectangles deleted' })
    });
};