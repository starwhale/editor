$(document).ready(function() {

    viewparts.load("core-settings", $("#settings"));

    $('body').on('click', '#left-navbar li a', function() {
      var selectedSettingsTab = $(this).attr("href").slice(1);
      viewparts.load(selectedSettingsTab, $("#settings"));
    });

    $('#selectDemo').on('change', function (e) {
    var optionSelected = $("option:selected", this).text();
    settings.set(this.id, optionSelected);
    settings.save();
  });


});
