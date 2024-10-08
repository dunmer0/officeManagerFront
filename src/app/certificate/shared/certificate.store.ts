import {computed, inject} from "@angular/core";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {removeEntity, setAllEntities, setEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, switchMap, tap} from "rxjs";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {Certificate} from "./certificate";
import {CertificateService} from "./certificate.service";
import {Comment} from "../../comment/shared/comment";
import {ProjectStore} from "../../project/shared/project.store";

type CertificateState = {
  certificateId: number;

}

const initialState: CertificateState = {
  certificateId: 0
}

export const CertificateStore = signalStore(
    {providedIn: 'root'},
    withState<CertificateState>(initialState),
    withEntities<Certificate>(),
    withRequestStatus(),
    withMethods(
      (store,
       certificateService = inject(CertificateService)) => ({
        addCertificate: rxMethod<Certificate>(
          pipe(
            tap(() => patchState(store, setPending())),
            switchMap((certificate) =>
              certificateService.addCertificate(certificate).pipe(
                tap({
                  next: (newCertificate) => {
                    patchState(store, setEntity(newCertificate), setFulfilled());
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              ))
          )
        ),
        updateCertificate: rxMethod<Certificate>(
          pipe(
            tap(() => patchState(store, setPending())),
            switchMap((certificate) =>
              certificateService.updateCertificate(certificate).pipe(
                tap({
                  next: (updatedCertificate) => {
                    patchState(store,
                      updateEntity({
                        id: updatedCertificate.id, changes: updatedCertificate
                      }),
                      setFulfilled());
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              )
            )
          ),
        ),
        removeCertificate: rxMethod<number>(
          pipe(
            tap(() => patchState(store, setPending())),
            switchMap((certificateId) =>
              certificateService.deleteCertificate(certificateId).pipe(
                tap({
                  next: () => {
                    patchState(store, removeEntity(certificateId), setFulfilled())
                  },
                  error: (error: { message: string }) => {
                    patchState(store, setError(error.message));
                  }
                })
              )
            )
          )
        ),
        loadAllCertificates: rxMethod<void>(
          pipe(
            tap(() => patchState(store, setPending())),
            switchMap(() => {
                return certificateService.getAllCertificates().pipe(
                  tap({
                    next: (certificates) => {
                      patchState(store, setAllEntities(certificates), setFulfilled());
                    },
                    error: (error: { message: string }) => {
                      patchState(store, setError(error.message));
                    }
                  })
                )
              }
            )
          )
        ),
        setId(certificateId:number) {
          patchState(store, {certificateId})
        },
        getCertificateNumber(certificateId:number):string{
          return store.entityMap()[certificateId].number;
        },
        addComment: rxMethod<Comment>(
          pipe(
            tap(()=> patchState(store, setPending())),
            exhaustMap(comment => certificateService.addComment(comment).pipe(
              tap({
                next: ()=> patchState(store, updateEntity({
                  id: comment.certificateId,
                  // changes: {comments: [...comments, comment]}
                  changes: (certificate) => ({comments: [...certificate.comments ,comment]})
                })),
                error: (error: { message: string }) => {
                  patchState(store, setError(error.message));
                }
              })
            ))
          )
        )
      })),
    withComputed((store, beneficiaryStore = inject(BeneficiariesStore), projectStore = inject(ProjectStore)) => ({
      certificate: computed<Certificate>(() =>
        store.entityMap()[store.certificateId()]
      ),

      certificatesByBeneficiary: computed<Certificate[]>(() =>
        store.entities().filter((certificate) => certificate.beneficiaryId === beneficiaryStore.beneficiaryId())
      )
    })),
    withHooks({
      onInit(store) {
        store.loadAllCertificates();
      }
    })
  )
;
