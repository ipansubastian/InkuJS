'use strict'

/**
 * Panggil file loader.js untuk memanggil konfigurasi yang dibutuhkan. 
 */
require('./loader/loader.js')

/**
 * Panggil kelas Printer sebagai kelas yang akan diinstansiasi sebagai objek InkuJS
 */
const Inku = require('./lib/Printer')

/**
 * Ekspor objek agar dapat digunakan di program lain
 */
module.exports = new Inku()