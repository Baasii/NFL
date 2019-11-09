function Order(number, ordered, shipped, status, total, lineItems){
    this.number = number,
    this.ordered = ordered,
    this.shipped = shipped;
    this.status = status;
    this.total = total;
    this.lineItems = lineItems;
}

Order.prototype.ChangeShipped = function(){
    let today = new Date()
    let dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getUTCFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    this.shipped = dd + '/' + mm + '/' + yyyy;
    this.status = 'Shipped';
    return 'Order nr. ' + this.number + ' Has been shipped';
}

function LineItem(quantity, price, product, ){
    this.quantity = quantity,
    this.price = price,
    this.product = product;
}
LineItem.prototype.CountTheValue = function(){
    let quantity = this.quantity;
    let price = this.price;
    let value = quantity * price;
    return value;
}

function Product(id, name, supplierName){
    this.id = id,
    this.name = name,
    this.supplierName = supplierName;
}

const Product1 = new Product('pr1', 'Televisio', 'Panasonic')
const Product2 = new Product('pr2', 'Radio', 'Sony')
const Product3 = new Product('pr3', 'Kahvinkeitin', 'Moccamaster')
const Product4 = new Product('pr4', 'Tietokone', 'HP')

const LineItem1 = new LineItem(5, 250, Product1)
const LineItem2 = new LineItem(20, 25, Product2)
const LineItem3 = new LineItem(10, 100, Product3)
const LineItem4 = new LineItem(3, 500, Product4)

lineItems1 = [];
lineItems1.push(LineItem1);
lineItems1.push(LineItem2);

const Order1 = new Order('1', '01/10/2019', '02/10/2019', 'Shipped', lineItems1 );

lineItems2 = [];
lineItems2.push(LineItem3);
lineItems2.push(LineItem4);

const Order2 = new Order('2', '04/10/2019', null, 'New', lineItems2 );

console.log(Order1)
console.log(Order2)

console.log(Order1.ChangeShipped())
console.log(Order2.ChangeShipped())

console.log(Order1)
console.log(Order2)

console.log(LineItem1.CountTheValue())