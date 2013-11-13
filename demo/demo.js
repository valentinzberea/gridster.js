var gridster;

$(function(){
    var widgets = [
        ['<li>0</li>', 1, 1],
        ['<li>1</li>', 3, 1],
        ['<li>2</li>', 3, 4],
        ['<li>3</li>', 2, 1],
        ['<li>4</li>', 2, 4],
        ['<li>5</li>', 1, 4],
        ['<li>6</li>', 2, 1],
        ['<li>7</li>', 3, 1],
        ['<li>8</li>', 1, 1],
        ['<li>9</li>', 2, 2],
        ['<li>10</li>', 1, 1],
        ['<li>10</li>', 2, 3],
        ['<li>10</li>', 3, 2]
    ];
    var gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [40, 40],
        min_cols: 150,
        max_cols: 150
    }).data('gridster');
    $.each(widgets, function(i, widget){
        gridster.add_widget.apply(gridster, widget);
    });
    $('button').on('click', function(){
        console.log(gridster.serialize.apply(gridster));
    });
});
