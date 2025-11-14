import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, RouterLink,
    CardModule, InputTextModule, PasswordModule, ButtonModule, MessagesModule
  ],
  styles: [`
    :host { display:flex; align-items:center; justify-content:center; min-height:80dvh; }
    .login-card { width: 100%; max-width: 420px; }
  `],
  template: `
    <p-card class="login-card">
      <ng-template pTemplate="header">
        <h2 class="m-0">Iniciar sesión</h2>
      </ng-template>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="field mb-3">
          <label class="block mb-1">Usuario</label>
          <input pInputText formControlName="username" autocomplete="username" class="w-full">
        </div>

        <div class="field mb-3">
          <label class="block mb-1">Contraseña</label>
          <input pPassword formControlName="password" [feedback]="false" toggleMask="true" class="w-full"/>
        </div>

        <p-messages
  *ngIf="error()"
  severity="error"
  [value]="[{ detail: (error() ?? '') }]"
></p-messages>


        <button pButton type="submit" label="Entrar" class="w-full" [disabled]="form.invalid || loading()"></button>

        <div class="mt-3 text-600 text-sm">
          Usuarios de prueba: <code>rrhh</code>, <code>vendedor</code>, <code>novend</code>. Cualquier contraseña.
        </div>
      </form>
    </p-card>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit() {
    this.error.set(null);
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    this.loading.set(true);
    this.auth.signIn(username!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.message || 'No se pudo iniciar sesión');
      }
    });
  }
}
