import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidationErrors,
} from "@angular/forms";
import {
  type AngularizedBasicForm,
  basicFormSchema,
  type ExpectedBasicForm,
} from "../../lib/form.schema";
@Component({
  selector: "basic-angular",
  template: `<form
    class="flex flex-col gap-2 w-full"
    [formGroup]="form"
    (submit)="handleSubmit()"
  >
    <h3>Angular Reactive Forms</h3>
    <div>
      <label class="block" htmlFor="angular-name">Name *</label>
      <input class="border-2 w-full" id="angular-name" formControlName="name" />
      @if (form.controls.name.touched && form.errors?.name) {
      <div class="text-red-600">{{ form.errors.name }}</div>
      }
    </div>

    <div>
      <label class="block" htmlFor="angular-description">Description</label>
      <input
        class="border-2 w-full"
        id="angular-description"
        formControlName="description"
      />
      @if (form.controls.description?.touched && form.errors?.description) {
      <div class="text-red-600">{{ form.errors.description }}</div>
      }
    </div>

    <div>
      <label class="flex gap-2">
        <input class="border-2" type="checkbox" formControlName="bigL" />
        Big L?
      </label>
      @if (form.controls.bigL?.touched && form.errors?.bigL) {
      <div class="text-red-600">{{ form.errors.bigL }}</div>
      }
    </div>
    <ng-container formArrayName="losers">
      @for (loser of form.controls.losers.controls; track index; let index =
      $index) {
      <div class="flex gap-2" [formGroupName]="index">
        <div>
          <label class="block" [attr.htmlFor]="'angular-loser-' + index"
            >Loser {{ index + 1 }}</label
          >
          <input
            formControlName="name"
            class="border-2"
            [id]="'angular-loser-' + index"
          />
        </div>
        <button
          class="ms-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-3 px-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:bg-white before:opacity-10 before:blur-lg"
          type="button"
          (click)="removeLoser(index)"
        >
          Delete
        </button>
      </div>
      }
    </ng-container>
    <button class="border-2" type="button" (click)="addLoser()">
      Add loser
    </button>

    @if (form.value.bigL) {
    <p
      class="text-2xl font-bold text-transparent bg-clip-text animate-gradient bg-linear-to-br from-purple-600 via-cyan-300 to-lime-400 bg-size-[50%_100%]"
    >
      Amazin conditional render
    </p>
    }
    <button
      class="border-2 disabled:bg-gradient-to-br"
      type="submit"
      [disabled]="form.touched && !form.valid"
    >
      Submit
    </button>
  </form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class BasicAngularComponent {
  form = new FormGroup<AngularizedBasicForm>(
    {
      name: new FormControl("", { nonNullable: true }),
      description: new FormControl("", { nonNullable: true }),
      bigL: new FormControl(false, { nonNullable: true }),
      losers: new FormArray<
        AbstractControl<ExpectedBasicForm["losers"][number]>
      >([]),
    },
    { validators: this.schemaValidator.bind(this) }
  );

  schemaValidator(control: AbstractControl): ValidationErrors | null {
    const state = basicFormSchema.safeParse(control.value);
    if (!state.error) {
      return null;
    }
    return state.error.issues.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.path.join(".")] = curr.message;
      return acc;
    }, {});
  }

  handleSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

  addLoser() {
    this.form.controls.losers.push(
      new FormGroup({
        name: new FormControl("", { nonNullable: true }),
      })
    );
  }

  removeLoser(index: number) {
    this.form.controls.losers.removeAt(index);
  }
}
