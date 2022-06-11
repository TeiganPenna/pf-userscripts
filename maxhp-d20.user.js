// ==UserScript==
// @name         Max HP Land (d20)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make d20pfsrd use max hp
// @author       tpenna
// @match        https://www.d20pfsrd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=d20pfsrd.com
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
        const statblock = $('.article-content');
        if (statblock.length) {
            const hpBreakdownRegex = /<b>hp<\/b>\s\d+\s\(([0-9d\+\-]+)\)/;
            const statblockHtml = statblock.html();
            const breakdownMatch = statblockHtml.match(hpBreakdownRegex);

            if (breakdownMatch) {
                const [original, breakdown] = breakdownMatch;
                const maxHp = calculate(breakdown);

                const modifiedHpLine = original + ' (<b>max</b> ' + maxHp + ')';
                const modifiedStatblockHtml = statblockHtml.replace(hpBreakdownRegex, modifiedHpLine);
                statblock.html(modifiedStatblockHtml);
            }
        }
    });
})();
