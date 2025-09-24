import { NgFor, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  minDate!: string;
  maxDate!: string;
  attendanceList: { date: string; status: string }[] = [];

  searchkey: string = '';
  searchresult: { num: number; res: string }[] = [];

  errorMsg = '';
  leaveData: any = {};
  fromDate!: string;
  toDate!: string;
  userName: string = '';

  pkgResult: string = '';
  title: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.minDate = this.formatDate(firstDay);
    this.maxDate = this.formatDate(lastDay);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  checkPkgCode() {
    this.pkgResult = 'Checking...';
    this.http.get<{ message: string }>('http://localhost:3000/check-pkg').subscribe({
      next: (res) => {
        this.pkgResult = res.message;
      },
      error: (err) => {
        this.pkgResult = 'Error: ' + err.message;
      },
    });
  }

  getSearchResult() {
    const payload = { searchkey: this.searchkey };

    this.http.post<{ result: { num: number; res: string }[] }>(
      'http://localhost:3000/ytSearch',
      payload
    ).subscribe({
      next: (response) => {
        this.searchresult = response.result;
      },
      error: () => {
        alert('Error getting top 5 results');
      }
    });
  }

  applyLeave() {
    const payload = { fromDate: this.fromDate };

    this.http.post<{ attendance: { date: string; status: string }[] }>(
      'http://localhost:3000/applyLeave',
      payload
    ).subscribe({
      next: (response) => {
        this.attendanceList = response.attendance;
      },
      error: (error) => {
        alert('Error applying leave.');
        console.error('Payload:', payload);
        console.error('Error:', error);
      }
    });
  }

  checkLeaveStatus() {
    this.errorMsg = '';
    this.http.get<any>('http://localhost:3000/checkStatus').subscribe({
      next: (response) => {
        if (response.success) {
          this.leaveData = response.data;
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
