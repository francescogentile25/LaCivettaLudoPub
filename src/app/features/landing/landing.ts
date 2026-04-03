import { Component, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare const gsap: any;
declare const ScrollTrigger: any;

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements AfterViewInit, OnDestroy {

  showBookingModal = false;
  showShopModal = false;
  private gsapCtx: any;
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private carouselInterval: any;

  heroImages = [
    'assets/img/foto1.webp',
    'assets/img/foto2.webp',
    'assets/img/foto3.webp',
    'assets/img/fofo4.jpg',
    'assets/img/foto5.jpg',
    'assets/img/hero.jpg',
  ];
  currentSlide = 0;

  goToSlide(index: number): void {
    this.currentSlide = index;
    clearInterval(this.carouselInterval);
    this.startCarousel();
  }

  private startCarousel(): void {
    this.ngZone.runOutsideAngular(() => {
      this.carouselInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.heroImages.length;
        this.cdr.detectChanges();
      }, 5000);
    });
  }

  staffMembers = [
    { name: 'Stefano', img: 'assets/img/chi-siamo/Stefano.png' },
    { name: 'Marco', img: 'assets/img/chi-siamo/marco-crisci.jpeg' },
    { name: 'Paolo', img: 'assets/img/chi-siamo/paolo-buzzi.jpeg' },
    { name: 'Roberto', img: 'assets/img/chi-siamo/roberto-fidanzajpeg.jpeg' },
    { name: 'Hieu', img: 'assets/img/chi-siamo/hieu-vadalà.jpeg' },
  ];

  testimonials = [
    {
      name: 'ANDREA M.',
      text: "Tornato dopo qualche anno: pareti piene di giochi, civamburger, birre ottime e atmosfera familiare. Servizio ottimo e veloce. Che giochi!! Abbiamo riprovato i classici e scoperto tanti nuovi, tutti da provare. Sarà un piacere riprendere l'abitudine. Un saluto a tutto lo staff!",
    },
    {
      name: 'ELENA R.',
      text: 'Dopo mesi sono tornata con i miei amici alla storica Civetta. La nuova gestione ha portato una ventata d\'aria fresca: tantissimi nuovi giochi, menù ricco e gustoso, proprietari simpatici e disponibili. Luogo dal grande potenziale, pienamente valorizzato. Probabilmente ci ritorniamo anche domani!',
    },
    {
      name: 'MARCO T.',
      text: 'Luogo perfetto per una serata all\'insegna dei giochi da tavolo. Il personale è simpaticissimo e ti accoglie calorosamente, la scelta dei giochi è vastissima e il mangiare è molto buono. Consigliatissimo.',
    },
  ];

  ngAfterViewInit(): void {
    this.startCarousel();
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
    this.gsapCtx = gsap.context(() => {

    // Hero logo drop in
    gsap.from('.hero-logo-img', {
      duration: 0.7,
      opacity: 0,
      y: -30,
      scale: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.1,
    });

    // Header nav links fade in stagger
    gsap.from('.landing-nav a', {
      duration: 0.6,
      opacity: 0,
      y: -20,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Hero title slide in from left
    gsap.from('.hero-title', {
      duration: 0.9,
      opacity: 0,
      x: -80,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Hero subtitle fade in
    gsap.from('.hero-subtitle', {
      duration: 0.7,
      opacity: 0,
      y: 20,
      ease: 'power2.out',
      delay: 0.6,
    });

    // Hero carousel scale in
    gsap.from('.hero-carousel', {
      duration: 1,
      opacity: 0,
      scale: 0.95,
      ease: 'power2.out',
      delay: 0.5,
    });

    // Contatti parallax
    gsap.to('.contatti-parallax-img', {
      scrollTrigger: {
        trigger: '#contatti',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: '25%',
      ease: 'none',
    });

    // Feature cards scroll trigger
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top 80%',
      },
      duration: 0.7,
      opacity: 0,
      y: 60,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // History section
    gsap.from('.history-image', {
      scrollTrigger: {
        trigger: '.history-section',
        start: 'top 80%',
      },
      duration: 0.8,
      opacity: 0,
      x: -60,
      ease: 'power2.out',
    });

    gsap.from('.history-text', {
      scrollTrigger: {
        trigger: '.history-section',
        start: 'top 80%',
      },
      duration: 0.8,
      opacity: 0,
      x: 60,
      ease: 'power2.out',
    });

    // Staff members stagger
    gsap.from('.staff-member', {
      scrollTrigger: {
        trigger: '.staff-section',
        start: 'top 80%',
      },
      duration: 0.5,
      opacity: 0,
      scale: 0.7,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    });

    // Testimonials
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 80%',
      },
      duration: 0.7,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Footer
    gsap.from('.landing-footer', {
      scrollTrigger: {
        trigger: '.landing-footer',
        start: 'top 90%',
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      ease: 'power2.out',
    });

    }); // end gsap.context
    ScrollTrigger.refresh();
    }); // end setTimeout
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
    clearInterval(this.carouselInterval);
  }
}
