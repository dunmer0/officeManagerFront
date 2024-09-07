import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity, removeEntity, setAllEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {Permit} from "./permit";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {PermitService} from "./permit.service";
import {computed, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, tap} from "rxjs";

type PermitState = {
  permitId: number;
  filter: string;
}

const initialState: PermitState = {
  permitId: 0,
  filter: '',
}

export const PermitStore = signalStore(
  {providedIn: 'root'},
  withState<PermitState>(initialState),
  withEntities<Permit>(),
  withRequestStatus(),
  withMethods(
    (store, permitService = inject(PermitService)) => ({
      addPermit: rxMethod<Permit>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap(permit => permitService.add(permit).pipe(
            tap({
              next: permit => patchState(store, addEntity(permit)),
              error: error => patchState(store, setError(error.message)),
            })
          ))
        )
      ),
      updatePermit: rxMethod<Permit>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap(permit => permitService.update(permit).pipe(
            tap({
              next: permit => patchState(store, updateEntity({id: permit.id, changes: permit}), setFulfilled()),
              error: error => patchState(store, error.message),
            })
          ))
        )
      ),
      deletePermit: rxMethod<number>(
        pipe(
          tap(()=>patchState(store, setPending())),
          exhaustMap(permitId => permitService.delete(permitId).pipe(
            tap({
              next: ()=> patchState(store, removeEntity(permitId), setFulfilled()),
              error: error => patchState(store, setError(error.message()))
            })
          ))
        )
      ),
      loadAll: rxMethod<void>(
        pipe(
          tap(()=> patchState(store, setPending())),
          exhaustMap(()=> permitService.getAll().pipe(
            tap({
              next: permits => patchState(store, setAllEntities(permits), setFulfilled),
              error: error => patchState(store, setError(error.message()))
            })
          ))
        )
      ),
      setPermitId(permitId: number) {
        patchState(store, {permitId});
      }
    })
  ),
  withComputed((store)=>({
    permit: computed<Permit>(() => store.entityMap()[store.permitId()]),
  })),
  withHooks({
    onInit(store){
      store.loadAll()
    }
  })
)
