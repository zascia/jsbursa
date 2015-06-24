// !!!! sortable = dragable && dropable --> синхронность!
/* user list tmpl
<li>
<h3>Здесь будет имя</h3>
<h4>Здесь будет телефон</h4>
</li>
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

function renderStudents(list, status) {
  var container;
  var userList;
  container = $('.'+ status).find('ul');
  var compiled = _.template('<% _.forEach(students, function(student) { %> <li><h3><%- student.name %></h3><h4><%- student.phone %></h4></li><% }); %>');
  userList = compiled({'students' : list});
  container.append(userList);
  container.sortable( {connectWith: "ul"} );
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

