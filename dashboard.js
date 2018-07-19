var defaultConfig = [{"id":"dashboard-panel-1","columnId":"dashboard-column-1","title":"VISITAS","isVisible":true},
{"id":"dashboard-panel-5","columnId":"dashboard-column-2","title":"RECLAMOS INGRESADOS","isVisible":true},
{"id":"dashboard-panel-7","columnId":"dashboard-column-3","title":"ACCIONES CORRECTIVAS","isVisible":true},
{"id":"dashboard-panel-4","columnId":"dashboard-column-4","title":"STOCK RETENIDO","isVisible":true}];

$(document).ready(function(){
    var dashboardConfig = JSON.parse(localStorage.getItem('dashboardConfig'));
    
    if(dashboardConfig === null)
        dashboardConfig = defaultConfig;    

    panelPlugin.generatePanels(dashboardConfig);
});