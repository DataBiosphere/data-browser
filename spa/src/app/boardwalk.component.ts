import { Component } from "@angular/core";

console.log("boardwalk component");
@Component({
  selector: "bw-root",
  templateUrl: "./boardwalk.component.html",
  styleUrls: ["./boardwalk.component.css"]
})
export class BoardwalkComponent {

  title = "UCSC Boardwalk File Browser";

  constructor() {}
}
