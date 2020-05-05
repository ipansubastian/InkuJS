'use strict';
let Colors = require('./Color');

/**
 * Kelas Printer sebagai template dari objek yang berhubungan dengan output / penulisan
 */
class Printer extends Colors {

    constructor() {
        super();
    }

    // Method yang mengembalikan fungsi yang dibutuhkan untuk menampilkan output.
    getBrush(self = this) {
        function echo(input, style = '', returnText) {

            function styleValidator() {
                if (typeof style !== 'string') {
                    throw new Error(
                        'Argumen pertama harus berupa kode ANSI Escape Squences dalam bentuk string!'
                    );
                }
            }

            async function filterInput(input, style) {

                let stylePattern =  style && 
                                    style.toLowerCase()
                                    .split('.') || [];

                let [fgColor, bgColor, ...txtAttr] = stylePattern;

                switch (fgColor){
                    case 'cyan'     :
                    case 'telorasin':
                    case 'birumuda' :
                        fgColor = 'cyanogen'; break;
                    
                    case 'light':
                        fgColor = 'white'; break;
                }
                switch (bgColor){
                    case 'cyan'     :
                    case 'telorasin':
                    case 'birumuda' :
                        bgColor = 'cyanogen'; break;

                    case 'light':
                        fgColor = 'white'; break;
                }

                fgColor = fgColor && await self[`$${fgColor}Text`] || '';
                bgColor = bgColor && await self[`$${bgColor}Bg`]   || '';

                if (txtAttr.length > 1){
                    for (let [key, attr] of txtAttr.entries()){
                            txtAttr[key] = attr && await self[`$${attr}Text`] || '';
                    }
                } else{
                    txtAttr[0] = txtAttr[0] && await self[`$${txtAttr[0]}Text`] || '';
                }

                let textStyle;
                if (!fgColor && !bgColor && !txtAttr){
                    textStyle = '\x1b[0m';
                } else{
                    textStyle = '\x1b['           +
                                ( fgColor || '' ) + 
                                ( bgColor && ';'  + bgColor || '' );

                    let attributes;
                    for (let attr of txtAttr){
                        attributes = (attr && ';' + attr || '');
                        textStyle += attributes;
                    }

                    textStyle += 'm';
                }
             
                return `${textStyle}${input}`;
            };

            styleValidator();
            
            return filterInput(input, style)
                .then(text => {
                    text += '\x1b[0m';
                    
                    if (returnText){
                        return text;
                    } else{
                        console.log(text);
                    }
                })
                .catch(error => {
                    throw new Error(error);
                });
            }

        return echo;
    }
}

module.exports = Printer;