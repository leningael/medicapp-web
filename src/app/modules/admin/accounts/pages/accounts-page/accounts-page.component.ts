import { Component, OnInit } from '@angular/core';
import { AccountOverview } from '../../interfaces/accounts.interfaces';
import { AccountsService } from '../../services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostAccountDialogComponent } from '../../components/post-account-dialog/post-account-dialog.component';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css'],
})
export class AccountsPageComponent implements OnInit {
  accounts: AccountOverview[] = [];
  accountsToSearch: string = '';
  isLoading: boolean = false;
  removing: string | false = false;

  constructor(
    private accountsService: AccountsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestAccounts();
  }

  requestAccounts() {
    this.isLoading = true;
    this.accountsService.getAccounts(this.accountsToSearch).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Error al cargar la lista de cuentas', 'Error');
        this.accounts = [];
        this.isLoading = false;
      },
    });
  }

  searchAccounts(search: string) {
    this.accountsToSearch = search;
    this.requestAccounts();
  }

  postAccount(account?: AccountOverview) {
    const dialogRef = this.dialog.open(PostAccountDialogComponent, {
      width: '450px',
      data: account,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.requestAccounts();
    });
  }

  deleteAccount(account: AccountOverview) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar cuenta',
        message: `¿Estás seguro de que quieres eliminar la cuenta ${account.username}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.removing = account._id;
      this.accountsService.deleteAccount(account._id).subscribe({
        next: () => {
          this.toastr.success(
            `Cuenta de ${account.username} eliminada`,
            'Éxito'
          );
          this.accounts = this.accounts.filter(
            (account) => account._id !== this.removing
          );
          this.removing = false;
        },
        error: () => {
          this.toastr.error(
            `Error al eliminar la cuenta ${account.username}`,
            'Error'
          );
          this.removing = false;
        },
      });
    });
  }
}
