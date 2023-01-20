import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form!: FormGroup
  errorMessage = '';
  logged!: boolean;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private storage: StorageService) {}

  ngOnInit(): void {
    this.logged = this.auth.getToken() as unknown as boolean
    if (this.logged) {
      this.router.navigate(['/'])
    }
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    this.auth.login(this.form.value.userName, this.form.value.password).subscribe({
      next: data => {
        this.storage.saveUser(data);
        console.log(this.storage.getUser());
        window.location.reload()
      },
      error: err => {        
        alert('Error: ' +err.error)
      }
    })
  }
}
