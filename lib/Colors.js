'use strict';
let fs = require('fs').promises;

/**
 * Kelas Colors sebagai template dari objek yang berhubungan dengan warna.
 */
class Colors {

    constructor() {

        // Style untuk teks: latar depan, latar belakang, dan atribut
        this.textStyles = new Map([
            [
                 "fg",
                [
                    "black",
                    "red",
                    "green",
                    "yellow",
                    "blue",
                    "magenta",
                    "cyanogen",
                    "white",
                ],
            ],

            [
                "bg",
                [
                    "black",
                    "red",
                    "green",
                    "yellow",
                    "blue",
                    "magenta",
                    "cyanogen",
                    "white",
                ],
            ],

            [
                "attr",
                [
                    "reset",
                    "bold",
                    "dim",
                    "italic",
                    "underline",
                    "blink",
                    "light",
                    "reversed",
                    "hidden",
                    "strike",
                ],
            ],
        ]);

        // Gunakan perulangan untuk menginisialisasi properti style
        for (let styleTypes of this.textStyles.keys()) {
            let textStyles = this.textStyles;

            if (styleTypes === "fg") {
                for (let styleName of textStyles.get(styleTypes)) {
                    this[`$${styleName}Text`] = this.getColor(["fg", styleName]);
                }
            }
            
            else if (styleTypes === "bg") {
                for (let styleName of textStyles.get(styleTypes)) {
                    this[`$${styleName}Bg`] = this.getColor(["bg", styleName]);
                }
            }

            else {
                for (let styleName of textStyles.get(styleTypes)) {
                    this[`$${styleName}Text`] = this.getColor(["attr", styleName]);
                }
            }
        }
    }

    // Method ini mengembalikan path lengkap dari sebuah file, relatif terhadap file saat ini (Colors.js)
    getFile(file) {
        let moduleDir = module.filename.split('/');
        moduleDir.pop()
        file = moduleDir.join('/') + `/${file}`;
        return file;
    }

    // Method untuk mengambil konfigurasi kode warna
    getColor(textStyle = ["attr", "reset"]) {
        switch (textStyle[0]) {
            case "attr":
                textStyle[0] = "attributes";
                break;

            case "fg":
            textStyle[0] = "foreGround";
                break;

            case "bg":
                textStyle[0] = "backGround";
                break;

            default:
                textStyle[0] = "attributes";
                break;
        }

        switch (textStyle[1]) {
            case "reset":
                textStyle[1] = "normal";
        }

        // Kembalikan nilai berupa promise
        return new Promise(async (resolve) => {
            let colorConf = this.getFile('../etc/colors.json');
            let fileBuffer = JSON.parse(
                await (await fs.readFile(colorConf)).toString()
            );

            if (textStyle.length === 2) {
                resolve(fileBuffer[textStyle[0]][textStyle[1]]);
            } else {
                resolve(fileBuffer[textStyle[0]]);
            }
        });
    }
}

module.exports = Colors;