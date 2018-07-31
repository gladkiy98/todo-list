jQuery(function ($) {

    $(".deleteAction").click( function () {
        var current_task_tr = $(this).parent('tr')[0];
        if(confirm("Delete?")){
            $.ajax({
                url: '/tasks/:id' + $(current_task_tr).attr('data-item_id'),
                type: 'POST',
                data: { _method: 'DELETE' },
                success: function () {
                   $(current_task_tr).fadeOut(200);
                }
            });
        };
    })
    
})