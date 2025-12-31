
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




function patch(parent, oldVNode, newVNode) {
    if(!oldVNode){
        //if there's no old node then create a new one
        const newNode = render(newVNode)
        parent.appendChild(newNode);
        return newNode
    }
    if(!newVNode){
        const removeNode  = oldVNode;
        parent.removeChild(removeNode)
        return null;
    }
   
    // if (typeof oldVNode !== typeof newVNode || (typeof newVNode === "number" || typeof newVNode === "string" || typeof newVNode === "boolean") && newVNode !== oldVNode) {

    //     const $newNode = render(newVNode);
    //     $domNode.replaceWith($newNode);
    //     return $newNode;
    // }
    patchChildren(newVNode,oldVNode.children,newVNode.children);
}




export function patchChildren(parent,oldChildren = [],newChildren = []){
    const len = Math.max(oldChildren.length,newChildren.length)
    for(let i = 0 ;i<len;i++){
        patch(
            parent,
            oldChildren[i],
            newChildren[i]
        )
    }
}





export function element(nodeName, attributes, ...args) {
    let node = hs(nodeName, attributes, ...args);    
    console.log(vdom);
    patch(document.body, oldNode, node);
    oldNode = node;
    vdom.push(node);
}

let vdom = [];
let oldNode = undefined;

