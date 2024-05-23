// import { AES } from "crypto-js/aes";
import CryptoJS from "crypto-js";
const baseUrl = process.env.baseUrl;

export const storageService = {
    add,
    remove,
    get,
    checkRole,
    getToken,
    getName,
    getProfilePicture
}

function add(itemName, value) {
    const encrypted = encryptAES(value)
    localStorage.setItem(itemName, encrypted);
}

function remove(itemName) {
    localStorage.removeItem(itemName)
}

function get(itemName) {
    const encrypted = localStorage.getItem(itemName);
    const decrypted = decryptAES(encrypted);
    return decrypted;
}

function encryptAES(plaintext) {
    const e = CryptoJS.AES.encrypt(plaintext, 'process.env.SECRET_KEY')
    return e

}

function decryptAES(chipertext) {
    if(chipertext == null || chipertext == undefined || chipertext == "") {
        return
    }
    const d = CryptoJS.AES.decrypt(chipertext, 'process.env.SECRET_KEY').toString(CryptoJS.enc.Utf8)
    if(d == "true") {
        return true;
    }
    if(d == "false") {
        return false;
    }
    return d.toString(CryptoJS.enc.Utf8)

}

function checkRole(role_id) {
    if(role_id === 'cdfd72c4-b80b-4658-b255-af519dde1fb2')
        return 'Administrator'
    else if(role_id === '397d5ca4-c888-4114-b8fe-3ebe4098898d')
        return 'Lecturer'
    else if(role_id === 'eba37e02-67e2-4729-84f4-1c15e045508e')
        return 'Participant'
    else if(role_id === '7486af52-1218-49e6-896a-39e52ea73045')
        return 'Ketua'
}

function getToken() {
    let userString = get('user');
    let user;
    if(userString) {
        user = JSON.parse(userString)
    }
    return 'Bearer ' + user.token;
}

function getName() {
    let userString = get('user');
    let user;
    if(userString) {
        user = JSON.parse(userString)
    }
    return user.name;
}

function getProfilePicture() {
    let userString = get('user');
    let user;
    if(userString) {
        user = JSON.parse(userString)
    }
    return user.profile_picture;
}
