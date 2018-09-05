function Task() {};
var task = new Task();
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

Task.prototype.init = function() {
  task.active();
  task.completed();
  task.submitDate();
  task.sort();
  task.edit();
  task.tooltip();
};

Task.prototype.sort = function() {
  $('.sortable').railsSortable({
    handle: '.handle',
    containment: 'parent'
  });
};

Task.prototype.toggleStatus = function(oldStatus, newStatus, operator) {
  $(document).on('change', '.' + oldStatus + ' input[name="status"]', function() {
    var current = $(this).parents('.' + oldStatus);
    var currentLabel = current.find('.title-' + oldStatus);
    var time = newStatus === 'completed' && moment().format('D MMM YYYY HH:mm') || '';
    currentLabel.attr('data-original-title', time);
    $.ajax({
      url: '/tasks/' + $(current).attr('data-task-id') + '/' + newStatus,
      type: 'PUT',
      success: function() {
        current.removeClass(oldStatus);
        current.addClass(newStatus);
        task.changeNumber(operator);
        currentLabel.removeClass('title-' + oldStatus);
        currentLabel.addClass('title-' + newStatus);
      }
    });
  });
};

Task.prototype.changeNumber = function(operator) {
  var count = parseInt($('#num').text());
  var number = eval('count ' + operator + ' 1' );
  var text = number + ' item' + (number == 1 && ' left' || 's left');
  $('#num').text(text);
};

Task.prototype.active = function() {
  task.toggleStatus('completed', 'active', '+');
};

Task.prototype.completed = function() {
  task.toggleStatus('active', 'completed', '-');
};

Task.prototype.submitDate = function() {
  $(function() {
    var $input = $('.datepicker');
    var nowDate = new Date()
    $input.datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      startDate: nowDate.toDateString()
    }).on('keypress changeDate', function(e) {
      if (e.which == ENTER_KEY) {
        $('form').submit();
        $('#input-text').focus();
      } else {
        $input.focus();
      };
    })
  })
};

Task.prototype.create = function(taskId, taskTitle, taskStatus, taskUrl) {
  var row = document.createElement('div');
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  var checkBox = document.createElement('input');
  var i = document.createElement('i');
  var labelCheck = document.createElement('label');
  var label = document.createElement('label');
  var labelText = document.createTextNode(taskTitle);
  var linkDelete = document.createElement('a');

  row.id = ('Task_' + taskId);
  row.setAttribute('data-task-id', taskId);
  row.className = 'row pad-top-8 task row-task ' + taskStatus;
  div1.className = 'col-md-9';
  div2.className = 'col-md-3 text-right';
  i.className = 'handle ui-sortable-handle';
  checkBox.type = 'checkbox';
  checkBox.name = 'status';
  checkBox.id = ('checked_' + taskId);
  checkBox.value = taskStatus;
  checkBox.className = 'checkbox-status-' + taskStatus;
  labelCheck.className = 'check';
  labelCheck.setAttribute('for', 'checked_' + taskId);
  label.className = 'completed-action title-' + taskStatus;
  label.setAttribute('data-toggle', 'tooltip');
  label.setAttribute('data-placement', 'top');
  linkDelete.href = taskUrl;
  linkDelete.className = 'action delete-action';
  linkDelete.setAttribute('data-confirm', 'Are you sure?');
  linkDelete.setAttribute('data-remote', 'true');
  linkDelete.setAttribute('data-method', 'delete');

  label.append(labelText);
  div1.append(i);
  div1.append(checkBox);
  div1.append(labelCheck);
  div1.append(label);

  div2.append(linkDelete);
  row.append(div1);
  row.append(div2);

  $('#container').prepend(row);

  task.changeNumber('+');
  task.tooltip();
};

Task.prototype.edit = function() {
  $(document).on('click', '.title-active', function(e) {
    var text = $(this).text();
    var $element = $(e.target);
    var $input = $('<input />').attr({
      'type': 'text',
      'id': 'txt_input',
      'data-prev-text': text,
      'value': text
    });
    var prevText = $input.attr('data-prev-text');
    var label = $(e.target).closest('label');
    var row = $element.parents('.row-task');
    $element.removeClass('title-active');
    $element.html($input);
    $input.select();

    function save(objLabel, lastText, textNow, taskRow) {
      label.addClass(' title-active');

        if (lastText === textNow) return $(objLabel).html(lastText);

        $.ajax({
          url: '/tasks/' + $(taskRow).attr('data-task-id'),
          type: 'PUT',
          data: { title: textNow }
        });
        $(objLabel).html(textNow);
    }

    $input.on('keyup', function(ev) {
      if (ev.keyCode === ESCAPE_KEY) {
        $element.html(prevText);
        $element.addClass(' title-active');
        $input.remove();
      };

      if (ev.keyCode === ENTER_KEY) {
        var text = $(this).val();
        save(label, prevText, text, row);
      };
    })

    $input.on('blur', function() {
      var text = $(this).val();
      save(label, prevText, text, row);
    });
  });
}

Task.prototype.tooltip = function() {
  $('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(task.init);
