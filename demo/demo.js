var gridster;

$(function(){
    var widgets = [
        ['<li>0(1x1)</li>', 1, 1],
        ['<li>1(2x4)</li>', 2, 4],
        ['<li>2(3x1)</li>', 3, 1],
        ['<li>3(3x4)</li>', 3, 4],
        ['<li>4(2x1)</li>', 2, 1],
        ['<li>5(1x4)</li>', 1, 4],
        ['<li>6(2x1)</li>', 2, 1],
        ['<li>7(3x1)</li>', 3, 1],
        ['<li>8(1x1)</li>', 1, 1],
        ['<li>9(2x2)</li>', 2, 2],
        ['<li>10(1x1)</li>', 1, 1],
        ['<li>11(2x3)</li>', 2, 3],
        ['<li>12(3x2)</li>', 3, 2]
    ];

    var add_coords_to_widgets = function(widgets, page_rows, page_cols){

        for(i=0; i<widgets.length;i++){
            widget = widgets[i];
        }

    };
    add_coords_to_widgets(widgets, 4, 3);

    var gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [80, 80],
        min_cols: 150,
        max_cols: 150,
        page_cols: 3,
        page_rows: 4
    }).data('gridster');
    $.each(widgets, function(i, widget){
        gridster.add_widget.apply(gridster, widget);
    });
    $('button').on('click', function(){
        console.log(gridster.serialize.apply(gridster));
    });
});
