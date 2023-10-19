import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role: string = this.credentialsService.role;
    const codes: string[] = route.data['permissions'];

    return codes.some((code) => code === role);
  }
}
