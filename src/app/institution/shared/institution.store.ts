import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity, setAllEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {computed, inject} from "@angular/core";
import {InstitutionService} from "./institution.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, startWith, switchMap, tap} from "rxjs";
import {Institution} from "./institution";

type InstitutionState = {
  institutionId: number
  filter: string
}

const initialState: InstitutionState = {
  institutionId: 0,
  filter: ''
}

export const InstitutionStore = signalStore(
  {providedIn: 'root'},
  withState<InstitutionState>(initialState),
  withEntities<Institution>(),
  withRequestStatus(),
  withMethods((store, institutionService = inject(InstitutionService)) => ({
    setInstitutionId(institutionId:number){
      patchState(store, {institutionId});
    },
    loadInstitutions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap(() => institutionService.getInstitutions().pipe(
          tap({
            next: (institutions) => {
              patchState(store, setAllEntities(institutions), setFulfilled());
            },
            error: (error: { message: string }) => {
              patchState(store, setError(error.message))
            }
          })
        ))
      )
    ),
    updateInstitution: rxMethod<Institution>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap((institution) => institutionService.updateInstitution(institution).pipe(
          tap({
            next: institution => patchState(store, updateEntity({id: institution.id, changes: institution}), setFulfilled()),
            error: (error: { message: string }) => patchState(store, setError(error.message))
          })
        ))
      )
    ),
    addInstitution: rxMethod<Institution>(
      pipe(
        tap(()=> patchState(store, setPending())),
        switchMap((institution) => institutionService.addInstitution(institution).pipe(
          tap({
            next: institution => patchState(store, addEntity(institution)),
            error: (error: { message: string }) => patchState(store, setError(error.message))
          })
        ))
      )
    )
  })),
  withComputed((store) => ({
    institution: computed<Institution>(() =>
      store.entityMap()[store.institutionId()]),
  })),
  withHooks({
    onInit(store){
      store.loadInstitutions();
    }
  })
)
