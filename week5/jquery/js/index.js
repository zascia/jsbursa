/* user list tmpl
user upates
 $(ui.item).data('id');
*/

/*
status
  active
  redcard
  removed
*/

/*id
name
phone*/
function cancelDrag() {
  $('ul').sortable('cancel');
}
function startSortable() {
  var container;
  container = $('ul');
  container.sortable( {
    connectWith: 'ul',
    activate: function(event, ui) {
      if ( ui.sender.parent().attr('class').contains('removed') ) {
        // container.sortable.call(this, event, 'cancel');
      }
      // POST запрос на урл window.url + '/' + id (где id - id текущего студента) с содержимым {status: newStatus} - где newStatus
      // если POST-запрос провалился - перетаскивание необходимо отменить
    }
  });

}

function renderStudents(list, status) {
  var container;
  var userList;
  container = $('.'+ status).find('ul');
  var compiled = _.template('<% _.forEach(students, function(student) { %> <li data-id=<%- student.id %>><h3><%- student.name %></h3><h4><%- student.phone %></h4></li><% }); %>');
  userList = compiled({'students' : list});
  container.append(userList);
  startSortable();
}
function filterStudents(studentsList) {
  // console.log(studentsList);
  var activeStudent;
  var redcardStudent;
  var removedStudent;
  activeStudent = redcardStudent = removedStudent = [];
  activeStudent = _.filter(studentsList, function(student) {
    return student.status === 'active';
  });
  renderStudents(activeStudent, 'active');
  redcardStudent = _.filter(studentsList, function(student) {
    return student.status === 'redcard';
  });
  renderStudents(redcardStudent, 'redcard');
  removedStudent = _.filter(studentsList, function(student) {
    return student.status === 'removed';
  });
  renderStudents(removedStudent, 'removed');
}
function getStudents() {
  $.get(window.url, function(data) {
    filterStudents(data)
  });
}

$(document).ready(function(){
  getStudents();
});

