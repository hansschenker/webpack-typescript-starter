import {
  EMPTY,
  from,
  of,
  Subject,
  throwError,
  merge,
  BehaviorSubject,
} from "rxjs";
import {
  map,
  tap,
  take,
  catchError,
  reduce,
  filter,
  mapTo,
} from "rxjs/operators";

console.clear();
///////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ObservableStore } from "./store";

interface GeneratorState {
  length: number;
  withNumbers: boolean;
  withLetters: boolean;
  withSymbols: boolean;
}

const generatorState: GeneratorState = {
  length: 15,
  withNumbers: true,
  withLetters: false,
  withSymbols: false,
};

const store = new ObservableStore<GeneratorState>(generatorState);

/*
 * Select a slice of state from store.
 */
store.selectState("length").subscribe(console.log);
store.selectState("withNumbers").subscribe(console.log);
store.selectState("withLetters").subscribe(console.log);
store.selectState("withSymbols").subscribe(console.log);

/*
 * Update a property with new value.)
 */

store.updateState({
  ...store.getState(),
  length: 25,
});

store.updateState({
  ...store.getState(),
  withLetters: false,
});

store.updateState({
  ...store.getState(),
  withNumbers: false,
});
store.updateState({
  ...store.getState(),
  withNumbers: true,
});
store.updateState({
  ...store.getState(),
  withSymbols: false,
});

store.stateChanges().subscribe(console.log);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// length input - default to 10
// const lengthInput = document.getElementById("length-input") as HTMLInputElement;
// lengthInput.value = "10";
// const lengthInputState$ = new BehaviorSubject<Partial<GeneratorState>>(
//   generatorState
// );
// lengthInput.addEventListener("input", () => {
//   lengthInputState$.next({
//     ...generatorState,
//     length: parseInt(lengthInput.value),
//   });
// });
// const lengthInputChange = lengthInputState$
//   .asObservable()
//   .subscribe((state) => console.log("state-length:", state.length));
// //
// // numbers input
// const numbersInput = document.getElementById(
//   "numbers-input"
// ) as HTMLInputElement;
// numbersInput.checked = true;
// const numbersInputState$ = new BehaviorSubject<Partial<GeneratorState>>(
//   generatorState
// );
// numbersInput.addEventListener("input", () => {
//   numbersInputState$.next({
//     ...generatorState,
//     withNumbers: !!numbersInput.checked,
//   });
// });
// const numbersInputChange = numbersInputState$
//   .asObservable()
//   .subscribe((state) => console.log("with-numbers:", state.withNumbers));
// //
// // letters input - default to true
// const lettersInput = document.getElementById(
//   "letters-input"
// ) as HTMLInputElement;
// const lettersInputState$ = new BehaviorSubject<Partial<GeneratorState>>(
//   generatorState
// );
// lettersInput.addEventListener("input", () => {
//   console.log(lettersInput.checked);
//   lettersInputState$.next({
//     ...generatorState,
//     withLetters: !!lettersInput.checked,
//   });
// });
// const lettersInputChange = lettersInputState$
//   .asObservable()
//   .subscribe((state) => console.log("with-letters:", state.withLetters));
// //
// // symbols input
// const symbolsInput = document.getElementById(
//   "symbols-input"
// ) as HTMLInputElement;
// const symbolsInputState$ = new BehaviorSubject<Partial<GeneratorState>>(
//   generatorState
// );
// symbolsInput.addEventListener("input", () => {
//   console.log(symbolsInput.checked);
//   symbolsInputState$.next({
//     ...generatorState,
//     withSymbols: !!symbolsInput.checked,
//   });
// });
// const symbolsInputChange = symbolsInputState$
//   .asObservable()
//   .subscribe((state) => console.log("with-symbols:", state.withSymbols));
// //
// // password input
// const passwordInput = document.getElementById(
//   "password-input"
// ) as HTMLInputElement;
