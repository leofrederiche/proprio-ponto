import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from 'moment';

import { TotalEntrieInterface, EntrieInterface } from "../../../interfaces/entry"
import { Api } from "src/app/services/api_config";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})

export class HomeComponent {
    constructor(
        private httpClient: HttpClient,
    ) { }

    public entry = <TotalEntrieInterface>{
        totalBalance: "00:00",
        entries: []
    }

    public form: FormGroup = new FormGroup({
        _id: new FormControl(""),
        day: new FormControl(""),
        in1: new FormControl(""),
        out1: new FormControl(""),
        in2: new FormControl(""),
        out2: new FormControl("")
    })

    ngOnInit() {
        this.loadEntries()
    }

    public loadEntries(): void {
        this.httpClient.post<TotalEntrieInterface>(Api.baseUrl, { user_id: Api.userId }).subscribe({
            next: data => {
                this.entry = data
            },
            error: error => {
                console.log("App Error -> ", error)
            }
        })
    }

    public saveEntrie(): void {
        const url = `${Api.baseUrl}/register`

        if (this.form.value._id) {
            this.updateEntrie()
            return
        }

        const newEntry = <EntrieInterface>{}
        newEntry.day = moment(this.form.value.day, 'DD/MM/YYYY').toDate()
        newEntry.user = Api.userId
        newEntry.entries = [this.form.value.in1, this.form.value.out1, this.form.value.in2, this.form.value.out2]

        this.httpClient.post(url, newEntry).subscribe({
            next: data => {
                this.loadEntries()
                this.form.reset()
            },
            error: error => {
                console.log("Error -> ", error)
            }
        })
    }

    public updateEntrie(): void {
        const url = `${Api.baseUrl}/update`

        const updatedEntrie = <EntrieInterface>{
            _id: this.form.value._id,
            day: moment(this.form.value.day, 'DD/MM/YYYY').toDate(),
            user: Api.userId,
            entries: [this.form.value.in1, this.form.value.out1, this.form.value.in2, this.form.value.out2]
        }

        this.httpClient.put(url, updatedEntrie).subscribe({
            next: data => {
                this.loadEntries()
                this.form.reset()
            },
            error: error => {
                console.log("Error -> ", error)
            }
        })
    }

    public changeEntrie(entrie: EntrieInterface): void {
        this.form.setValue({
            _id: entrie._id,
            day: moment(entrie.day).format("DD/MM/YYYY"),
            in1: entrie.entries[0],
            out1: entrie.entries[1],
            in2: entrie.entries[2],
            out2: entrie.entries[3]
        })
    }

    public deleteEntrie(entrie_id: EntrieInterface["_id"]): void {
        const url = `${Api.baseUrl}/${entrie_id}`

        this.httpClient.delete(url).subscribe({
            next: data => {
                this.loadEntries()
            },
            error: error => {
                console.log(`Error -> ${error}`)
            }
        })
    }
}