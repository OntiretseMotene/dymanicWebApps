//Exercise 1

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

//Use forEach to log the names in the string to the console
names.forEach(name => {
    console.log(name)

});


//Use forEach to log each name with a matching province
names.forEach((name, index) => {
    console.log(`${name} (${provinces[index]})`)
});

//Loop over province names and turn array strings to all uppercase
const upperCaseProvinces = provinces.map(province => province.toUpperCase());
console.log(upperCaseProvinces);

//Create new array with number of characters in each province name
const nameLengths = names.map(names => names.length);
console.log(nameLengths);

//Use toSorted() to sort all provinces in alphabetic order
const sortInAlphaOrderProvinces = provinces.toSorted();
console.log(sortInAlphaOrderProvinces);

//Use filter to remove provinces with "Cape" from array 
const filterCapeFromProvinces = provinces.filter(provinces => !provinces.includes('Cape'));
console.log(filterCapeFromProvinces.length);

//Use map and some to create boolean array to detertine which province contain an "s" character
const sCharacterInName = names.map(name => name.split('').some(char => char.toLowerCase() === 's'));
console.log(sCharacterInName);

//Use reduce to turn an erray into object that indicates the province of an indivudual
const nameProvinceObject = names.reduce((object, names, index) => {
    object[names] = provinces[index];
    return object;
}, {});
console.log(nameProvinceObject);

//Exercise 2

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: '' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];

//Log each product name to the console

products.forEach(products => console.log(products.product))


//Filter out products that have names that are more than 5 characters long
console.log(
    products.filter(products => products.product.length >= 5)
);

//convert all prices that are strings to numbers, remove all non-priced products from array and calculate combined price of ramining products

// Filter out products that don't have a price. assign those to a variable called products with prices.
const productsWithPrices = products.filter(products => products.price !=='');

//Go through product with prices variable, check product price, if NaN convert to a number
const productWithConvertedPrices = productsWithPrices.map(products => ({
    ...products, price: isNaN(Number(products.price)) ? 0 : Number(products.price)
}));

//Add the prices together
const totalCombinedPrice = productWithConvertedPrices.reduce((sum, products) => sum + products.price, 0);

//Currency
const currencySymbol = 'R';
console.log(productWithConvertedPrices);
console.log("Total Price", currencySymbol + totalCombinedPrice);

// const validProducts = products.filter(item => item.price !== '' && !isNaN(item.price));
// const totalCombinedPrice = validProducts.map(item => parseFloat(item.price)).reduce((acc, curr) => acc + curr, 0);
// console.log(totalCombinedPrice);

//Use reduce to concatenate all products names

const concatenatedNames = products.reduce((acc, curr, index, array) => {
    if (index === array.length - 1) {
      return acc + "and " + curr.product;
    }
    return acc + curr.product + ", ";
}, "");

console.log(concatenatedNames);

//Calculate highest and lowest priced items

const priceInfo = products.reduce((acc, curr) => {
  const currPrice = parseFloat(curr.price);
    if (isNaN(currPrice)) {
        return acc;
    }
    if (currPrice > acc.highest.price) {
        acc.highest = { name: curr.product, price: currPrice };
    }
    if (currPrice < acc.lowest.price) {
        acc.lowest = { name: curr.product, price: currPrice };
 }
  return acc;
}, 

{ highest: { price: -Infinity }, lowest: { price: Infinity } });
console.log(`Highest: ${priceInfo.highest.name}. Lowest: ${priceInfo.lowest.name}.`);


// Use Object.entries and reduce to modify object keys

const updatedProducts = products.map(products => {
    const updatedProducts = {};
    Object.entries(products).forEach(([key, value]) => {
        if (key === 'product') {
            updatedProducts.name = name;
        } else if (key === 'price') {
            updatedProducts.cost = isNaN(Number(value)) ? 0 : Number(value);
        } else {
            updatedProducts[key] = cost;
        }
    });
    return updatedProducts;
});

console.log(updatedProducts);