function List (){
        this.listID = makeid()
        this.items = []
}
var list = {
    'listID': Math.random()*100,
    'items': []
}

function Item (no,name,auth){
    this.itemNo = no
    this.itemName = name
    this.author = auth
}

var champu = new Item(1, 'Shampoo', 'Arturo')
var cereal = new Item(2, 'Cereal', 'Arturo')
console.log(list)
console.log(champu)
list.items.push(champu)
console.log('Pushed new item:'+ JSON.stringify(list))
list.items.push(cereal)
console.log('Pushed new item:'+ JSON.stringify(list))
