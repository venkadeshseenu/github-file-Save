import { Component, OnInit } from '@angular/core';
import { Document } from 'yaml';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'github-file-upload';
  gitUrl = 'https://api.github.com/repos';
  payload = {};
  constructor(private api: ApiService) {
  }
  // /repos/{owner}/{repo}/contents/{path}
  // https://github.com/venkadeshseenu/github-file-Save/tree/master

  ngOnInit() {
    // this.saveFile();
  }

  saveFile() {
    // https://www.npmjs.com/package/yaml
    // https://eemeli.org/yaml/#creating-documents
    const doc = new Document(['some', 'values', { balloons: 99 }])
    doc.commentBefore = ' A commented document'
    console.log(String(doc));
    let text = btoa(String(doc))
    console.log(text);
    this.api.getSha().subscribe((res: any) => {
      console.log(res);

      let sha = res.sha;
      if (sha) {
        //update 
        this.payload = { "message": "my commit message", "sha": sha, "committer": { "name": "venkadesh.s", "email": "venkadesh.s@knackforge.com" }, "content": text }
        this.api.save(this.payload).subscribe((res) => {
          console.log(res);
          alert('Updated')
        })
      }
    }, (err) => {
      if (err.status == 404) {
        //insert
        this.payload = { "message": "my commit message", "committer": { "name": "venkadesh.s", "email": "venkadesh.s@knackforge.com" }, "content": text }
        this.api.save(this.payload).subscribe((res) => {
          console.log(res);
          alert('Added')
        })
      }
    })
  }
}
