const { JSDOM } = require('jsdom');
const xpath = require('xpath');

export function findTextInHTML(html: string, text: string): string[] {
    const dom = new JSDOM(html);
    const xpathExpression = `//*[text()[contains(.,'${text}')]]`;
    const nodes = xpath.select(xpathExpression, dom.window.document);
    //console.log("dom.window.document", dom.window.document)
    let xpaths: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
        xpaths.push(getNodeXPath(nodes[i], dom.window.document));
    }
    return xpaths;
}

function getNodeXPath(node: any, doc: any): string {
    if(!node.parentNode) return '/';
    const idx = getElementIdx(node);
    return `${getNodeXPath(node.parentNode, doc)}/${node.nodeName.toLowerCase()}[${idx}]`;
}

function getElementIdx(element: any) {
    let count = 1;
    for (let sib = element.previousSibling; sib ; sib = sib.previousSibling) {
        if(sib.nodeName === element.nodeName) {
            count++;
        }
    }
    return count;
}
