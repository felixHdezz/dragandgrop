var dashElement = "[name=dashboard-column]";
var filterPanel = "[id=selected-filters-panel]";
var handle = ".hpanel.modulo";
var connect = "[name=dashboard-column]";
var panelHead = "panel-heading";
var panel = '[name=dashboard-panel]';

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

            DragAndDrop.agregaColumns($(_dashcolumn).closest('div._rowindicador'), $(_dashcolumn).closest('div._rowindicador').find(dashElement), _dashpanel);
            
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
            debugger;
            //Recorre los rows
            DragAndDrop.ordenatiles(_rowsdashboard);

            _dashcolumn.removeClass('col-md-' + _value_col).addClass('col-md-' + (parseInt(_value_col) - 4)).attr('data-value-col', (parseInt(_value_col) - 4));
        }
        DragAndDrop.showHideIconsAdd();
        DragAndDrop.showHideIconsRemove();
        return false;
    },

    agregaColumns: function (rinditr, _rDash, _pDash) {
        for (var _col = 0; _col < _rDash.length; _col++) {
            if ($(_rDash[_col]).find(panel).attr('id') === _pDash.attr('id')) {
                var af = $(_rDash[0]).find(panel);
                var nxt = $(_rDash[1]).find(panel);
                var lst = $(_rDash[2]).find(panel);
                if (_col == 0) {
                    if (nxt.length == 0) {
                        $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (lst.length == 0) {
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (nxt.length != 0 && lst.length != 0) {
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                        DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel), $(_rDash[2]).attr('data-value-col'))
                    }
                    if (nxt.length != 0 && lst.length == 0) {
                        $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                        DragAndDrop.avanzaSiguienterow($(_rDash[1]).closest('div._rowindicador').next(), $(_rDash[1]).find(panel), $(_rDash[1]).attr('data-value-col'))
                    }
                } else if (_col == 1) {
                    if (lst.length == 0) {
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (af.length == 0) {
                        $(_rDash[0]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (af.length != 0 && lst.length == 0) {
                        if ($(_rDash[_col]).attr('data-value-col') == 8) {
                            $(_rDash[2]).css('display', 'none').attr('data-visible', 'false');
                        } else {
                            $(_rDash[2]).css('display', 'block').attr('data-visible', 'true');
                            DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel), $(_rDash[_col]).attr('data-value-col'))
                            $(_rDash[1]).removeClass('col-md-' + $(_rDash[_col]).attr('data-value-col')).addClass('col-md-4').attr('data-value-col', '4');
                        }
                    }
                    if (af.length != 0 && lst.length != 0) {
                        $(_rDash[2]).css('display', 'none').attr('data-visible', 'true');
                        DragAndDrop.avanzaSiguienterow($(_rDash[2]).closest('div._rowindicador').next(), $(_rDash[2]).find(panel), $(_rDash[2]).attr('data-value-col'))
                    }
                } else if (_col == 2) {
                    if (af.length == 0) {
                        $(_rDash[0]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (nxt.length == 0) {
                        $(_rDash[1]).css('display', 'none').attr('data-visible', 'false');
                    }
                    if (af.length != 0 && nxt.length != 0) {
                        DragAndDrop.avanzaSiguienterow($(_rDash[_col]).closest('div._rowindicador').next(), $(_rDash[_col]).find(panel), $(_rDash[_col]).attr('data-value-col'))
                    }
                }
            }
        }
    },

    avanzaSiguienterow: function (_rdash, _dpanel, _val) {
        $(_dpanel).closest(dashElement).removeClass('col-md-' + _val).addClass('col-md-4').attr('data-value-col', '4');
        var _dcols = $(_rdash).find(dashElement);
        for (var _col = _dcols.length - 1; _col >= 0; _col--) {
            if ($(_dcols[_col]).find(panel).length == 0) {
                $(_dpanel).closest(dashElement).removeClass('col-md-' + _val).addClass('col-md-4').attr('data-value-col', '4');
                $(_dpanel).appendTo($(_dcols[_col]));
                //$(_dcols[_col]).removeClass('col-md-'+$(_dcols[_col]).attr('data-value-col')).addClass('col-md-'+_val).attr('data-value-col','4');
                $(_dcols[_dcols.length + 1]).css('display', 'block').attr('data-visible', 'true');
            } else if ($(_dcols[_col]).find(panel).length != 0) {
                var val = $(_dcols[_col]).attr('data-value-col');
                $(_dcols[_col]).find(panel).appendTo($(_dcols[_col + 1]));
                //$(_dcols[_col + 1]).removeClass('col-md-4').addClass('col-md-'+).attr('data-value-col','4');
                $(_dpanel).appendTo($(_dcols[_col]));
            }
        }


        var _dcols = $(_rdash).find(dashElement);
        if (_dpanel.length != 0) {
            $(_dpanel).closest(dashElement).removeClass('col-md-' + _val).addClass('col-md-4').attr('data-value-col', '4');
            for (var _col = _dcols.length - 1; _col >= 0; _col--) {
                if ($(_dcols[_col]).find(panel).length == 0) {
                    $(_dpanel).appendTo($(_dcols[_col]));
                    $(_dcols[_dcols.length + 1]).css('display', 'block').attr('data-visible', 'true');
                } else if ($(_dcols[_col]).find(panel).length != 0) {
                    var val = $(_dcols[_col]).attr('data-value-col');
                    if (val != 12) {
                        $(_dcols[_col]).find(panel).appendTo($(_dcols[_col + 1]));
                        if ($(_dcols[_col + 1]).attr('data-visible') === 'false') {
                            $(_dcols[_col + 1]).css('display', 'block').attr('data-visible', 'true');
                        }
                        $(_dcols[_col]).removeClass('col-md-' + val).addClass('col-md-4').attr('data-value-col', '4');
                        $(_dcols[_col + 1]).removeClass('col-md-4').addClass('col-md-' + val).attr('data-value-col', val);
                        $(_dpanel).appendTo($(_dcols[_col]));
                    } else {
                        //Si el indicador de la fila tiene una columna de 12, pasa a la siguente linea del row
                        DragAndDrop.avanzaSiguienterow($(_rdash).next(), _dpanel, _val); 
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

                var _val = $(_template).attr('data-value-col');
                $(_template).removeClass('col-md-' + _val).addClass('col-md-4').attr('data-value-col', '4');
                var _tdashcols = $(_template).closest('div._rowindicador');

                var _colums = $(_tdashcols).find(dashElement);

                //Busca elementos dentro del row si están ocultos, para mostrar
                for (var col = 0; col < _colums.length; col++) {
                    //Si no tiene un dashboard-panel
                    if ($(_colums[col]).find(panel).length === 0) {
                        $(_colums[col]).css('display', 'block').attr('data-visible', 'true');
                    }
                }

                //Actualiza los iconos de los indicadores 
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
                var _eyehidden = $(_dashColumn).find('a.showhide-panel');

                if (!$(_template).closest('div[id="content-panel-hidden"]').length != 0) {
                    if ($(_eyehidden).hasClass('hidden')) {
                        $(_eyehidden).removeClass('hidden');
                        $(_eyehidden).find('i').toggleClass('fa-eye').toggleClass('fa-eye-slash');
                        _hpanel.attr('data-panel-visible', true);
                    }
                } else {
                    $(_eyehidden).addClass('hidden');
                    $(_eyehidden).find('i').toggleClass('fa-eye').toggleClass('fa-eye-slash');
                    _hpanel.attr('data-panel-visible', false);
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
