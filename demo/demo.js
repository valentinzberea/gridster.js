var gridster;

$(function(){
    var widgets = [
        {html: '<li>0(1x1)</li>', width: 1, height: 1},
        {html: '<li>1(2x4)</li>', width: 2, height: 4},
        {html: '<li>2(3x1)</li>', width: 3, height: 1},
        {html: '<li>3(3x4)</li>', width: 3, height: 4},
        {html: '<li>4(2x1)</li>', width: 2, height: 1},
        {html: '<li>5(1x4)</li>', width: 1, height: 4},
        {html: '<li>6(2x1)</li>', width: 2, height: 1},
        {html: '<li>7(3x1)</li>', width: 3, height: 1},
        {html: '<li>8(1x1)</li>', width: 1, height: 1},
        {html: '<li>9(2x2)</li>', width: 2, height: 2},
        {html: '<li>10(1x1)</li>', width: 1, height: 1},
        {html: '<li>11(2x3)</li>', width: 2, height: 3},
        {html: '<li>12(3x2)</li>', width: 3, height: 2}
    ];

    var page_rows = 4;
    var page_cols = 3;

    var add_empty_page = function(page_cells){
        for(var i=0, j=0;i<page_rows;i++){
            for(j=0;j<page_cols;j++){
                // Empty cell on row i
                page_cells[i].push(false);
            }
        }
    }
    var next_position = function(col_in_page, row_in_page, pos){
        if(col_in_page + 1 < page_cols){
            return {row: pos.row, col: pos.col + 1};
        }

        if(row_in_page + 1 < page_rows){
            return {row: pos.row + 1, col: pos.col - page_cols + 1}
        }
    };

    var widget_fits = function(pos, w, h, page_cells) {
        for(var i=0,j=0;i<h;i++){
            cell_row = pos.row - 1 + i;
            if(cell_row == page_cells.length)
                return false;
            for(j=0;j<w;j++){
                cell_col = pos.col - 1 + j;
                if(cell_col == page_cells[cell_row].length)
                    return false;
                if(page_cells[cell_row][cell_col] == true)
                    return false;
            }
        }
        return true;
    }
    var place_widget = function(pos, widget, page_cells) {
        var w = widget.width;
        var h = widget.height;

        for(var i=0,j=0;i<h;i++){
            cell_row = pos.row - 1 + i;
            for(j=0;j<w;j++){
                cell_col = pos.col - 1 + j;
                page_cells[cell_row][cell_col] = true;
            }
        }

        widget.row = pos.row;
        widget.col = pos.col;
    }

    var add_coords_to_widgets = function(widgets){

        debugger;
        page_cells = [];
        for(i=0;i<page_rows;i++){
            page_cells.push([]);
        }
        add_empty_page(page_cells);
        var current_pos= {row: 1, col: 1};
        for(i=0; i<widgets.length;i++){
            widget = widgets[i];

            widget_can_be_placed = widget_fits(current_pos, widget.width, widget.height, page_cells);
            while(widget_can_be_placed == false){
                var col_in_page = (current_pos.col - 1) % page_cols;
                var row_in_page = current_pos.row;
                if(col_in_page == page_cols - 1 && row_in_page == page_rows - 1) {
                    add_empty_page(page_cells);
                    current_pos = {row: 1, col: current_pos.col + 1};
                }
                else {
                    current_pos = next_position(col_in_page, row_in_page, current_pos);
                }
                widget_can_be_placed = widget_fits(current_pos, widget.width, widget.height, page_cells);
            }

            place_widget(current_pos, widget, page_cells);
        }

    };

    add_coords_to_widgets(widgets);

    var gridster = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [80, 80],
        min_cols: 150,
        max_cols: 150,
        page_cols: 3,
        page_rows: 4
    }).data('gridster');
    $.each(widgets, function(i, widget){
        gridster.add_widget(widget.html, widget.width, widget.height, widget.col, widget.row);
    });
    $('button').on('click', function(){
        console.log(gridster.serialize.apply(gridster));
    });
});
