'use strict';
let Colors = require('./Colors');

/**
 * Kelas Printer sebagai template dari objek yang berhubungan dengan output / penulisan
 */
class Printer extends Colors {

    constructor() {
        super();
    }

    // Method yang mengembalikan fungsi yang dibutuhkan untuk menampilkan output.
    getBrush(self = this) {
        function echo(input, style = '') {
            if (typeof style !== "string") {
                throw new Error(
                    "Argumen pertama harus berupa kode ANSI Escape Squences dalam bentuk string!"
                );
            }

            let filterInput = async (input, style) => {

                let stylePattern = style && style.split('.') || [];
                let [fgColor, bgColor, ...txtAttr] = stylePattern;

                switch (fgColor){
                    case 'cyan':
                        fgColor = 'cyanogen'; break;
                }
                switch (bgColor){
                    case 'cyan':
                        bgColor = 'cyanogen'; break;
                }

                fgColor = fgColor && await self[`$${fgColor}Text`] || '';
                bgColor = bgColor && await self[`$${bgColor}Bg`]   || '';

                if (txtAttr.length > 1){
                    for (let [key, val] of txtAttr.entries()){
                            txtAttr[key] = txtAttr[key] && await self[`$${txtAttr[key]}Text`] || '';
                    }
                } else{
                    txtAttr[0] = txtAttr[0] && await self[`$${txtAttr[0]}Text`] || '';
                }

                let textStyle;

                if (!fgColor && !bgColor && !txtAttr){
                    textStyle = '\x1b[0m';
                } else{
                    textStyle = 
                    '\x1b['           +
                    ( fgColor || '' ) + 
                    ( bgColor && ';'  + bgColor || '' );

                    let attributes;
                    let val;
                    for (val of txtAttr){
                        attributes = (val && ';' + val || '');
                        textStyle += attributes;
                    }

                    textStyle += 'm';
                }
             
                return `${textStyle}${input}`;
            };

            filterInput(input, style)
            .then(console.log);
        };

        return echo;
    }
}

module.exports = Printer;