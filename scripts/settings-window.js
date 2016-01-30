$(document).ready(function() {

  loadActiveSettings();

  function loadActiveSettings() {
    var activeSettingsTab = $("#left-navbar li").find(".active");
    var view_part_name = $(activeSettingsTab).attr("href").slice(1);

    viewparts.load(view_part_name, $("#settings"));
  }

    $("#left-navbar li").click(loadActiveSettings);

    $('#selectDemo').on('change', function (e) {
    var optionSelected = $("option:selected", this).text();
    settings.set(this.id, optionSelected);
    settings.save();
  });

});
