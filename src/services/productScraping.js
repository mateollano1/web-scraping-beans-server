const cheerio = require("cheerio");
const axios = require("axios");
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
        console.log("error 1");
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
                name: nombres[index],
                type_weight: almacenamiento[index],
                price: precio[index],
            });

        }
        //Convert to an array so that we can sort the results.
        return {
            data: [...data],
            // positions: [...positions].sort(),

            // tags: [...tags],
            // name: [...nombres],
            // almacenamiento: [...almacenamiento],
            // precio: [...precio],
            // siteName,
        };
    } catch (error) {
        console.log("error 2");

        // next(error);

    }
};

module.exports = {
    getResults,
}