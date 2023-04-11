import { Component, Inject } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { Api } from "src/app/services/api_config";
import { EntrieInterface } from "../interfaces/entry";

@Component({
    selector: "dialog-entrie-form",
    templateUrl: "./dialog-entrie-form.component.html",
    styleUrls: ["./dialog-entrie-form.component.css"]
})

export class DialogEntrieForm {
    constructor(
        public dialogRef: MatDialogRef<DialogEntrieForm>,
        public httpClient: HttpClient
    ) { }

    public formatTime(target: any) {
        if (target.value.length == 2) {
            target.value += ':'
        }
    }

    public entryForm: FormGroup = new FormGroup({
        _id: new FormControl(""),
        day: new FormControl(""),
        description: new FormControl(""),
        in1: new FormControl(""),
        out1: new FormControl(""),
        in2: new FormControl(""),
        out2: new FormControl("")
    })

    public onCancel(): void {
        this.dialogRef.close({ status: "canceled" })
    }

    public onConfirm(): void {
        console.log(this.entryForm.value)

        if (this.entryForm.value._id) {
            // updateEntry
        } else {
            this.insertEntry()
        }
    }

    private insertEntry(): void {
        let url = `${Api.baseUrl}/register`;

        const newEntry = <EntrieInterface>{
            day: this.entryForm.value.day.toDate(),
            user: Api.userId,
            description: this.entryForm.value.description,
            entries: [this.entryForm.value.in1, this.entryForm.value.out1, this.entryForm.value.in2, this.entryForm.value.out2]
        }

        this.httpClient.post(url, newEntry).subscribe({
            next: data => {
                this.dialogRef.close({ status: "confirm" })
            },
            error: error => {
                console.log("Erro ao salvar")
                console.log(error)
            }
        })
    }
}   