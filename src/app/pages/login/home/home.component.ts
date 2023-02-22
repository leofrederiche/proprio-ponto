import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EntryInterface } from "../../../interfaces/entry"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    constructor(
        private httpClient: HttpClient,
    ){}

    ngOnInit() {
        this.loadEntries()
    }

    public entry = <EntryInterface>{
        totalBalance: "00:00"
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
}