import { ChangeDetectorRef, Component, inject, Injector } from "@angular/core";
import { injectForm, TanStackField } from "@tanstack/angular-form";
import { basicFormSchema, type ExpectedBasicForm } from "../../lib/form.schema";
@Component({
  selector: "basic-tform",
  template: `<form
    class="flex flex-col gap-2 w-full"
    (submit)="handleSubmit($event)"
  >
    <h3>Tanstack Form</h3>
    @if (form) {

    <ng-container [tanstackField]="form" name="name" #name="field">
      <label [for]="'angular-tform-' + name.api.name">Name *</label>
      <input
        class="border-2"
        [id]="'angular-tform-' + name.api.name"
        [name]="name.api.name"
        [value]="name.api.state.value"
        (blur)="name.api.handleBlur()"
        (input)="name.api.handleChange($any($event).target.value)"
      />
      @if (name.api.state.meta.isTouched) {
      <div class="text-red-600">
        {{ getErrors(name.api.state.meta.errors) }}
      </div>
      }
    </ng-container>
    <ng-container
      [tanstackField]="form"
      name="description"
      #description="field"
    >
      <label [for]="'angular-tform-' + description.api.name">Description</label>
      <input
        class="border-2"
        [id]="'angular-tform-' + description.api.name"
        [name]="description.api.name"
        [value]="description.api.state.value"
        (blur)="description.api.handleBlur()"
        (input)="description.api.handleChange($any($event).target.value)"
      />
    </ng-container>
    <ng-container [tanstackField]="form" name="bigL" #bigL="field">
      <label class="flex gap-2" [for]="'angular-tform-' + bigL.api.name">
        <input
          class="border-2"
          type="checkbox"
          [id]="'angular-tform-' + bigL.api.name"
          [name]="bigL.api.name"
          [value]="bigL.api.state.value"
          (blur)="bigL.api.handleBlur()"
          (change)="bigL.api.handleChange($any($event).target.checked)"
        />
        Big L?
      </label>
      @if (bigL.api.state.meta.isTouched) {
      <div class="text-red-600">
        {{ getErrors(bigL.api.state.meta.errors) }}
      </div>
      }
    </ng-container>
    <button class="border-2" type="submit">Submit</button>
    }
  </form> `,
  imports: [TanStackField],
  standalone: true,
})
export class BasicTFormComponent {
  injector = inject(Injector);
  cdr = inject(ChangeDetectorRef);
  form = injectForm({
    defaultValues: {
      name: "",
      description: "",
      bigL: false,
    } as ExpectedBasicForm,
    onSubmit({ value }) {
      console.log(value);
    },
    validators: {
      onBlur: basicFormSchema,
    },
  });

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form) {
      // Would like to have all validations run on submit...
      await this.form.handleSubmit();
      this.cdr.detectChanges();
    }
  }

  getErrors(errors: { message?: string }[]) {
    return errors.reduce((acc, curr) => (acc += curr?.message), "");
  }
}
