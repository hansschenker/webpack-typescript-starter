import { BehaviorSubject, Subject } from "rxjs";
import { map, distinctUntilKeyChanged, scan } from "rxjs/operators";

export class ObservableStore<T> {
  private _store: BehaviorSubject<T>;
  private _stateChange = new Subject<T>();

  constructor(initialState: T) {
    this._store = new BehaviorSubject(initialState);
    this._stateChange
      .pipe(
        /*
         * Accumulate state over time using scan.
         * For this example we will just merge our current state
         * with updated state and emit the result, however
         * this could be any reducer / pattern you wish to follow.
         */
        scan((current: T, updated: T) => {
          return { ...current, ...updated };
        }, initialState)
      )
      .subscribe(this._store);
  }

  getState() {
    return this._store.getValue();
  }
  /*
   * Select a slice of state based on key.
   */
  selectState(key: keyof T) {
    return this._store.pipe(
      distinctUntilKeyChanged(key),
      map((state) => state[key])
    );
  }

  /*
   * Update state with new object to merge.
   */
  updateState(newState: T) {
    this._stateChange.next(newState);
  }

  /*
   * Subscribe to any store state changes.
   */
  stateChanges() {
    return this._store.asObservable();
  }
}
