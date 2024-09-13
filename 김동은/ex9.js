const MENU = {
  짜장: { price: 7000 },
  짬뽕: { price: 9900 },
  탕슉: { price: 25000, taxfree: 1 },
};

// 라벨과 가격 표시 크기
const LABEL_SIZE = 6;
const PRICE_SIZE = 7;

// 테이블 청구서 생성 함수
function bill(tableNo) {
  const ordered = []; // 주문 항목 리스트
  const tot = { price: 0, tax: 0 }; // 총 가격과 세금

  return {
    // 항목 주문 함수
    order(item) {
      ordered.push(item); // 주문 목록에 추가
      const { price, taxfree } = MENU[item]; // 가격 및 세금 여부
      tot.price += price; // 총 가격에 추가
      tot.tax += taxfree ? 0 : calcTax(price); // 면세 항목이 아닌 경우 세금 계산하여 추가
    },

    // 청구서 출력 함수
    printBill() {
      console.log(`\n\nTable. ${tableNo}`); // 테이블 번호 출력
      printLine();
      for (const item of ordered) {
        const { price, taxfree } = MENU[item]; // 메뉴에서 가격 및 세금 여부 가져오기
        console.log("*", item); // 주문 항목 출력
        f`공급가액: ${price}원`;
        f`부가세액: ${taxfree ? 0 : calcTax(price)}원`;
        printLine("-"); // 구분선 출력
      }
      f`주문합계: ${tot.price}원`;
      f`주문합계: ${tot.tax}원`;
      printLine();
    },
  };
}

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

// 형식에 맞게 출력
function f([label, unit], price) {
  console.log(`${label.padEnd(LABEL_SIZE, " ")} ${priceFmt(price)}`); // 라벨과 가격 출력
}

// 가격 포맷팅 함수
function priceFmt(price, unit = "원") {
  return price.toLocaleString().padStart(PRICE_SIZE, " ") + unit; // 가격을 천 단위로 구분
}

// 구분선 출력 함수
function printLine(flag = "=") {
  console.log(flag.repeat(LABEL_SIZE * 2 + PRICE_SIZE + 2)); // 구분선 출력
}

// 세금 계산 함수 (부가세 10%를 세금으로 계산)
function calcTax(price) {
  return Math.round((price / 1.1) * 0.1); // 공급가액에 대한 세금 계산
}
