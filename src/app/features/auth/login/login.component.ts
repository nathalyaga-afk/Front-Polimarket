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
  templateUrl: './login.component.html'
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
