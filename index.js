
/** @jsx hs */
export function hs(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
}

export function render(vnode) {
    if (vnode.split) return document.createTextNode(vnode);

    let n = document.createElement(vnode.nodeName);


    let a = vnode.attributes || {};
    // Object.keys(a).forEach( k => n.setAttribute(k, a[k]));

    // adding an eventlistener "onClick" like React
    Object.keys(a).forEach((k) => {
        if (k.startsWith("on") && typeof a[k] === "function") {
            // It's an event handler like onClick
            const eventName = k.slice(2).toLowerCase();
            n.addEventListener(eventName, a[k]);
        } else {
            n.setAttribute(k, a[k]);
        }
    });


    (vnode.children || []).forEach(c => n.appendChild(render(c)));

    return n;
}

function patch($domNode, oldVNode, newVNode) {
    if (typeof oldVNode !== typeof newVNode || (typeof newVNode === "number" || typeof newVNode === "string" || newVNode === "boolean") && newVNode !== oldVNode) {

        const $newNode = render(newVNode);
        $domNode.replaceWith($newNode);
        return $newNode;
    }

}


export function element(nodeName, attributes, ...args) {
    let dom = render(hs(nodeName, attributes, ...args));
    document.body.appendChild(dom);
    vdom.vdom.push(dom);
    console.log(vdom, document.body);
    const newVdom = patch(dom, vdom.vdom, document.body);
    vdom.vdom = newVdom;
}

let vdom = { vdom: [] };

