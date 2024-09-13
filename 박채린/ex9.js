const MENU = {
  짜장: { price: 7000 },
  짬뽕: { price: 9900 },
  탕슉: { price: 25000, taxfree: 1 },
};

const LABEL_SIZE = 6;
const PRICE_SIZE = 7;

function bill(tableNo) { 
  const ordered = [];
  const tot = { price: 0, tax: 0 };

  function calcTax(price) { // 부가세 
    return Math.round(price / 11);
  }

  function priceFmt(price, unit = '원') {
    return price.toLocaleString().padStart(PRICE_SIZE, ' ') + unit;
  }

  function printLine(flag = '=') {
    console.log(flag.repeat(LABEL_SIZE * 2 + PRICE_SIZE + 2));
  }

  function f(label, price) {
    console.log(`${label.padEnd(LABEL_SIZE, ' ')} ${priceFmt(price)}`);
  }

  return {
    order(item) {
      if (MENU[item]) {
        ordered.push(item);
        const { price, taxfree } = MENU[item];
        tot.price += price;
        tot.tax += taxfree ? 0 : calcTax(price);
      } else {
        console.log(`Item '${item}' is not on the menu.`);
      }
    },

    printBill() {
      console.log(`\n\nTable. ${tableNo}`);
      printLine();
      for (const item of ordered) {
        const { price, taxfree } = MENU[item];
        console.log('*', item);
        f('공급가액:', price);
        f('부가세액:', taxfree ? 0 : calcTax(price));
        printLine('-');
      }
      f('주문합계:', tot.price);
      f('부가세합계:', tot.tax);
      printLine();
    },
  };
}

// 테스트 코드
const table1 = bill(1); 
table1.order('짜장');
table1.order('짬뽕');
table1.printBill();

const table2 = bill(2); 
table2.order('짜장');
table2.printBill();

table1.order('탕슉');
table1.printBill();

table2.order('짬뽕');
table2.printBill();
