"use strict"

const selectElements = document.querySelectorAll(".container select")
const textAreaFrom = document.getElementById("textarea-from")
const textAreaTo = document.getElementById("textarea-to")
const translateBtn = document.getElementById("translate-btn")

const countries = {
    "en-EN": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "de-DE": "Alemão",
    "ru-RU": "Russo",
    "fr-FR": "Francês",
    "ja-JP": "Japonês",
    "zh-ZH": "Chinês",
    "pl-PL": "Polonês",
    "pt-BR": "Português"
}

selectElements.forEach((select) => {
    for(let country in countries) {
        let selected = ""
        if(select.className.includes("select-from") && country === "en-EN") {
            selected = "selected"
        }
        else if(select.className.includes("select-to") && country === "pt-BR") {
            selected = "selected"
        }
        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`
        select.insertAdjacentHTML("beforeend", option)
    }
})

translateBtn.addEventListener("click", function() {
    if(textAreaFrom.value) {
        loadTranslation()
    }
    else {
        window.alert("Digite um texto para traduzir!")
    }
})

async function loadTranslation() {
    const translate = await fetch(`https://api.mymemory.translated.net/get?q=${textAreaFrom.value}&langpair=${selectElements[0].value}|${selectElements[1].value}`)
    translate.json().then((data) => {
        if(data.responseStatus === 200) {
            textAreaTo.value = data.responseData.translatedText
        }
        else if(data.responseStatus === "403" && selectElements[0].value === selectElements[1].value) {
            textAreaTo.value = ""
            window.alert("Selecione duas linguagens diferentes!")
        }
    })
}