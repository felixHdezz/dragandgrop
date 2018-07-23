var dashElement = "[name=dashboard-column]";
var filterPanel = "[id=selected-filters-panel]";
var handle = ".panel-body";
var connect = "[name=dashboard-column]";
var panelHead = "panel-heading";
var panel = '[name=dashboard-panel]';

var DragAndDrop = DragAndDrop || {

    init: function () {
        DragAndDrop.addSortable();

        $(document).on('click', '.addrow', DragAndDrop.addRow);

        $(document).on('click', '.removerow', DragAndDrop.removeRow);

        $(".colapsepanel").on("click", function(event) {
            event.preventDefault();
            var hpanel = $(this).closest("div.hpanel");
            var icon = $(this).find("i:first");
            var body = hpanel.find("div.panel-body");
            var footer = hpanel.find("div.panel-footer");
            body.slideToggle(300);
            footer.slideToggle(200);
        
            // Toggle icon from up to down
            icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
            hpanel.toggleClass("").toggleClass("panel-collapse");
            setTimeout(function() {
              hpanel.resize();
              hpanel.find("[id^=map-]").resize();
            }, 50);
          });
    },

    addRow: function (event) {
        event.preventDefault();
        var _dashcolumn = $(this).closest(dashElement);
        var _dashpanel = $(this).closest('[name=dashboard-panel]');
        var _value_col = _dashcolumn.attr('data-value-col');

        if (parseInt(_value_col) < 12) {
            _dashcolumn.removeClass('col-md-' + _value_col).addClass('col-md-' + (parseInt(_value_col) + 4));
            _dashcolumn.attr('data-value-col', parseInt(_value_col) + 4);

            DragAndDrop.agregaColumns($(_dashcolumn).closest('div._rowindicador'),$(_dashcolumn).closest('div._rowindicador').find(dashElement),_dashpanel);

            DragAndDrop.showHideIconsAdd();
            DragAndDrop.showHideIconsRemove();
            
        }
    },

    removeRow: function (event) {
        event.preventDefault();
        var _dashcolumn = $(this).closest(dashElement);
        var _value_col = _dashcolumn.attr('data-value-col');

        if (parseInt(_value_col) > 4) {
            var _rowsdashboard = $(this).closest(dashElement).closest('div._rowindicador');
            //Recorre los rows
            DragAndDrop.ordenatiles(_rowsdashboard);

            _dashcolumn.removeClass('col-md-' + _value_col).addClass('col-md-' + (parseInt(_value_col) - 4)).attr('data-value-col', (parseInt(_value_col) - 4));
        }
        DragAndDrop.showHideIconsAdd();
        DragAndDrop.showHideIconsRemove();
        return false;
    },

    agregaColumns: function (rinditr,_rDash,_pDash) {
        for(var _col = 0; _col < _rDash.length; _col++){
            if($(_rDash[_col]).find(panel).attr('id') === _pDash.attr('id')){
                var af = $(_rDash[0]).find(panel);
                var nxt = $(_rDash[1]).find(panel);
                var lst = $(_rDash[2]).find(panel);
                if(_col == 0){
                    if(nxt.length == 0){
                        $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if(lst.length == 0){
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if(nxt.length != 0 && lst.length!= 0){
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                        DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel),$(_rDash[2]).attr('data-value-col'))
                    }
                    if(nxt.length !=0 && lst.length == 0){
                        if($(_rDash[_col]).attr('data-value-col') > 8){
                            $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                            DragAndDrop.avanzaSiguienterow($(_rDash[1]).closest('div._rowindicador').next(), $(_rDash[1]).find(panel),$(_rDash[1]).attr('data-value-col'));
                        }
                    }
                    if(nxt.length ==0 && lst.length != 0){
                        if($(_rDash[_col]).attr('data-value-col') > 8){
                            $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                            DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel),$(_rDash[2]).attr('data-value-col'))
                        }
                    }
                    if((af.length != 0 && nxt.length != 0) && af.length !=0 & lst.length == 0 ){
                        if($(_rDash[_col]).attr('data-value-col') > 8){
                            $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                            DragAndDrop.avanzaSiguienterow($(_rDash[1]).closest('div._rowindicador').next(), $(_rDash[1]).find(panel),$(_rDash[1]).attr('data-value-col'));                        
                        }
                    }
                }else if(_col == 1){
                    debugger;
                    if(lst.length == 0){
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if(af.length == 0){
                        $(_rDash[0]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if(af.length !=0 && lst.length == 0){
                        if($(_rDash[_col]).attr('data-value-col') == 8){
                            $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                        }else{
                            $(_rDash[2]).css('display', 'block').attr('data-visible', 'true');
                            DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel),$(_rDash[_col]).attr('data-value-col'))
                            $(_rDash[1]).removeClass('col-md-'+$(_rDash[_col]).attr('data-value-col')).addClass('col-md-4').attr('data-value-col','4');
                        }
                    }
                    if((nxt.length == 0 && lst.length != 0) || (af.length != 0 && lst.length !=0)){
                        $(_rDash[1]).css('display', 'block').attr('data-visible', 'true');
                        DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel),$(_rDash[2]).attr('data-value-col'))
                        $(_rDash[1]).removeClass('col-md-'+$(_rDash[_col]).attr('data-value-col')).addClass('col-md-4').attr('data-value-col','4');
                    }
                    if(af.length!=0 && lst.length !=0){
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                        DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel),$(_rDash[2]).attr('data-value-col'))
                    }
                }else if(_col == 2){
                    if(af.length == 0){
                        $(_rDash[0]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if(nxt.length == 0){
                        $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if((nxt.length == 0 && lst.length != 0) && (af.length != 0 && lst.length !=0)){
                        if($(_rDash[_col]).attr('data-value-col') > 8){
                            $(_rDash[1]).css('display', 'block').attr('data-visible', 'true');
                            DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel),$(_rDash[_col]).attr('data-value-col'))
                            $(_rDash[1]).removeClass('col-md-'+$(_rDash[_col]).attr('data-value-col')).addClass('col-md-4').attr('data-value-col','4');
                        }
                    }
                    if(af.length !=0 && nxt.length != 0){
                        DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel),$(_rDash[_col]).attr('data-value-col'))
                    }
                    if(nxt.length !=0 && lst.length !=0){
                        DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel),$(_rDash[_col]).attr('data-value-col'))
                    }
                }
            }
        }
    },

    avanzaSiguienterow: function (_rdash, _dpanel, _val) {
        debugger;
        var _dcols = $(_rdash).find(dashElement);
        if(_dpanel.length != 0){
            $(_dpanel).closest(dashElement).removeClass('col-md-'+_val).addClass('col-md-4').attr('data-value-col','4');
            for(var _col = _dcols.length - 1; _col >=0; _col--){
                if($(_dcols[_col]).find(panel).length == 0){
                    $(_dpanel).appendTo($(_dcols[_col]));
                    $(_dcols[_dcols.length + 1]).css('display', 'block').attr('data-visible', 'true');
                }else if($(_dcols[_col]).find(panel).length != 0){
                    var val = $(_dcols[_col]).attr('data-value-col');
                    if(val != 12){
                        $(_dcols[_col]).find(panel).appendTo($(_dcols[_col + 1]));
                        if($(_dcols[_col + 1]).attr('data-visible') === 'false'){
                            $(_dcols[_col + 1]).css('display', 'block').attr('data-visible', 'true');
                        }
                        $(_dcols[_col]).removeClass('col-md-'+val).addClass('col-md-4').attr('data-value-col','4');
                        $(_dcols[_col + 1]).removeClass('col-md-4').addClass('col-md-'+ val).attr('data-value-col',val);
                        $(_dpanel).appendTo($(_dcols[_col]));
                    }else{
                        DragAndDrop.avanzaSiguienterow($(_rdash).next(),_dpanel,_val);
                        //$(_dpanel).appendTo($(_rdash).next().find(dashElement).eq(0));   
                    }
                }
            }
        }
    },

    ordenatiles: function (_rowsdashboard) {
        var _dashcolumns = $(_rowsdashboard).find(dashElement);
        if (_dashcolumns.length > 0) {
            for (var _column = 0; _column < _dashcolumns.length; _column++) {
                var _isdashpanel = $(_dashcolumns[_column]).find(panel);
                if (_isdashpanel.length == 0 && $(_dashcolumns[_column]).attr('data-visible') == 'false') {
                    $(_dashcolumns[_column]).css('display', 'block').attr('data-visible', 'true');
                    return false;
                }
            }
        }
    },

    addSortable: function () {
        $(dashElement).sortable({
            handle: handle,
            helper: "clone",
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8,
            disabled: false,
            start: function (event, ui) {
                var _template = this;
                //Actuailza el tamaño de la columna
                var _val = $(_template).attr('data-value-col');
                $(_template).removeClass('col-md-'+_val).addClass('col-md-4').attr('data-value-col','4');
                var _tdashcols = $(_template).closest('div._rowindicador');
                var _colums = $(_tdashcols).find(dashElement);

                //Busca elementos dentro del row si están ocultos, para mostrar
                for(var col = 0; col < _colums.length; col++){
                    //Si no tiene un dashboard-panel
                    if($(_colums[col]).find(panel).length === 0){
                        $(_colums[col]).css('display', 'block').attr('data-visible', 'true');
                    }
                }
            },
            update: function (event, ui) {
                var _template = this;
            },
            stop: function( event, ui ) {
            }
        }).disableSelection();

        $('.'+panelHead + ' .panel-tools').find('.fa-chevron-up').click();
    },

    showHideIconsAdd: function () {
        var _clsAddRow = 'addrow';
        var _rows = $('div._rowindicador');
        _rows.each(function (col, column) {
            var _dashcolumns = $(column).find(dashElement);
            _dashcolumns.each(function (index, element) {
                $(element).find('a[class="' + _clsAddRow + '"]').css('display', parseInt($(element).attr('data-value-col')) == 12 ? 'none' : 'inline-block');
            });
        });
    },

    showHideIconsRemove: function () {
        var _clsRemoveRow = 'removerow';
        var _rows = $('div._rowindicador');
        _rows.each(function (col, column) {
            var _dashcolumns = $(column).find(dashElement);
            _dashcolumns.each(function (index, element) {
                $(element).find('a[class="' + _clsRemoveRow + '"]').css('display', parseInt($(element).attr('data-value-col')) === 4 ? 'none' : 'inline-block');
            });
        });
    },

    moveDivHidden: function (_dashboardpanel, status) {
        if (status == false) {
            var _panelsHidden = $('.content-panel-hidden').find(dashElement);
            var idPanel = $(_dashboardpanel).attr('id');

            _panelsHidden.each(function (index, element) {
                //Verifica si el div no contiene elementos dentro de ella
                var dashpanel = $(element).find('[name=dashboard-panel]');

                if ($(dashpanel).attr('id') != idPanel && dashpanel.length === 0) {
                    $(_dashboardpanel).appendTo(element);
                    $(_dashboardpanel).find('div[class="panel-tools"]').find('a[class="showhide-panel"]').addClass('hidden');
                    return false;
                } else if ($(dashpanel).attr('id') == idPanel && dashpanel.length != 0) {
                    return false;
                }
            });
        }
    },
};

$(DragAndDrop.init);
