import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {Contact, ContactType} from "./contact";
import {removeEntity, setAllEntities, setEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {computed, inject} from "@angular/core";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, switchMap, tap} from "rxjs";
import {ContactService} from "./contact.service";


type ContactState = {
  contactId: number
  filter: string
}

const initialState: ContactState = {
  contactId: 0,
  filter: ''
}

export const ContactStore = signalStore(
  {providedIn: 'root'},
  withState<ContactState>(initialState),
  withEntities<Contact>(),
  withRequestStatus(),
  withMethods((store, beneficiaryStore = inject(BeneficiariesStore), contactService = inject(ContactService)) => ({
    setContactId(contactId:number){
      patchState(store, {contactId});
    },
    addContact: rxMethod<Contact>(
      pipe(
        tap(() => patchState(store, setPending())),
        exhaustMap((contact) => contactService.addContact(contact).pipe(
          tap({
            next: (newContact) => {
              patchState(store, setEntity(newContact), setFulfilled());
            },
            error: (error: { message: string }) => {
              patchState(store, setError(error.message));
            }
          })
        ))
      )
    ),
    updateContact: rxMethod<Contact>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap((contact) => contactService.updateContact(contact).pipe(
          tap({
            next: (newContact) => {
              patchState(store, updateEntity({id: newContact.id, changes: newContact}), setFulfilled());
            },
            error: (error: { message: string }) => {
              patchState(store, setError(error.message));
            }
          })
        ))
      )
    ),
    removeContact: rxMethod<Contact>(
      pipe(
        tap(()=> patchState(store, setPending())),
        switchMap((contact) => contactService.deleteContact(contact).pipe(
          tap({
            next: () => {
              patchState(store, removeEntity(contact.id), setFulfilled());
            },
            error : (error:{message:string}) =>{
              patchState(store, setError(error.message))
            }
          })
        ))
      )
    ),
    loadContacts: rxMethod<ContactType>(
      pipe(
        tap(()=> patchState(store, setPending())),
        switchMap((contactType)=> contactService.getContacts(contactType).pipe(
          tap({
            next: (contacts) => {
              patchState(store, setAllEntities(contacts), setFulfilled());
            },
            error: (error :{ message:string})=> {
              patchState(store, setError(error.message))
            }
          })
        ))
      )
    )
  })),
  withComputed((store, beneficiaryStore = inject(BeneficiariesStore))=>({
    beneficiaryContacts: computed<Contact[]>(()=>
    store.entities().filter((contact) => contact.beneficiaryId === beneficiaryStore.beneficiaryId())
    ),
    contact: computed<Contact>(()=>
    store.entityMap()[store.contactId()]
    )
  }))
)


