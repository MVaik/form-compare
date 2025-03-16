import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidationErrors,
} from "@angular/forms";
import {
  type AngularizedBasicForm,
  basicFormSchema,
} from "../../lib/form.schema";
@Component({
  selector: "basic-angular",
  template: `<form
    class="flex flex-col gap-2 w-full"
    [formGroup]="form"
    (submit)="handleSubmit()"
  >
    <div class="flex gap-2 items-center">
      <h3>Angular Reactive Forms</h3>
    </div>
    <label htmlFor="angular-name">Name *</label>
    <input class="border-2" id="angular-name" formControlName="name" />
    @if (form.controls.name.touched && form.errors?.name) {
    <div class="text-red-600">{{ form.errors.name }}</div>
    }

    <label htmlFor="angular-description">Description</label>
    <input
      class="border-2"
      id="angular-description"
      formControlName="description"
    />
    @if (form.controls.description?.touched && form.errors?.description) {
    <div class="text-red-600">{{ form.errors.description }}</div>
    }

    <label class="flex gap-2">
      <input class="border-2" type="checkbox" formControlName="bigL" />
      Big L?
    </label>
    @if (form.controls.bigL?.touched && form.errors?.bigL) {
    <div class="text-red-600">{{ form.errors.bigL }}</div>
    }
    <button class="border-2" type="submit">Submit</button>
  </form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class BasicAngularComponent {
  form = new FormGroup(
    {
      name: new FormControl(""),
      description: new FormControl(""),
      bigL: new FormControl(false),
    } as AngularizedBasicForm,
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
}
