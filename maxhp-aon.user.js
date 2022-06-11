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

/* globals jQuery, $ */

(function() {
    'use strict';

    // replace 'd' with '*' and eval
    function calculate(breakdown) {
        const equation = breakdown.replaceAll('d', '*');
        return eval(equation);
    }

    $(document).ready(() => {
        const statblock = $('#main');
        if (statblock.length) {
            const hpBreakdownRegex = /<b>hp<\/b>\s\d+\s\((\d+\s+HD;\s*)?([0-9d\+\-]+)\)/;
            const statblockHtml = statblock.html();
            const breakdownMatch = statblockHtml.match(hpBreakdownRegex);

            if (breakdownMatch) {
                const [original, _, breakdown] = breakdownMatch;
                const maxHp = calculate(breakdown);

                const modifiedHpLine = original + ' (<b>max</b> ' + maxHp + ')';
                const modifiedStatblockHtml = statblockHtml.replace(hpBreakdownRegex, modifiedHpLine);
                statblock.html(modifiedStatblockHtml);
            }
        }
    });
})();
