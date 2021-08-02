class Product {
    price;
    cal;
    constructor(price, cal) {
        this.price = price;
        this.cal = cal;
    }
}

class Stuff extends Product {
    constructor(stuffPrice, stuffCal, stuffType) {
        super(stuffPrice, stuffCal);
        this.stuffType = stuffType;
    }
}

class Topping extends Stuff {
    constructor(toppingPrice, toppingCal, toppingType) {
        super(toppingPrice, toppingCal, toppingType);
    }
}

class Hamburger extends Product {
    constructor(hamPrice, hamCal, hamSize) {
        super(hamPrice, hamCal);
        this.hamsize = hamSize;
        this.toppings = [];
    }
    addTopping(topping) {
        this.price += topping.price;
        this.cal += topping.cal;
        this.toppings.push(topping.stuffType);
    };
    removeTopping(topping) {
        this.price -= topping.price;
        this.cal -= topping.cal;
    }
    getSize() {
        return console.log(this.hamsize);
    }
    showPrice() {
        console.log(this.price);
    }
    showCalories() {
        console.log(this.cal);
    }
    getToppings() {
        return console.log(this.toppings);
    }

}

let bigHam = new Hamburger(100, 40, 'big');
let smallHam = new Hamburger(50, 20, 'small');
let cheeseTop = new Stuff(10, 20, 'cheese');
let saladTop = new Stuff(20, 5, 'salad');
let potTop = new Stuff(15, 10, 'potatoes');
let herbsTop = new Topping(15, 0, 'herbs');
let mayonTop = new Topping(20, 5, 'mayons');

bigHam.addTopping(cheeseTop);
bigHam.showCalories();
bigHam.showPrice();
bigHam.removeTopping(cheeseTop);
bigHam.addTopping(cheeseTop);
bigHam.addTopping(saladTop);
bigHam.addTopping(herbsTop);
bigHam.getToppings();
bigHam.showCalories();
bigHam.showPrice();
bigHam.removeTopping(cheeseTop);
bigHam.showCalories();
bigHam.showPrice();
bigHam.getSize();




