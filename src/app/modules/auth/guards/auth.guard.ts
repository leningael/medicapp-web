import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { CredentialsService } from "src/app/shared/services/credentials.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private credentialsService:CredentialsService, private router: Router) { }

  canActivate(): boolean {
    if(!this.credentialsService.token){
      this.credentialsService.clearCredentials();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    if(!this.credentialsService.token){
      this.credentialsService.clearCredentials();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}