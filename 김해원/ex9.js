const MENU = {
  짜장: { price: 7000 },
  짬뽕: { price: 9900 },
  탕슉: { price: 25000, taxfree: 1 },
};

const LABEL_SIZE = 6;
const PRICE_SIZE = 7;

function bill(tableNo) {
  const ordered = [];
  const total = { price: 0, tax: 0 };

  function updateTotal(item) {
    const { price, taxfree } = MENU[item];
    total.price += price;
    total.tax += taxfree ? 0 : calcTax(price);
  }

  function printItem(item) {
    const { price, taxfree } = MENU[item];
    console.log("*", item);
    f`공급가액: ${price}원`;
    f`부가세액: ${taxfree ? 0 : calcTax(price)}원`;
    printLine("-");
  }

  function printTotal() {
    f`주문합계: ${total.price}원`;
    f`주문합계: ${total.tax}원`;
    printLine();
  }

  return {
    order(item) {
      ordered.push(item);
      updateTotal(item);
    },
    printBill() {
      console.log(`\n\nTable. ${tableNo}`);
      printLine();
      for (const item of ordered) {
        printItem(item);
      }
      printTotal();
    },
  };
}

function f([label, _], price) {
  console.log(`${label.padEnd(LABEL_SIZE, " ")} ${priceFmt(price)}`);
}

function priceFmt(price, unit = "원") {
  return price.toLocaleString().padStart(PRICE_SIZE, " ") + unit;
}

function printLine(flag = "=") {
  console.log(flag.repeat(LABEL_SIZE * 2 + PRICE_SIZE + 2));
}

function calcTax(price) {
  return Math.round((price / 1.1) * 0.1);
}

// 출력
const table1 = bill(1);
table1.order("짜장");
table1.order("짬뽕");
table1.printBill();

const table2 = bill(2);
table2.order("짜장");
table2.printBill();

table1.order("탕슉");
table1.printBill();

table2.order("짬뽕");
table2.printBill();
