// Server url
var url = 'http://localhost:3000';

// Loading icon
var loading = document.getElementById('loading');

// Drawing by color
// var by_color = false; // Draws in order of ID by default

function add_rectangle() {
    // Cancels default form submission 
    event.preventDefault();
    console.log('Adding to Database')

    var data = {
        'width' : document.getElementById('width').value,
        'height' : document.getElementById('height').value,
        'color' : document.getElementById('color').value
    };

    var update_request_URL = url.concat('/', 'add_rectangle');
    // add to database
    fetch(update_request_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        console.log('...added to Database!');
    })
    .catch(err => {
        throw err;
    });
};

function update_rectangle() {
   
    event.preventDefault();
    console.log('Updating Database...')
    
    var data = {
        'id' : document.getElementById('id').value,
        'width' : document.getElementById('width').value,
        'height' : document.getElementById('height').value,
        'color' : document.getElementById('color').value
    };

    // Send http request
    var update_request_URL = url.concat('/', 'update_rectangle');

    fetch(update_request_URL, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        console.log('updated Database!')
    })
    .catch(err => {
        throw err;
    });
};

function delete_by_id(){

    event.preventDefault();
    console.log('Deleting Rectangle...')
    var data = {
        'id' : document.getElementById('delete-id').value   
    };
    var update_request_URL = url.concat('/', 'delete_rectangle_by_id');

    // Delete from database
    fetch(update_request_URL, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        console.log('...deleted from Database!');
    })
    .catch(err => {
        throw err;
    });
};

function Delete_All() {

    var update_request_URL = url.concat('/', 'delete_all');
    fetch(update_request_URL, {method: 'delete'})
    console.log('Deleted all entries in db!')
};

// Reference: https://www.w3schools.com/tags/canvas_rect.asp
function draw() {
    console.log('Drawing rectangles...');

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var rectangles = out;
            console.log(rectangles);
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            var y = 5;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStlye = '#000000';
            ctx.strokeRect(0, 0, 1000, 1000);

            for (var i=0; i<rectangles.length; i++) {
                var rect = rectangles[i]

                ctx.fillStyle = '#000000';
                ctx.font = '16px arial';
                ctx.fillText('ID: ' + rect.id, 5, y + 16);

                ctx.fillStyle = rect.color;
                ctx.fillRect(70, y + 3, rect.width, rect.height);
                y += ((rect.height < 20) ? 25 : rect.height + 5);
            }

            console.log('...done drawing rectangles!')
        })
        .catch(err => {
            throw err
        });
};


function displayDB() {
    console.log('Displaying rectangle information...')
    
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        var rectangles = out;
        console.log(rectangles);
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        var y = 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStlye = '#000000';
        ctx.strokeRect(0, 0, 1000, 1000);

        for (var i=0; i<rectangles.length; i++) {
            var rect = rectangles[i]

            ctx.fillStyle = '#000000';
            ctx.font = '16px arial';
            ctx.fillText('ID: ' + rect.id + ', width: ' + rect.width + ', height: ' + rect.height + ', color: ' + rect.color, 5, y + 16);
            y += 25
        }

        console.log('...rectangle information displayed!')
    })
    .catch(err => {
        throw err
    });
}