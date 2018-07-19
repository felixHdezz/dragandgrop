/**
 * HOMER - Responsive Admin Theme
 * version 2.0
 *
 */
$(document).ready(function() {
  // Function for collapse hpanel
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

  // Function for close hpanel
  $(".closebox").on("click", function(event) {
    event.preventDefault();
    var hpanel = $(this).closest("div.hpanel");
    hpanel.remove();
    if ($("body").hasClass("fullscreen-panel-mode")) {
      $("body").removeClass("fullscreen-panel-mode");
    }
  });

  // Fullscreen for fullscreen hpanel
  $(".fullscreen").on("click", function() {
    var hpanel = $(this).closest("div.hpanel");
    var icon = $(this).find("i:first");
    $("body").toggleClass("fullscreen-panel-mode");
    icon.toggleClass("fa-expand").toggleClass("fa-compress");
    hpanel.toggleClass("fullscreen");
    setTimeout(function() {
      $(window).trigger("resize");
    }, 100);
  });

  //Function for edit title panel
  $(".edittitle").on("click", function(event) {
    event.preventDefault();
    var hpanel = $(this).closest("div.hpanel");
    var icon = $(this).find("i:first");
    var headerTitle = hpanel.find("div.dashboard-panel-title:first");

    if (icon.hasClass("fa-pencil-square-o")) {
      headerTitle.html(
        '<input type="text" value="' + headerTitle[0].textContent + '">'
      );
    } else {
      headerTitle.html(headerTitle.find("input:first")[0].value);
    }

    icon.toggleClass("fa-pencil-square-o").toggleClass("fa-floppy-o");
  });

  var element = "[name=dashboard-column]";
  var handle = ".panel-body";
  var connect = "[name=dashboard-column]";

  $(".edittitle,.closebox,.showhide").css("display", "none");

  loadDashboardConfig();

  //Function for edit title panel
  $(".dashboard-config").on("click", function(event) {
    event.preventDefault();
    var icon = $(this);

    if (icon.hasClass("pe-7s-config")) {
      $(this)
        .parent().attr('title', 'Guardar Configuración');
        
		$("a[name=resetConfig]").show();

      $(element)
        .sortable({
          handle: handle,
          connectWith: connect,
          tolerance: "pointer",
          forcePlaceholderSize: true,
          opacity: 0.8,
          receive: receiveFn,
          disabled: false
        })
        .disableSelection();

      $(".showhide").css("display", "");

      $("div[name=dashboard-column]").each(function(
        columnIndex,
        columnElement
      ) {
        $(
          "div[id=" + $(columnElement).attr("id") + "] > [name=dashboard-panel]"
        ).each(function(panelIndex, panelElement) {
          $(panelElement).css("display", "");
        });
      });
    } else {
      $(this)
      .parent().attr('title', 'Configuración');
	  
	  $("a[name=resetConfig]").hide();
	  
	  
      $(element).sortable("disable");

      $(".showhide").css("display", "none");

      saveSettings();
    }

    icon.toggleClass("pe-7s-config").toggleClass("pe-7s-diskette");
  });

  //Function to reset configuration
  $(".reset-config").on("click", function(event) {
    event.preventDefault();

    localStorage.removeItem("dashboardConfig");

    localStorage.setItem("dashboardConfig", JSON.stringify(defaultConfig));
    
    
	$("a[name=dashboardConfig] > i").toggleClass("pe-7s-config").toggleClass("pe-7s-diskette");
	  
    $(this)
      .parent()
      .hide();
    $(".showhide").css("display", "none");

    loadDashboardConfig();
  });

  $(".showhide").on("click", function(event) {
    event.preventDefault();    
    var hpanel = $(this).closest("div.hpanel");
    var icon = $(this).find("i:first");
	
    if (icon.hasClass("fa-eye")) {
      hpanel.attr("data-panel-visible", false);
    } else {
      hpanel.attr("data-panel-visible", true);
    }
	
    icon.toggleClass("fa-eye").toggleClass("fa-eye-slash");
  });

  function receiveFn(ev, ui) {
    // $("small[name=currentAction]").text('Panel : '+ui.item[0].id+' Origen : '+ui.sender[0].id+' Destino : '+ev.target.id);
  }

  function saveSettings() {
    var dashboardConfig = [];

    $("div[name=dashboard-column]").each(function(columnIndex, columnElement) {
      $(
        "div[id=" + $(columnElement).attr("id") + "] > [name=dashboard-panel]"
      ).each(function(panelIndex, panelElement) {
        var panel = {
          id: $(panelElement).attr("id"),
          columnId: $(columnElement).attr("id"),
          title: $(panelElement).find("div.dashboard-panel-title:first")[0]
            .textContent,
          isVisible:
            $(panelElement).attr("data-panel-visible") != undefined
              ? $(panelElement).attr("data-panel-visible")
              : true
        };

        if (!panel.isVisible) {
          $(panelElement).css("display", "none");
        }

        dashboardConfig.push(panel);
      });
    });

    localStorage.setItem("dashboardConfig", JSON.stringify(dashboardConfig));

    loadDashboardConfig();
  }

  function loadDashboardConfig() {
		
    var currentConfig = localStorage.getItem("dashboardConfig");
    if (currentConfig != undefined && currentConfig != null) {
      var dataConfig = JSON.parse(currentConfig);
      dataConfig.forEach(function(panel) {
        var icon = $("#" + panel.id).find(".showhide > i");
        icon.removeClass("fa-eye").removeClass("fa-eye-slash");
        $("#" + panel.id).find(
          "div.dashboard-panel-title:first"
        )[0].textContent =
          panel.title;
        if (panel.isVisible == true || panel.isVisible == "true") {
          $("#" + panel.id).css("display", "");
          icon.addClass("fa-eye");
        } else {
          $("#" + panel.id).css("display", "none");
          icon.addClass("fa-eye-slash");
        }
      });
    }
  }
});
