function Task() {};
var task = new Task();

Task.prototype.init = function() {
  task.active();
  task.completed();
  task.remove();
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

Task.prototype.remove = function() {
  $(document).on('click', '.delete-action', function() {
    var current = $(this).parents('.row-task');
    if(confirm("Delete?")) {
      $.ajax({
        url: '/tasks/' + $(current).attr('data-task-id'),
        type: 'DELETE',
        success: function() {
          $(current).fadeOut(200);
        }
      });
    };
  });
}

task.init();
