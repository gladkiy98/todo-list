function Task() {};
var task = new Task();

Task.prototype.init = function() {
  task.active();
  task.completed();
  task.submitDate();
};

Task.prototype.toggleStatus = function(oldStatus, newStatus) {
  $(document).on('change', '.' + oldStatus + ' input', function() {
    var current = $(this).parents('.' + oldStatus);
    $.ajax({
      url: '/tasks/' + $(current).attr('data-task-id') + '/' + newStatus,
      type: 'PUT',
      success: function() {
        current.removeClass(oldStatus);
        current.addClass(newStatus);
      }
    });
  });
};

Task.prototype.active = function() {
  task.toggleStatus('completed', 'active');
}

Task.prototype.completed = function() {
  task.toggleStatus('active', 'completed');
}

Task.prototype.submitDate = function() {
  $(function() {
    var $input = $('.datepicker');
    $input.datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    }).on('keypress changeDate', function(e) {
      if (e.which == 13) {   
        $('form').submit();
        $('#input-text').focus();
      } else {
        $input.focus();
      };
    })
  })
};

Task.prototype.create = function(task_id,task_title, task_status, task_url) {
  var row = document.createElement("div");
  var div1 = document.createElement("div");
  var div2 = document.createElement("div");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var labelText = document.createTextNode(task_title);
  var linkEdit = document.createElement("a");
  var linkDelete = document.createElement("a");

  row.setAttribute("data-task-id", task_id);
  row.className = "row pad-top-8 task row-task " + task_status;
  div1.className = "col-md-9";
  div2.className = "col-md-3";
  checkBox.type = "checkbox";
  checkBox.id = ("checked_" + task_id);
  checkBox.name = "status";
  checkBox.value = "<%= @task.status %>";
  checkBox.className = "checkbox-status-" + task_status;
  label.className = "completed-action title";
  label.setAttribute("for", "checked_" + task_id);
  linkEdit.text = "Edit";
  linkEdit.className = "action";
  linkDelete.text = "Delete";
  linkDelete.href = task_url;
  linkDelete.className = "action delete-action";
  linkDelete.setAttribute("data-confirm", "Are you sure?");
  linkDelete.setAttribute("data-remote", "true");
  linkDelete.setAttribute("data-method", "delete");

  label.append(labelText);
  div1.append(checkBox);
  div1.append(label);

  div2.append(linkEdit);
  div2.append(linkDelete);
  row.append(div1);
  row.append(div2);

  $('#container').prepend(row);
};

task.init();
