// Getting the path of the plugin, and formatting it
var templatePath  = Drupal.settings.wysiwyg.configs.ckeditor.formatrich_text.customConfig;
templatePath      = templatePath.replace(/\/[^\/]*$/, '/ck-templates/custom-templates.js').substr(1);

CKEDITOR.editorConfig = function( config ) {
  config.templates_files = [ Drupal.settings.basePath + templatePath ];
  config.templates_replaceContent = false;
};
