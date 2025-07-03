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
      question: 'How do I change my password?',
      answer: 'Go to profile page and click on "Profile Settings". You can change your current password and change your password. For now, we don\'t provide any option to reset the password.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept payment only via QR code for now. You can scan the QR Code and pay the amount using any of the UPI Apps.',
      isOpen: false
    },
    {
      question: 'How can I update my profile information?',
      answer: 'You can edit your profile by logging into your account and navigating to the Profile section. Click on the edit button. Make your changes and click "Save" button.',
      isOpen: false
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we prioritize your data security. We use industry-standard encryption and security protocols to protect your personal information. Please refer to our Privacy Policy for more details.',
      isOpen: false
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact us via email at support@CtrlAltDefeat.com, through our email support form only during business hours.',
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
