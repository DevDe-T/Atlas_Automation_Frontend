import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, HttpClientModule, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
  minDate!: string;
  maxDate!: string;
  attendanceList: { date: string; status: string }[] = [];
  errorMsg = '';
  leaveData: any = {}; 
  fromDate!: string;
  toDate!: string;
  userName : string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-based index

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.minDate = this.formatDate(firstDay);
    this.maxDate = this.formatDate(lastDay);
  }
  
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  


applyLeave() {
  // const payload = {
  //   fromDate: this.fromDate
  // };

  // this.http.post<{ attendance: { date: string; status: string }[] }>('https://cgapgt-backend-sandbox.apps.pgt.eastus.aroapp.io/applyLeave', payload)
  //   .subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       this.attendanceList = response.attendance;
  //       // this.userName = response.employeeName;
  //     },
  //     error: (error) => {
  //       alert('Error applying leave.');
  //       console.error('Payload:', payload);
  //       console.error('Error:', error);
  //     }
  //   });
  
  this.http.get<any>('https://cgapgt-backend-sandbox.apps.pgt.eastus.aroapp.io/testingApi')
    .subscribe({
      next: (response) => {
        console.log(response);
        
      },
      error: (error) => {
        alert('Error applying leave.');
        console.error('Error:', error);
      }
    });
}


  checkLeaveStatus() {
  this.errorMsg = '';
  this.http.get<any>('https://cgapgt-backend-sandbox.apps.pgt.eastus.aroapp.io/checkStatus').subscribe({
    next: (response) => {
      if (response.success) {
        this.leaveData = response.data;  // <-- store leave data in a component variable
        console.log(this.leaveData);
      } else {
        this.errorMsg = 'Failed to load leave balance.';
      }
    },
    error: (err) => {
      console.error('API Error:', err);
      this.errorMsg = 'Error fetching leave balance.';
    }
  });
}
 

}
