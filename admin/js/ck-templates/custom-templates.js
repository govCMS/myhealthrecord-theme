/*
  CKEditor Custom Templates accordion
*/
var templatePath  = Drupal.settings.wysiwyg.configs.ckeditor.formatrich_text.customConfig
templatePath      = templatePath.replace(/\/[^\/]*$/, '/ck-templates/images/').substr(1)

CKEDITOR.addTemplates("default", {
  imagesPath: Drupal.settings.basePath + templatePath,
  templates: [{
    title: "Statistics with numbers",
    image: "statistic-numeric.png",
    description: "An accessible statistic row with 4 items with an icon each.",
    html: '\x3Cul class=\x22statistic-numeric-items\x22\x3E \x3Cli class=\x22item\x22\x3E \x3Cimg src=\x22/sites/all/themes/govcms_mhr/images/file-folder.png\x22 alt=\x22\x22\x3E \x3Cp\x3E\x3Cstrong class=\x22stat-number\x22\x3E5.5 million\x3C/strong\x3E people have registered for a My Health Record across Australia\x3C/p\x3E\x3C/li\x3E\x3Cli class=\x22item\x22\x3E \x3Cimg src=\x22/sites/all/themes/govcms_mhr/images/heart-document.png\x22 alt=\x22\x22\x3E \x3Cp\x3E\x3Cstrong class=\x22stat-number\x22\x3E4 million\x3C/strong\x3E clinical documents have been uploaded to people\x27s My Health Records\x3C/p\x3E\x3C/li\x3E\x3Cli class=\x22item\x22\x3E \x3Cimg src=\x22/sites/all/themes/govcms_mhr/images/medicine-bottle.png\x22 alt=\x22\x22\x3E \x3Cp\x3E\x3Cstrong class=\x22stat-number\x22\x3EOver 16 Million\x3C/strong\x3E medication prescription and dispense records have been uploaded\x3C/p\x3E\x3C/li\x3E\x3Cli class=\x22item\x22\x3E \x3Cimg src=\x22/sites/all/themes/govcms_mhr/images/home-icon-2.png\x22 alt=\x22\x22\x3E \x3Cp\x3E\x3Cstrong class=\x22stat-number\x22\x3E10,683\x3C/strong\x3E healthcare professionals are connected, including GPs, hospitals, pharmacies and aged care services\x3C/p\x3E\x3C/li\x3E\x3C/ul\x3E'
  }, {
    title: "Statistic one line",
    image: "statistic-oneline.png",
    description: "A single line statistic with a title and an icon.",
    html: '\x3Cdiv class=\x22statistic-oneline\x22\x3E \x3Ch2\x3EHealthcare provider registrations\x3C/h2\x3E \x3Cimg src=\x22/sites/all/themes/govcms_mhr/images/heart-document.png\x22 alt=\x22 \x22/\x3E \x3Cp\x3E\x3Cstrong\x3E10,683\x3C/strong\x3E healthcare professionals are connected, broken across 8 types of provider organisation.\x3C/p\x3E\x3C/div\x3E'
  }, {
    title: "Statistic tables",
    image: "statistic-tables.png",
    description: "Two tables with a title, a description and an icon each.",
    html: '\x3Cdiv class=\x22about-statistics-breakdown\x22\x3E \x3Cdiv class=\x22about-statistics-breakdown-table\x22\x3E \x3Ctable\x3E \x3Ccaption\x3E \x3Cp\x3E\x3Cimg alt=\x22 \x22 src=\x22/sites/all/themes/govcms_mhr/images/file-folder.png\x22\x3E\x3C/p\x3E\x3Ch3\x3ETitle\x3C/h3\x3E \x3Cp\x3EDescription of the table\x3C/p\x3E\x3C/caption\x3E \x3Cthead\x3E \x3Ctr\x3E \x3Cth\x3EData Label\x3C/th\x3E \x3Cth\x3E\x26nbsp \x26nbsp %\x3C/th\x3E \x3C/tr\x3E\x3C/thead\x3E \x3Ctbody\x3E \x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3C/tbody\x3E \x3C/table\x3E \x3C/div\x3E\x3Cdiv class=\x22about-statistics-breakdown-table\x22\x3E \x3Ctable\x3E \x3Ccaption\x3E \x3Cp\x3E\x3Cimg alt=\x22 \x22 src=\x22/sites/all/themes/govcms_mhr/images/home-icon-2.png\x22\x3E\x3C/p\x3E\x3Ch3\x3ETitle\x3C/h3\x3E \x3Cp\x3EDescription of the table\x3C/p\x3E\x3C/caption\x3E \x3Cthead\x3E \x3Ctr\x3E \x3Cth\x3EData Label\x3C/th\x3E \x3Cth\x3E\x26nbsp \x26nbsp %\x3C/th\x3E \x3C/tr\x3E\x3C/thead\x3E \x3Ctbody\x3E \x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3Ctr\x3E \x3Ctd\x3EData\x3C/td\x3E\x3Ctd\x3E0%\x3C/td\x3E\x3C/tr\x3E\x3C/tbody\x3E \x3C/table\x3E \x3C/div\x3E\x3C/div\x3E'
  }, {
    title: "Step by step",
    image: "step-by-step.png",
    description: "A step by step mini guide, with a description and a bullet list.",
    html: '\x3Cdiv class=\x22step-by-step text-highlight\x22\x3E \x3Ch2\x3EStep by step\x3C/h2\x3E \x3Cp\x3ELorem ipsum dolor imet.\x3C/p\x3E\x3Cul\x3E \x3Cli\x3ELorem\x3C/li\x3E\x3Cli\x3EIpsum\x3C/li\x3E\x3Cli\x3EDolor\x3C/li\x3E\x3Cli\x3EImet\x3C/li\x3E\x3C/ul\x3E\x3C/div\x3E'
  }]
});
