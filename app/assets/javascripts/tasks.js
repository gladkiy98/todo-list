function Task() {};

Task.prototype.init = function(oldStatus, newStatus) {
    $(document).on('change', '.' + oldStatus + ' input', function () {
        var current = $(this).parents('.' + oldStatus);
        $.ajax({
            url: '/tasks/' + $(current).attr('data-task-id') + '/' + newStatus,
            type: 'POST',
            data: { _method: 'PUT' },
            success: function () {
                current.removeClass(oldStatus);
                current.addClass(newStatus);
            }
        });
    });
};

var task = new Task();
task.init('active', 'completed');
task.init('completed', 'active');
