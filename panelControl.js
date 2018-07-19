var panelPlugin = (function(){
    
    var _data = [];

    function _generatePanels(data){
		
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var _panel = $('<div/>').addClass('hpanel').attr('name', 'dashboard-panel').attr('id', obj.id);
            
            var _panelHeading = $('<div/>').addClass('panel-heading hbuilt');

            var _panelTools = $('<div/>').addClass('panel-tools');

            var _editTitle = $('<a/>').addClass('edittitle').attr('title', '').append($('<i/>').addClass('fa fa-pencil-square-o fa-1x'))
            var _showHide = $('<a/>').addClass('showhide').attr('title','Mostrar/Ocultar Panel').append($('<i/>').addClass(obj.isVisible ? 'fa fa-eye fa-1x' : 'fa fa-eye-slash fa-1x'))
            var _collapsePanel = $('<a/>').addClass('colapsepanel').attr('title', 'Expandir/Contraer').append($('<i/>').addClass('fa fa-chevron-up fa-1x'))
            var _fullscreen = $('<a/>').addClass('fullscreen').attr('title', 'Modo Pantalla Completa').append($('<i/>').addClass('fa fa-expand fa-1x'))
            var _closebox = $('<a/>').addClass('closebox').attr('title', 'Cerrar Panel').append($('<i/>').addClass('fa fa-times fa-1x'))

            _panelTools.append(_editTitle);
            _panelTools.append(_showHide);
            _panelTools.append(_collapsePanel);
            _panelTools.append(_fullscreen);
            _panelTools.append(_closebox);

            var _panelTitle = $('<div/>').addClass('dashboard-panel-title').text(obj.title);

            _panelHeading.append(_panelTools);
            _panelHeading.append(_panelTitle);

            var _panelBody = $('<div/>').addClass('panel-body');
            var _p = $('<p/>').text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
            
            _panelBody.append(_p);

            _panel.append(_panelHeading);
            _panel.append(_panelBody);

            $("#panel-content").find('#' + obj.columnId).append(_panel);

        }
        return;        
    };

    return {
        generatePanels : _generatePanels
    };
})();

