function replacetemp(str1, obj) {
    let page = str1.replace(/{%PRODUCTNAME%}/g, obj.name);
    page = page.replace(/{%QUANTITY%}/g, obj.quantity);
    page = page.replace(/{%PRICE%}/g, obj.price);
    return page;
}
module.exports = replacetemp;