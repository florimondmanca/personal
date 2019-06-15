import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BlogLayoutService {
  public isHome$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
