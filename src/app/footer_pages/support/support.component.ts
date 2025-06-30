import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click on "Forgot Password". Enter your registered email address, and we\'ll send you a link to reset your password.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express) and PayPal.',
      isOpen: false
    },
    {
      question: 'How can I update my profile information?',
      answer: 'You can update your profile by logging into your account and navigating to the "Profile Settings" section. Make your changes and click "Save".',
      isOpen: false
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we prioritize your data security. We use industry-standard encryption and security protocols to protect your personal information. Please refer to our Privacy Policy for more details.',
      isOpen: false
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact us via email at support@[yourcompany.com], through our contact form, or by phone during business hours.',
      isOpen: false
    }
  ];

  /**
   * Toggles the open/closed state of an FAQ item.
   * @param index The index of the FAQ item to toggle.
   */
  toggleFaq(index: number): void {
    this.faqs.forEach((faq, i) => {
      if (i === index) {
        faq.isOpen = !faq.isOpen; // Toggle the clicked item
      } else {
        faq.isOpen = false; // Close other items (optional: remove this line to allow multiple open)
      }
    });
  }
}
