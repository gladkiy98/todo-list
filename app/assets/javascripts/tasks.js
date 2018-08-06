jQuery(function ($) {

    $(".deleteAction").click( function () {
        var current_task_tr = $(this).parents('div')[0];
        if(confirm("Delete?")){
            $.ajax({
                url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
                type: 'POST',
                data: { _method: 'DELETE' },
                success: function (result) {
                   $(current_task_tr).fadeOut(200);
                   console.log(result);
                }
            });
        };
    });
    
});