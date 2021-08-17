const add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 1);
}

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 1);
}
const del = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return JSON.stringify(cart, null, 1);
};

module.exports = {
    add,
    change,
    del,
};