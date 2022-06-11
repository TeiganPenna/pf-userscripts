// ==UserScript==
// @name         Max HP Land (AoN)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make Archives of Nethys use max hp
// @author       tpenna
// @match        https://www.aonprd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aonprd.com
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(() => {
        const statblock = $('#main');
        if (statblock.length) {
            const hpRegex = /<b>hp<\/b>\s\d+\s\((\d+)d(\d+)([\+|\-])?(\d+)?\)/;
            const statblockHtml = statblock.html();
            const match = statblockHtml.match(hpRegex);

            if (match) {
                const [original, numHd, baseHd, operator, modifier] = match;

                let maxHp = parseInt(numHd) * parseInt(baseHd);
                if (modifier) {
                    if (operator === '+') {
                        maxHp += parseInt(modifier);
                    } else if (operator === '-') {
                        maxHp -= parseInt(modifier);
                    }
                }

                const modifiedHpLine = original + ' (<b>max</b> ' + maxHp + ')';
                const modifiedStatblockHtml = statblockHtml.replace(hpRegex, modifiedHpLine);
                statblock.html(modifiedStatblockHtml);
            }
        }
    });
})();
