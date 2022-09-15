import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
// import { ValidatePassword } from "./must-match/validate-password";
import { Document } from 'yaml';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'github-file-upload';
  gitUrl = 'https://api.github.com/repos';
  payload = {};
  constructor(
    private api: ApiService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef) {
  }

  submitted = false;


  myform = this.fb.group({
    cOption: ['', [Validators.required]],
    docker: ['', [Validators.required]],
    sonar: ['', [Validators.required]],
    gitUrl: ['https://api.github.com/repos/venkadeshseenu/github-file-Save/contents/test.yml', [Validators.required]],
    branch: ['master', [Validators.required]],
    
  })

  // /repos/{owner}/{repo}/contents/{path}
  // https://github.com/venkadeshseenu/github-file-Save/tree/master

  ngOnInit() {
    // this.saveFile();
  }
  get formData(){
    return this.myform.controls
  }
  onSubmit(formdata:any) {
    console.log(formdata);
    
    // https://www.npmjs.com/package/yaml
    // https://eemeli.org/yaml/#creating-documents
    
    const doc = new Document([{ TechStack: formdata.cOption }, { Docker: formdata.docker }, { SonarQube: formdata.sonar }])
    // doc.createNode([{test:'value'}])
    // doc.commentBefore = ' A commented document'

    // const doc = new Document(['some', 'values', { balloons: 9 }])
    // doc.commentBefore = ' A commented document'

    console.log(String(doc));
    let text = btoa(String(doc))
    console.log(text);
    this.api.getSha().subscribe((res: any) => {
      console.log(res);
      let sha = res.sha;
      if (sha) {
        //update 
        this.payload = { "message": "my commit message", "sha": sha, "committer": { "name": "venkadesh.s", "email": "venkadesh.s@knackforge.com" }, "content": text }
        this.api.save(this.payload).subscribe((res: any) => {
          console.log(res);
          alert('Updated')
        })
      }
    }, (err) => {
      // if (err.status == 404) {
      //insert
      this.payload = { "message": "my commit message", "committer": { "name": "venkadesh.s", "email": "venkadesh.s@knackforge.com" }, "content": text }
      this.api.save(this.payload).subscribe((res: any) => {
        console.log(res);
        alert('Added')
      })
      // }
    })
    // https://github.com/venkadeshseenu/github-file-Save/contnet
  }
}
