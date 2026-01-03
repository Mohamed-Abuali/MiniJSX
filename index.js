
/** @jsx hs */
export function hs(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    if(children){
        children = children.map(child => {
            if(typeof child === 'string' || typeof child === 'number'){
                return {nodeName: '#text', value:String(child)}
            }
            return child
        })
    }
    return { nodeName, attributes, children };
}

export function render(vnode) {
    if(!vnode) return;
    if (vnode.nodeName === '#text') {
        let  n =  document.createTextNode(vnode.value);
        vnode.$el = n;
        return n;
    }
    let n = document.createElement(vnode.nodeName);
    vnode.$el = n;

    let a = vnode.attributes || {};
    // Object.keys(a).forEach( k => n.setAttribute(k, a[k]));
    console.log(a)
    // adding an eventlistener "onClick" like React
    Object.keys(a).forEach((k) => {
        if (k.startsWith("on") && typeof a[k] === "function") {
            // It's an event handler like onClick
            const eventName = k.slice(2).toLowerCase();
            n.addEventListener(eventName, a[k]);
            
        }else if(k.startsWith("st") ){
            const style = a[k]
            Object.assign(n.style,style)
        }else {
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
        const removeNode  = oldVNode.$el;
        parent.removeChild(removeNode)
        return null;
    }
   
    if (oldVNode.nodeName !==  newVNode.nodeName || (oldVNode.nodeName === "#text" && newVNode.value !== oldVNode.value)) {

        const $newNode = render(newVNode);
        parent.replaceChild($newNode,oldVNode.$el);
        return $newNode;
    }
    if(oldVNode.nodeName === '#text'){
        newVNode.$el = oldVNode.$el;
        return newVNode.$el
    }
    const el = oldVNode.$el;
    newVNode.$el = el;
    patchChildren(el,oldVNode.children,newVNode.children);
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





export function app(nodeName, attributes, ...args) {
    let node = hs(nodeName, attributes, ...args);  
    console.log(node.attributes)  
    console.log(vdom);
    patch(document.body, oldNode, node);
    oldNode = node;
    vdom.push(node);
}

let vdom = [];
let oldNode = undefined;

