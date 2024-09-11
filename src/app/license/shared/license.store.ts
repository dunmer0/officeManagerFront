import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity, removeEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {License} from "./license";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {computed, inject} from "@angular/core";
import {LicenseService} from "./license.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, tap} from "rxjs";

type LicenseState = {
  licenseId: number;
  filter: string;
}

const initialState: LicenseState = {
  licenseId: 0,
  filter: '',
}

export const LicenseStore = signalStore(
  {providedIn: 'root'},
  withState<LicenseState>(initialState),
  withEntities<License>(),
  withRequestStatus(),
  withMethods((
    store, licenseService = inject(LicenseService)
  ) => ({
    addLicense: rxMethod<License>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(license => licenseService.add(license).pipe(
          tap({
            next: license => patchState(store, addEntity(license), setFulfilled()),
            error: error => patchState(store, setError(error.message))
          })
        ))
      )
    ),
    updateLicense: rxMethod<License>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(license => licenseService.update(license).pipe(
          tap({
            next: license => patchState(store, updateEntity({id: license.id, changes: license}), setFulfilled()),
            error: error => patchState(store, setError(error.message))
          })
        ))
      )
    ),
    deleteLicense: rxMethod<number>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap(licenseId => licenseService.delete(licenseId).pipe(
          tap({
            next: ()=> patchState(store, removeEntity(licenseId), setFulfilled()),
            error: error => patchState(store, setError(error.message))
          })
        ))
      )
    ),
    setLicenseId(licenseId:number){
      patchState(store, {licenseId});
    }
  })),
  withComputed((store) => ({
    license: computed<License>(()=>
    store.entityMap()[store.licenseId()]),
    licensesByBeneficiary: computed<License[]>(()=>
    store.entities().filter(license => license.id === store.licenseId()))
  })),
  withHooks({
    onInit(store) {

    }
  })
)
