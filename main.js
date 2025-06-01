const translations = {
    ar: {
        bigTitle: "بلدية قصر تولال",
    },
    fr: {
        bigTitle: "Commune de Kasr Toullal",
    },
    en: {
        bigTitle: "Municipality of Kasr Toullal",
    },
    am: {
        bigTitle: "ⵜⴰⵖⵉⵡⴰⵏⵜ ⵏ ⵅⵚⴰⵔ ⵜⵓⵍⴰⵍ",
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar" || lang === "am") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
  }

setLanguage("ar");
