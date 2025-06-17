const translations = {
    ar: {
        bigTitle: "بلدية قصر تولال",
        navbar1:"الرئيسية",
        navbar2:"من نحن",
        navbar3:"خدمات",
        navbar4:"أخبار",
        navbar5:"تواصل معنا",
    },
    fr: {
        bigTitle: "Commune de Kasr Toullal",
        navbar1:"Accueil",
        navbar2:"Sommes-nous",
        navbar3:"Services",
        navbar4:"Nouvelles",
        navbar5:"Contactez-nous",
    },
    en: {
        bigTitle: "Municipality of Kasr Toullal",
        navbar1:"Home",
        navbar2:"About us",
        navbar3:"Services",
        navbar4:"Nwes",
        navbar5:"Contact us",
    },
    am: {
        bigTitle: "ⵜⴰⵖⵉⵡⴰⵏⵜ ⵏ ⵅⵚⴰⵔ ⵜⵓⵍⴰⵍ",
        navbar1:"ⴰⵅⴰⵎ",
        navbar2:"ⴰⵏⵡⴰ ⵉ ⵏⴻⵍⵍⴰ",
        navbar3:"ⵉⵎⴻⵥⵍⴰ",
        navbar4:"ⵉⵎⴰⵢⵏⵓⵜⴻⵏ",
        navbar5:"ⵣⵣⵓ ⵖⵓⵔⵏⴻⵖ",
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

const btns=document.querySelectorAll(".btn");
btns.forEach(btn=>{
    btn.addEventListener("click", function(){
        document.querySelector(".btn.active")?.classList.remove("active");
        this.classList.add("active");
    });
});

setLanguage("ar");
