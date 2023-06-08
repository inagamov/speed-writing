import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

// set default language to english
if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "en-US");
}
const lang = localStorage.getItem("lang");

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: lang,
    globalInjection: true,
    warnHtmlMessage: false,
    messages,
  });

  app.use(i18n);
});
