import { Component, Input, Output, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  response = {
    status: '',
    room: '',
    node: ''
  }
  isSaved = {
    status: false
  }
  savedData = {
    hostname: '',
    room: '',
    node: ''
  }
  data = {
    room: "",
    node: ""
  }

  constructor(private httpService: HttpService){

  }
  
  ngOnInit(){
    this.isRegisteredHostname()
  }

  isRegisteredHostname(): Promise<any>{
    return this.httpService.isRegisteredHostname()
      .then(res => {
        console.log(res)
        console.log(res.json())
        var data = res.json()
        if (!data.NONE) {
          this.isSaved.status = true
          this.savedData.hostname = data.hostname
          this.savedData.node = data.nodeName
          this.savedData.room = data.path
        } 
      })
  }

  onSubmit(): Promise<any>{
    return this.httpService.register(this.data)
      .then(res => {
      console.log(res)
      var response = res.json()
      location.reload()
      this.response.status = response.status
      this.response.room = response.room
      this.response.node = response.node
    })
  }
}
