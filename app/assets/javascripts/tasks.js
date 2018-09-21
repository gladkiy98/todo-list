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
  task.changeLink();
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
    var checkAll = $('.content-task').find('.checked-all');
    currentLabel.attr('title', '');
    currentLabel.attr('data-original-title', time);
    $.ajax({
      url: '/' + newStatus + '_tasks/' + $(current).attr('data-task-id'),
      type: 'PUT',
      success: function() {
        current.removeClass(oldStatus);
        current.addClass(newStatus);
        task.changeNumber(operator);
        currentLabel.removeClass('title-' + oldStatus);
        currentLabel.addClass('title-' + newStatus);

        task.changeLink();
        task.tooltip();
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

Task.prototype.changeLink = function() {
  var checkAll = $('.content-task').find('.checked-all');
  if ($('#container').find('.active').length !== 0) {
    checkAll.attr('href', '/completed_tasks');
  } else {
    checkAll.attr('href', '/active_tasks');
  }
}

Task.prototype.checkedAll = function(url) {
  $('.checked-all').attr('href', url);
};

Task.prototype.create = function(taskId, taskTitle, taskStatus, taskUrl) {
  var row = document.createElement('div');
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  var div3 = document.createElement('div');
  var checkBox = document.createElement('input');
  var i = document.createElement('i');
  var labelCheck = document.createElement('label');
  var label = document.createElement('label');
  var labelText = document.createTextNode(taskTitle);
  var linkDelete = document.createElement('a');

  row.id = ('Task_' + taskId);
  row.setAttribute('data-task-id', taskId);
  row.className = 'row pt-2 task row-task ' + taskStatus;
  div1.className = 'col-md-auto col-sm-auto col-auto pr-0';
  div2.className = 'col-md-10 col-sm-10 col-10 p-0 word-break';
  div3.className = 'col-md-auto col-sm-auto col-auto text-right';
  i.className = 'handle ui-sortable-handle';
  checkBox.type = 'checkbox';
  checkBox.name = 'status';
  checkBox.id = ('checked_' + taskId);
  checkBox.value = taskStatus;
  checkBox.className = 'checkbox-status-' + taskStatus;
  labelCheck.className = 'check';
  labelCheck.setAttribute('for', 'checked_' + taskId);
  label.className = 'completed-action w-100 title-' + taskStatus;
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
  div2.append(label);

  div3.append(linkDelete);
  row.append(div1);
  row.append(div2);
  row.append(div3);

  $('#container').prepend(row);

  task.changeNumber('+');
  task.tooltip();
  task.changeLink();
};

Task.prototype.edit = function() {
  $(document).on('click', '.title-active', function(e) {
    var text = $(this).text();
    var $element = $(e.target);
    var $input = $('<input />').attr({
      'class': 'w-100 edit-input',
      'type': 'text',
      'id': 'txt_input',
      'data-prev-text': text,
      'value': text
    });
    var prevText = $input.attr('data-prev-text');
    var label = $(e.target).closest('label');
    var row = $element.parents('.row-task');
    var deleteAction = row.find('.delete-action')
    deleteAction.removeClass('delete-action');
    $element.removeClass('title-active');
    $element.html($input);
    $input.select();

    function save(objLabel, lastText, textNow, taskRow) {
      label.addClass(' title-active');
      deleteAction.addClass('delete-action');

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
        deleteAction.addClass('delete-action');
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
