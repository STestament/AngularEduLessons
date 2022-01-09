import { FormControl } from '@angular/forms';

export type customValidator = {
    notEmpty?: { message: string },
    notLessThanSix?: { message: string } | null
}

export function notEmpty(control: FormControl): customValidator | null {  
    let val = control.value;
    let textError = "Поле не может быть пустым";
        if (val) {
            if (val.length === 0) {
                return { notEmpty: { message: textError }}
            }
            else{
                return null;
            }
        }
        else{
            return { notEmpty: { message: textError }}
        }
}
export function notLessThanSix(control: FormControl): customValidator | null {  
    let val = control.value;
    let textError = "Поле не может быть меньше 6 символов";
        if (val) {
            if (val.length > 0 && val.length < 6) {
                return { notLessThanSix: { message: textError }}
            }
            else{
                return null;
            }
        }
        else{
            return null
        }
}
