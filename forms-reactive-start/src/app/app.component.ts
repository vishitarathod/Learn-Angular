import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm:FormGroup;
  forbiddenUserNames=['max','anna','abc'];

  ngOnInit(){
    // this.signupForm=new FormGroup({
    //   'username':new FormControl(null,Validators.required),
    //   'email':new FormControl(null,[Validators.required,Validators.email]),
    //   'gender':new FormControl('female')
    // })
        this.signupForm=new FormGroup({
          'userData':new FormGroup({
            'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
            'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails.bind(this)),
          }),
          'gender':new FormControl('female'),
          'hobbies':new FormArray([])
    })
    // this.signupForm.valueChanges.subscribe(
    //   (value)=>console.log(value)
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (status)=>console.log(status)
    // );
    this.signupForm.setValue({
      'userData':{
        'username':'max',
        'email':"max@test.com",
      },
      'gender':'female',
      'hobbies':[]
    })
    this.signupForm.patchValue({
      'userData':{
        'username':'anna',

      },
 
    })
  }
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset()

  }
  onAddHobby(){
     const control= new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)

  }
  getControls(){
   return (<FormArray>this.signupForm.get('hobbies')).controls
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    // console.log(this.forbiddenUserNames.indexOf(control.value));
    if(this.forbiddenUserNames.indexOf(control.value)!==-1){
      return {'nameIsForbidden':true}
    }
    return null;
  }

  //asyncronus validator
  forbiddenEmails(control:FormControl):Promise<any>| Observable<any>{
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com'){
          resolve({
            'emailIsForbidden':true
          })
        }else{
          resolve(null)
        }
      },1500)
    });
    return promise;
  }

}
