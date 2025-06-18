// src/app/transaction-history/transaction-history.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // For ngFor, ngIf, and date pipe

// Define an interface for the transaction data
interface Transaction {
  slNo: number;
  courseName: string;
  type: 'received' | 'spent'; // Explicitly define types
  xp: number;
  date: string; // Using string for simplicity, could be Date type
}

@Component({
  selector: 'app-transaction-history',
  standalone: true, // Mark as standalone
  imports: [CommonModule, NgFor, NgIf], // Import necessary modules
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {

  // Mock transaction data
  transactions: Transaction[] = [];

  ngOnInit(): void {
    // Initialize with some mock data
    this.transactions = [
      { slNo: 1, courseName: 'Angular Fundamentals', type: 'received', xp: 500, date: '2024-05-10' },
      { slNo: 2, courseName: 'JavaScript Advanced', type: 'spent', xp: 200, date: '2024-05-12' },
      { slNo: 3, courseName: 'React Basics', type: 'received', xp: 350, date: '2024-05-15' },
      { slNo: 4, courseName: 'Node.js Express', type: 'spent', xp: 150, date: '2024-05-18' },
      { slNo: 5, courseName: 'CSS for Designers', type: 'received', xp: 250, date: '2024-05-20' },
      { slNo: 6, courseName: 'Python for Data Science', type: 'received', xp: 600, date: '2024-05-22' },
      { slNo: 7, courseName: 'SQL Database Management', type: 'spent', xp: 100, date: '2024-05-25' },
      { slNo: 8, courseName: 'Cloud Computing Basics', type: 'received', xp: 400, date: '2024-05-28' },
      { slNo: 9, courseName: 'Cybersecurity Fundamentals', type: 'spent', xp: 300, date: '2024-06-01' },
      { slNo: 10, courseName: 'AI & Machine Learning Intro', type: 'received', xp: 750, date: '2024-06-05' },
    ];
  }

  // Helper to determine text color based on transaction type
  getTypeColor(type: 'received' | 'spent'): string {
    return type === 'received' ? 'text-green-700' : 'text-red-600';
  }
}
