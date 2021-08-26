// Script Order 0022:

var allCreatedObjects = [], lastShape, textBoxBeingEdited;

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);});}
var projectId = createUUID();

var lastId = 0001;
function createShapeId(){
    id = projectId + lastId;lastId += 1;
    return id;}
