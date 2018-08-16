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

task.init();
