var dashElement = "[name=dashboard-column]";
var filterPanel = "[id=selected-filters-panel]";
var handle = ".hpanel.modulo";
var connect = "[name=dashboard-column]";
var panelHead = "panel-heading";

$("#header > nav > div.header-link.dragdrop-show-btn").removeClass("hidden");

var DragAndDrop = DragAndDrop || {

    init: function () {
        $('.dragdrop-show-btn').on('click', DragAndDrop.addSortable);

        $(document).on('click', '#btn-cancel-setting', DragAndDrop.resetSettings);

        $(document).on('click', '#btn-save-setting', DragAndDrop.saveSettings);

        $(document).on('click', '.showhide-panel', DragAndDrop.showhide);

        $(document).on('click', '.addrow', DragAndDrop.addRow);

        $(document).on('click', '.fullscreen1', fullscreenHandler);

        $(document).on('click', '.removerow', DragAndDrop.removeRow);
    },

    showhide: function (event) {
        event.preventDefault();
        var _dashboardpanel = $(this).closest('div[name="dashboard-panel"]');
        var _hpanel = $(this).closest('div.hpanel');
        var _iconpanel = $(this).find('i:first');
        var _statuspanel = (_iconpanel.hasClass('fa-eye') ? false : true);

        _hpanel.attr('data-panel-visible', _statuspanel);
        _iconpanel.toggleClass('fa-eye').toggleClass('fa-eye-slash');

        //Mueve el div actual al contenedor de ocultar
        DragAndDrop.moveDivHidden(_dashboardpanel, _statuspanel);
    },

    addRow: function (event) {
        event.preventDefault();
        var _dashcolumn = $(this).closest(dashElement);
        var _dashpanel = $(this).closest('[name=dashboard-panel]');
        var _value_col = _dashcolumn.attr('data-value-col');

        if (parseInt(_value_col) < 12) {
            _dashcolumn.removeClass('col-md-' + _value_col).addClass('col-md-' + (parseInt(_value_col) + 4));
            _dashcolumn.attr('data-value-col', parseInt(_value_col) + 4);

            DragAndDrop.showHideIconsAdd();
            DragAndDrop.showHideIconsRemove();

            var _rowsdashboard = $(this).closest(dashElement).closest('div._rowindicador');
            DragAndDrop.agregaColumns(_rowsdashboard);
            
        }
    },

    removeRow: function (event) {
        event.preventDefault();
        var _dashcolumn = $(this).closest(dashElement);
        var _value_col = _dashcolumn.attr('data-value-col');

        if (parseInt(_value_col) > 4) {
            var _rowsdashboard = $(this).closest(dashElement).closest('div._rowindicador');
            debugger;
            //Recorre los rows
            DragAndDrop.ordenatiles(_rowsdashboard);

            _dashcolumn.removeClass('col-md-' + _value_col).addClass('col-md-' + (parseInt(_value_col) - 4)).attr('data-value-col', (parseInt(_value_col) - 4));
        }
        DragAndDrop.showHideIconsAdd();
        DragAndDrop.showHideIconsRemove();
        return false;
    },

    agregaColumns: function (_rDash) {
        debugger;
        var _dPanel = '[name=dashboard-panel]';
        var _dashcol = $(_rDash).find(dashElement);
        for (var colmn = 0; colmn < _dashcol.length; colmn++) {
            var dashpanel = $(_dashcol[colmn]).find(_dPanel);
            var beforepanel = $(_dashcol[colmn - 1]).find(_dPanel);
            var nextpanel = $(_dashcol[colmn + 1]).find(_dPanel);
            var lastpanel = $(_dashcol[_dashcol.length - 1]).find(_dPanel);
            if (dashpanel.length != 0 && colmn == 0) {
                if (nextpanel.length === 0 && lastpanel.length == 0) {
                    $(_dashcol[colmn + 1]).css('display', 'none').attr('data-visible', 'false');
                    $(_dashcol[_dashcol.length - 1]).css('display', 'none').attr('data-visible', 'false');
                    return false;
                } else if (nextpanel.length != 0 && lastpanel.length != 0) {
                    DragAndDrop.avanzaSiguienterow(lastpanel);
                    return false;
                }
            } else if (dashpanel.length != 0 && colmn == 1) {
                if (beforepanel.length == 0 && lastpanel.length == 0) {
                    $(_dashcol[_dashcol.length - 1]).css('display', 'none').attr('data-visible', 'false');
                    $(_dashcol[colmn - 1]).css('display', 'none').attr('data-visible', 'false');
                    return false;

                } else if (lastpanel.length == 0) {
                    $(_dashcol[_dashcol.length - 1]).css('display', 'none').attr('data-visible', 'false');
                    return false;
                } else if (lastpanel.length != 0) {
                    DragAndDrop.avanzaSiguienterow(lastpanel);
                    $(_dashcol[_dashcol.length - 1]).css('display', 'none').attr('data-visible', 'false');
                }
            } else if (dashpanel.length != 0 && colmn == 2) {
                DragAndDrop.avanzaSiguienterow(lastpanel);
            }
        }
    },

    avanzaSiguienterow: function (_dpanel) {
        var _rowdashboard = $('div._rowindicador');
        for (var _row = _rowdashboard.length - 1; _row >= 0; _row--) {
            var _dashcolumn = $(_rowdashboard[_row]).find(dashElement).not('[data-visible=false]');
            if (_dashcolumn.length > 0) {
                for (var columnn = _dashcolumn.length - 1; columnn >= 0; columnn--) {
                    var dashpanel = $(_dashcolumn[columnn]).find('[name=dashboard-panel]');
                    if (dashpanel.length != 0) {
                        var idpanel = $(dashpanel).attr('id');
                        if (idpanel === _dpanel.attr('id')) {
                            if (columnn == _dashcolumn.length - 1) {
                                var cl = $(_dashcolumn[columnn]).attr('data-value-col');
                                $(dashpanel).appendTo($(_rowdashboard[_row + 1]).find(dashElement).eq(0));
                                $(_rowdashboard[_row + 1]).find(dashElement).eq(0).removeClass('col-md-4').addClass('col-md-' + cl).attr('data-value-col', cl);
                                $(_rowdashboard[_row + 1]).find(dashElement).eq(1).css('display', 'none').attr('data-visible', 'false');
                                $(_dashcolumn[columnn]).css('display', 'block').removeClass('col-md-' + cl).addClass('col-md-4');
                            } else {
                                $(_dashcolumn[columnn + 1]).css('display', 'none');
                            }
                            return false;
                        } else {
                            if (columnn === _dashcolumn.length - 1) {
                                $(dashpanel).appendTo($(_rowdashboard[_row + 1]).find(dashElement).eq(0));
                            } else {
                                $(dashpanel).appendTo($(_dashcolumn[columnn + 1]));
                            }
                            continue;
                        }
                    }
                }
            }
        }
    },

    ordenatiles: function (_rowsdashboard) {
        var _dashcolumns = $(_rowsdashboard).find(dashElement);
        if (_dashcolumns.length > 0) {
            for (var _column = 0; _column < _dashcolumns.length; _column++) {
                var exist_dashpanel = $(_dashcolumns[_column]).find('[name=dashboard-panel]');
                if (exist_dashpanel.length == 0 && $(_dashcolumns[_column]).attr('data-visible') == 'false') {
                    $(_dashcolumns[_column]).css('display', 'block').attr('data-visible', 'true');
                    return false;
                }
            }
        }
    },

    addSortable: function (event) {
        event.preventDefault();

        // Oculta botones eventos seguridad
        $('div[id="TileSeguridadEventos_btnGroup"]').addClass('hidden');

        $('div[id="divsAdicionales"]').removeClass('hidden');

        // Si existe el div de dragdrop-buttons los borra
        $(filterPanel).find('div[id=dragdrop-buttons]').remove();

        // Oculta los filtros aplicados
        $(filterPanel).find('div[id=filtros-aplicados]').addClass('hidden');

        $('.dragdrop-show-btn > i').removeClass('fa-map-o').addClass('fa-map');

        var $elementButtons = "<div id=\"dragdrop-buttons\" style=\"width:200px; margin:auto;\">";
        $elementButtons += "   <button type=\"button\" class=\"btn btn-default btn-sm btnPrimary\" id=\"btn-save-setting\" style=\"border: 1px solid #010930; color:#010930;\" >";
        $elementButtons += "       GUARDAR";
        $elementButtons += "   </button>";
        $elementButtons += "   <button type=\"button\" class=\"btn btn-default btn-sm\" id=\"btn-cancel-setting\" style=\"border: 1px solid #d58512; color:#d58512;\">";
        $elementButtons += "       CANCELAR";
        $elementButtons += "   </button>";
        $elementButtons += "</div>";

        $(filterPanel).find('div[class=panel-body]').append($elementButtons);

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
                var _valueCol = $(_template).attr('data-value-col');
                var divId = $(_template).attr('id');
                if (divId != 'ColumnSeguridadEventos') {
                    $(_template).removeClass('col-md-' + _valueCol).addClass('col-md-4').attr('data-value-col', '4');
                }
                DragAndDrop.updateCursorToMove();
                DragAndDrop.showHideIconsAdd();
                DragAndDrop.showHideIconsRemove();
            },
            update: function (event, ui) {
                var _template = this;

                var _divId = $(_template).attr('id');
                if (_divId === "ColumnSeguridadEventos") {
                    $(_template).find('[name=dashboard-panel]').css('cssText', 'margin-bottom: 0px !important;');
                } else {
                    $(_template).find('[name=dashboard-panel]').css('cssText', 'margin-bottom: none');
                }

                // Verifica si el icono de showhidden esta oculto
                var _dashColumn = $(_template).find('[name=dashboard-panel]').find('[class=panel-tools]');
                var _hpanel = $(_template).find('[name=dashboard-panel]').find('div.hpanel');
                var _eyehidden = $(_dashColumn).find('a.showhide-panel.hidden');

                if ($(_eyehidden).hasClass('hidden')) {
                    $(_eyehidden).removeClass('hidden');
                    $(_eyehidden).find('i').toggleClass('fa-eye').toggleClass('fa-eye-slash');
                    _hpanel.attr('data-panel-visible', true);
                }

                DragAndDrop.updateCursorToMove();
                DragAndDrop.showHideIconsAdd();
                DragAndDrop.showHideIconsRemove();
            },
            stop: function( event, ui ) {
            }
        }).disableSelection();

        DragAndDrop.updateIconPanels();

        DragAndDrop.updateCursorToMove();

        $('.hpanel.modulo').each(function (index, element) {
            var _isVisible = $(this).attr('data-panel-visible');
            if (_isVisible == 'false') {
                var _elementA = $(this).find('div[class="panel-tools"]');
                $(_elementA).find('a[class="showhide-panel"] > i').removeClass('fa-eye').addClass('fa-eye-slash');
            }

            $(this).closest(dashElement).css('display', '');
        });

        $(dashElement).removeClass('hidden');

        $('.'+panelHead + ' .panel-tools').find('.fa-chevron-up').click();

        DragAndDrop.positionDivHiddenPanels();

        $('[id=content-panel-hidden]').removeClass('hidden');
    },

    updateIconPanels: function () {
        var _paneltools = $(dashElement).find('div[class="panel-tools"]');

        if ($(_paneltools).find('a[class="addrow"]').length == 0) {
            var _iconEyes = "<a class='showhide-panel'><i class='fa fa-eye fa-1x'></i></a>";
            var _iconArrow = "<a class='movetiles'><i class='fa fa-arrows-alt'></i></a>";
            var _iconAddRow = "<a class='addrow'><i class='fa fa-plus'></i></a>";
            var _iconRemoveRow = "<a class='removerow'><i class='fa fa-minus'></i></a>";
            var _iconfull = "<a class='fullscreen1'><i class='fa fa-expand'></i></a>";

            _paneltools.append(_iconEyes);
            _paneltools.append(_iconArrow);
            _paneltools.append(_iconRemoveRow);
            _paneltools.append(_iconAddRow);
            _paneltools.append(_iconfull);

            _paneltools.find('a[data-toggle="popover"]').addClass('hidden');
            _paneltools.find('a[class="fullscreen"]').addClass('hidden');

            //Deshabilitamos el icono para reducir la columa de los panels
            DragAndDrop.showHideIconsAdd();
            DragAndDrop.showHideIconsRemove();
        }
    },

    updateCursorToMove: function () {
        $('.ui-sortable .panel-body, .ui-sortable [name=dashboard-panel]').css('cursor', 'move');
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

    saveSettings: function (event) {
        event.preventDefault();
        var hpanel = $('.hpanel.modulo');
        for (var index = 0; index < hpanel.length; index++) {

            var _isVisible = $(hpanel[index]).attr('data-panel-visible');

            if (_isVisible == 'false') {
                $(hpanel[index]).closest(dashElement).css('display', 'none');
            }
        }

        $('div[id="TileSeguridadEventos_btnGroup"]').removeClass('hidden');

        //DragAndDrop.ajustaPositicionPanels();
        DragAndDrop.resetControls();
    },

    resetSettings: function (event) {
        event.preventDefault();
        //DragAndDrop.resetControls();
        window.location.reload();
    },

    resetControls: function () {
        //Elimina los botones de guardar y cancelar
        $(filterPanel).find('div[id=dragdrop-buttons]').remove();

        //Habilita los controles de filtros aplicados
        $(filterPanel).find('div[id=filtros-aplicados]').removeClass('hidden');

        //$('div[id="divsAdicionales"]').addClass('hidden');

        //Deshabilita en control de sortable para el drag and drop
        $(dashElement).sortable({
            disabled: true
        });

        var _panelHeading = $('.' + panelHead).find('div[class="panel-tools"]');
        _panelHeading.find('a').removeClass('hidden');

        $('.showhide-panel, .movetiles, .addrow, .removerow, .fullscreen1').remove();

        $('.ui-sortable .panel-body, .ui-sortable [name=dashboard-panel]').css('cursor', 'auto');

        $('[id=content-panel-hidden]').addClass('hidden');

        $('.dragdrop-show-btn > i').removeClass('fa-map').addClass('fa-map-o');

        $('#Panel_IndicadorProduccion_Header .panel-tools').find('.fa-chevron-down').click();
        $('#Panel_TileSeguridad_Header .panel-tools').find('.fa-chevron-down').click();
        $('#Panel_TileCaidas_Header .panel-tools').find('.fa-chevron-down').click();
    },

    positionDivHiddenPanels: function () {
        var _mainContent = $('#mainContent').height();
        if (parseInt(_mainContent) < 200 || (parseInt(_mainContent) > 200 && parseInt(_mainContent) < 450)) {
            var top = (document.body.clientHeight) + "px";
            $("#content-panel-hidden").css('margin-top', ((document.body.clientHeight - 210) / 2) + "px");
        } else {
            $("#content-panel-hidden").css('margin-top', '3%');
        }
    },

    ajustaPositicionPanels: function () {
        var _lastElement = null;
        var dashboardpanel = $(dashElement);
        for (var index = 0; index < dashboardpanel.length; index++) {
            if (index < 4) {
                var existElement = $(dashboardpanel[index]).children().children();
                if (existElement.length == 0) {
                    $(dashboardpanel[index]).addClass('hidden');
                }
            }
        }
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
