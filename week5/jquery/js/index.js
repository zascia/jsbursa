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
function startSortable() {
  var container;
  var newStatus;
  var studentId;
  var dataToSend;
  container = $('ul');
  container.sortable( {
    connectWith: 'ul',
    receive: function(event, ui) {
      if ( $(ui.item).data('status') === 'removed' ) {
        console.log('contains remove', $(ui.item).data('status'));
        $(ui.sender).sortable('cancel');
        return;
      }
      newStatus = $(event.target).parent().hasClass('active') ? 'active' : $(event.target).parent().hasClass('redcard') ? 'redcard' : 'removed';
      studentId = $(ui.item).data('id');
      dataToSend = {
        status: newStatus
      }
      $.ajax({
        type: 'POST',
        url: window.url + '/' + studentId,
        data: dataToSend,
        success: function success(data) {
          $(ui.item).data('status', newStatus);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          $(ui.sender).sortable('cancel');
        }
      });
    }
  });
}

function renderStudents(list, status) {
  var container;
  var userList;
  container = $('.'+ status).find('ul');
  $(container).html('');
  var compiled = _.template('<% _.forEach(students, function(student) { %> <li data-id=<%- student.id %> data-status=<%- student.status %>><h3><%- student.name %></h3><h4><%- student.phone %></h4></li><% }); %>');
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
function switchStudentsPolling() {
  getStudents();
}
$(document).ready(function(){
  switchStudentsPolling();
});

