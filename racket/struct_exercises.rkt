#lang racket

(struct being (
               name
               (age #:mutable)
               ))

(define (being-show x)
  (display (being-name x))
  (display " (")
  (display (being-age x))
  (display ")"))

(define (say-hello x)
  (if (being? x) ;; check if it is a being
      (begin
        (being-show x)
        (display ": my regards.")
        (newline))
      (error "not a being" x)))

(define james (being "james" 25))

(struct may-being being
  ((alive? #:mutable)))

(define (kill! x)
  (if (may-being? x)
      (set-may-being-alive?! x #f)
      (error "not a may-being" x )))
(define luke (may-being "luke" 30 #t))