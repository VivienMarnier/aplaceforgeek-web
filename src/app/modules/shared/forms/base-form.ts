import { FormGroup } from '@angular/forms';

export abstract class BaseForm {
    
    public form: FormGroup;
      
    // convenience getter for easy access to form fields    
    get f() { return this.form.controls; }
}