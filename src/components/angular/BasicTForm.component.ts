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

    <div [tanstackField]="form" name="name" #name="field">
      <label class="block" [for]="'angular-tform-' + name.api.name"
        >Name *</label
      >
      <input
        class="border-2 w-full"
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
    </div>
    <div [tanstackField]="form" name="description" #description="field">
      <label class="block" [for]="'angular-tform-' + description.api.name"
        >Description</label
      >
      <input
        class="border-2 w-full"
        [id]="'angular-tform-' + description.api.name"
        [name]="description.api.name"
        [value]="description.api.state.value"
        (blur)="description.api.handleBlur()"
        (input)="description.api.handleChange($any($event).target.value)"
      />
    </div>
    <div [tanstackField]="form" name="bigL" #bigL="field">
      <label
        class="block"
        class="flex gap-2"
        [for]="'angular-tform-' + bigL.api.name"
      >
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
    </div>

    <ng-container [tanstackField]="form" name="losers" #losers="field">
      @for (_ of losers.api.state.value; track index; let index = $index) {
      <ng-container
        [tanstackField]="form"
        [name]="getLoserName(index)"
        #loser="field"
      >
        <div class="flex gap-2">
          <div>
            <label class="block" [attr.htmlFor]="'angular-tform-loser-' + index"
              >Loser {{ index + 1 }}</label
            >
            <input
              [value]="loser.api.state.value"
              (blur)="loser.api.handleBlur()"
              (change)="loser.api.handleChange($any($event).target.value)"
              class="border-2"
              [id]="'angular-tform-loser-' + index"
            />
          </div>
          <button
            class="ms-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-3 px-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:bg-white before:opacity-10 before:blur-lg"
            type="button"
            (click)="losers.api.removeValue(index)"
          >
            Delete
          </button>
        </div>
      </ng-container>
      }
      <button
        class="border-2"
        type="button"
        (click)="losers.api.pushValue(defaultLoser)"
      >
        Add loser
      </button>
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
      losers: [],
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

  defaultLoser = {
    name: "",
    id: 0,
  };
  getLoserName = (index: number) => `losers[${index}].name` as const;

  getErrors(errors: { message?: string }[]) {
    return errors.reduce((acc, curr) => (acc += curr?.message), "");
  }
}
