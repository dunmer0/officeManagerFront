import {Beneficiary} from "./beneficiary";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {BeneficiaryService} from "./beneficiary.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, tap} from "rxjs";
import {setAllEntities, setEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";


type BeneficiaryState = {
  // beneficiaries: Beneficiary[];
  beneficiaryId: number,
  loading: boolean;
  filter: string;
}

const initialState: BeneficiaryState = {
  // beneficiaries:[],
  beneficiaryId: 0,
  loading: false,
  filter: ""
}

export const BeneficiariesStore = signalStore(
  {providedIn: 'root'},
  withState<BeneficiaryState>(initialState),
  withEntities<Beneficiary>(),
  withRequestStatus(),
  withMethods(
    (store, beneficiaryService = inject(BeneficiaryService)) => ({
        setFilter(filter: string) {
          patchState(store, {filter});
        },
        addBeneficiary: rxMethod<Beneficiary>(
          pipe(
            tap(() => patchState(store, setPending())),
            exhaustMap((beneficiary) =>
              beneficiaryService.addBeneficiary(beneficiary).pipe(
                tap({
                  next: (newBeneficiary) => {
                    patchState(store, setEntity(newBeneficiary), setFulfilled());
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              )
            )
          )
        ),
        updateBeneficiary: rxMethod<Beneficiary>(
          pipe(
            tap(() => patchState(store, setPending())),
            exhaustMap((beneficiary) =>
              beneficiaryService.updateBeneficiary(beneficiary).pipe(
                tap({
                  next: (newBeneficiary) => {
                    patchState(store, updateEntity({id: newBeneficiary.id, changes: newBeneficiary}), setFulfilled());
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              ))
          )
        ),
        setId(beneficiaryId: number) {
          patchState(store, {beneficiaryId: beneficiaryId});
        },
        loadAllBeneficiaries: rxMethod<void>(
          pipe(
            tap(() => patchState(store, setPending())),
            exhaustMap(() => {
              return beneficiaryService.getBeneficiaries().pipe(
                tap({
                  next: (beneficiaries) => {
                    patchState(store, setAllEntities(beneficiaries), setFulfilled());
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              )
            })
          )
        )
      }
    )),
  withComputed((store) => ({
    beneficiary: computed<Beneficiary>(() =>
      store.entityMap()[store.beneficiaryId()]
    ),
    filteredBeneficiaries: computed<Beneficiary[]>(()=>
    store.entities().filter(beneficiary => beneficiary.name.toLowerCase().includes(store.filter().toLowerCase()))
    )
  })),
  withHooks({
    onInit(store) {
      store.loadAllBeneficiaries();
    }
  })
);
