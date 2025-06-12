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

// const btns=document.querySelectorAll(".btn");
// btns.forEach(btn=>{
//     btn.addEventListener("click", function(){
//         document.querySelector(".btn.active")?.classList.remove("active");
//         this.classList.add("active");
//     });
// });

setLanguage("ar");
