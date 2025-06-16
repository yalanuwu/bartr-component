import { AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-debug-component',
  imports: [],
  templateUrl: './debug-component.component.html',
  styleUrl: './debug-component.component.css'
})
export class DebugComponentComponent implements OnInit, AfterViewInit {

  ngOnInit() {

    // const cards = document.querySelectorAll('#card');
    // console.log(cards);
    // gsap..forEach((card, i) => {
    //   ScrollTrigger.create({

    //       trigger: card,
    //       start: "top top",
    //       scrub: 1, // Smooth scrubbing
    //       pin: card,   // Pin the stack during animation
    //       markers: true,
    //       pinSpacing: false

    //   })
    // })
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#card2", // Trigger on Card 2.
          start: "top bottom", // When Card 2's top hits the bottom of the viewport.
          end: "bottom bottom", // When Card 2's top reaches the top of the viewport.
          scrub: true, // Smooth scroll-based animation.
          markers: true,
          pin: '#card1'
        }
      }).fromTo(
        "#card2", // Animate Card 2.
        { y: "100%" }, // Starting position: completely below the viewport.
        { y: "0%", ease: "none" } // Ending position: fully sliding into place.
      );
    }
  }

}
