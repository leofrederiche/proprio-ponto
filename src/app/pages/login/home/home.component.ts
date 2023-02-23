import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from 'moment';

import { EntryInterface, EntrieInterface } from "../../../interfaces/entry"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    constructor(
        private httpClient: HttpClient,
    ){}

    public entry = <EntryInterface>{
        totalBalance: "00:00"
    }

    public form: FormGroup = new FormGroup({
        day: new FormControl(""),
        in1: new FormControl(""),
        out1: new FormControl(""),
        in2: new FormControl(""),
        out2: new FormControl("")
    })

    ngOnInit() {
        this.loadEntries()
    }

    public loadEntries():void {
        const url = "http://lionic.com.br:3000/entry"
        const user_id = "63169a0e1e03fa6c62cf165d"

        console.log("Consultando")
        this.httpClient.post<EntryInterface>(url, { user_id: user_id }).subscribe({
            next: data => {
                this.entry = data
                console.log(this.entry)
            },
            error: error => {
                console.log("App Error -> ", error)
            }
        })
    }

    public saveEntry(): void {
        const url = "http://lionic.com.br:3000/entry/register"
        const user_id = "63169a0e1e03fa6c62cf165d"

        const newEntry = <EntrieInterface>{}
        newEntry.day = moment(this.form.value.day, 'DD/MM/YYYY').toDate()
        newEntry.user = user_id

        newEntry.entries = [this.form.value.in1, this.form.value.out1, this.form.value.in2, this.form.value.out2]

        console.log("Salvando! ", newEntry)
        this.httpClient.post<EntryInterface>(url, newEntry).subscribe({
            next: data => {
                this.loadEntries()
            },
            error: error => {
                console.log("Error -> ", error)
            }
        })
    }

    public changeEntrie(entrie:EntrieInterface): void {
        this.form.value.day = entrie.day
        this.form.value.in1 = entrie.entries[0]
        this.form.value.out1 = entrie.entries[1]
        this.form.value.in2 = entrie.entries[2]
        this.form.value.out2 = entrie.entries[3]
    }
}