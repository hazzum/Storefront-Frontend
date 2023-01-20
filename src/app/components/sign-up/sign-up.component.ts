import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form!: FormGroup
  errorMessage = '';
  logged!:boolean
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private storage: StorageService) {}

  ngOnInit(): void {
    this.logged = this.auth.getToken() as unknown as boolean
    if (this.logged) {
      this.router.navigate(['/'])
    }
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    const {firstName, lastName, userName, password} = this.form.value
    this.auth.signup(firstName, lastName, userName, password).subscribe({
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
