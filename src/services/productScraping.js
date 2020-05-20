const cheerio = require("cheerio");
const axios = require("axios");
const mailService = require('../services/mail');
const siteUrl = "https://www.lamayorista.com.co/";
let siteName = "";
const precio = [];
const tags = new Set();
const nombres = [];
const almacenamiento = [];

const fetchData = async() => {
    try {
        const result = await axios.get(siteUrl);
        return cheerio.load(result.data);
    } catch (error) {
        console.log(error)
        mailService.sendMail("Error en extracción de datos.")
    }

};
const splitInformation = (element) => {
    let wordSel = ""
    let completeWord = ""
    for (let index = 0; index < element.length; index++) {

        const num = element[index];
        if (num !== " " && num !== "\n") {
            wordSel += num
        } else {
            if (wordSel.length > 0) {
                if (wordSel == "caja" || wordSel == "Caja" || wordSel == "cm3" || wordSel == "bolsa" || wordSel == "Litro" || wordSel == "yumbo" || wordSel == "grs") {
                    return false
                } else {
                    if (wordSel !== "kilo" && wordSel !== "kilos" && wordSel !== "arroba" && wordSel !== "libra" && wordSel !== "unidad") {
                        completeWord = completeWord + " " + wordSel
                    } else {
                        nombres.push(completeWord)
                        almacenamiento.push(wordSel)
                    }
                    if (wordSel.includes("$")) {
                        precio.push(wordSel)
                        index = element.length
                    }
                    wordSel = ""
                }
            }
        }
    }
    return true
}
const getResults = async() => {
    try {
        const $ = await fetchData();
        siteName = $('.ampliar').text();
        $("#lista_precios .gradeA ").each((index, element) => {

            let result = splitInformation($(element).text())
            if (result) {
                tags.add($(element).text());
            }
        });
        var data = []
        for (let index = 0; index < 105; index++) {
            data.push({
                name: cleanData(nombres[index]),
                type_weight: almacenamiento[index],
                price: precio[index],
            });

        }
        return {
            data: [...data],
        };
    } catch (error) {
        console.log("error 2");
        console.log(error)
        mailService.sendMail("Error en conexión a la página web.")
            // next(error);

    }
};

cleanData = (data) => {
    if (data.includes("*") || data[0] == " ") {
        console.log("-" + data + "-");
        let i = 0;
        while (i < data.length) {
            if (data[i] !== " " && data[i] !== "*") {
                break
            }
            i++
        }
        return data.substring(i, data.length)
    }
    return data
}

module.exports = {
    getResults,
}