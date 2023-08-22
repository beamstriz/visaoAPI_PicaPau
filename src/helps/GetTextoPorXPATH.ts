const { JSDOM } = require('jsdom');
const xpath = require('xpath');
//OBRIGATORIO PASSAR A PARGINA HTML FORMATADA PELA A BIBLIOTECA JSDOM
//EXEMPLO: const dom = new JSDOM(html);
export function getXPathText(html: any, xpathExpression: string): string {
    const dom = html;
    var XPathResult = xpath.XPathResult;
    const nodes = dom.window.document.evaluate(xpathExpression, dom.window.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const textoDoXpathNaoExiste = nodes.singleNodeValue == null
    if (textoDoXpathNaoExiste) {
        //console.log("Falha ao pegar xpath", nodes);
        // console.log("xpath", xpathExpression);
        return null;
    }
    return nodes.singleNodeValue.textContent;
}

