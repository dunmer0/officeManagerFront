import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {removeEntity, setAllEntities, setEntity, updateEntity, withEntities} from "@ngrx/signals/entities";
import {Project} from "./project";
import {setError, setFulfilled, setPending, withRequestStatus} from "../../state/request-status.feature";
import {computed, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, switchMap, tap} from "rxjs";
import {ProjectService} from "./project.service";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";

type ProjectState = {
  projectId: number;
  filter: string;
}

const initialState: ProjectState = {
  projectId: 0,
  filter: '',
}

export const ProjectStore = signalStore(
  {providedIn: 'root'},
  withState<ProjectState>(initialState),
  withEntities<Project>(),
  withRequestStatus(),
  withMethods(
    (
      store,
      projectService = inject(ProjectService)
    ) => ({
      setProjectId(projectId: number) {
        patchState(store, {projectId})
      },
      loadProjects: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() => projectService.getProjects().pipe(
            tap({
              next: (certificates) => patchState(store, setAllEntities(certificates)),
              error: (error: { message: string }) => patchState(store, setError(error.message)),
            })
          ))
        )
      ),
      addProject: rxMethod<Project>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((project) => projectService.addProject(project).pipe(
            tap({
              next: project => patchState(store, setEntity(project), setFulfilled()),
              error: (error: { message: string }) => patchState(store, setError(error.message)),
            })
          ))
        )
      ),
      deleteProject: rxMethod<number>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((projectId) => projectService.deleteProject(projectId).pipe(
            tap({
              next: () => patchState(store, removeEntity(projectId), setFulfilled()),
              error: error => patchState(store, setError(error.message))
            })
          ))
        )
      ),
      updateProject: rxMethod<Project>(
        pipe(
          tap(()=> patchState(store, setPending())),
          exhaustMap(project => projectService.updateProject(project).pipe(
            tap({
              next: project => patchState(store, updateEntity({id: project.id, changes:project})),
              error: error => patchState(store, setError(error.message))
            })
          ))
        )
      ),
    })
  ),
  withComputed((store, beneficiaryStore = inject(BeneficiariesStore)) => ({
    project: computed<Project>(() =>
      store.entityMap()[store.projectId()]),
    projects: computed<Project[]>(()=>
    store.entities().filter(project => project.beneficiaryId === beneficiaryStore.beneficiaryId()))
  })),
  withHooks({
    onInit(store){
      store.loadProjects()
    }
  })
)
