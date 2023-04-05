import { Component, Inject } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from "@angular/forms";


@Component({
    selector: "dialog-entrie-form",
    templateUrl: "./dialog-entrie-form.component.html",
    styleUrls: ["./dialog-entrie-form.component.css"]
})

export class DialogEntrieForm {
    constructor(
        public dialogRef: MatDialogRef<DialogEntrieForm>
    ) { }

    public form: FormGroup = new FormGroup({
        _id: new FormControl(""),
        day: new FormControl(""),
        in1: new FormControl(""),
        out1: new FormControl(""),
        in2: new FormControl(""),
        out2: new FormControl("")
    })

    public onCancel(): void {
        this.dialogRef.close()
    }
}   