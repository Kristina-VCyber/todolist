import {ActionType, div, mult, salaryReducer, StateType, sub, sum} from "./tasks";

// test("sum", () => {
// // 1. Тестовые данные :
//     const salary: number = 2000
//     const n: number = 200
//     // 2. Выполнение тестируемого кода :
//     const result = sum(salary, n)
//     // 3. Проверка результата :
//
//
//     expect(result).toBe(2200)
//
// })
//
// test("sub", () => {
//
//     expect(sub(1200, 200)).toBe(1000)
//
// })
//
//
//
// test("div", () => {
//     const salary: number = 2500
//     const n: number = 80
//     const result = div(salary, n)
//     expect(result).toBe(31.25)
// })
//
//
// test("mult", () => {
//
//     expect(mult(2000, 85)).toBe(170000)
//
// })


test("case SUM of salaryReducer", () => {
     const salary: StateType = 2500
     const action: ActionType = {
         type: "SUM",
         n: 200
     }

         const testAction:ActionType = {
         type: "TEST",
         n: 200

     }

     const result = salaryReducer(salary,action)
     expect(result).toBe(2700)
     expect(salaryReducer(salary, testAction)).toBe(salary)
 })