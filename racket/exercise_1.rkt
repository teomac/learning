#lang racket

; lenght of a list
(define (len L)
  (define (tail-len L k)
    (if (null? L) k
        (tail-len (cdr L) (+ k 1))))
  (tail-len L 0))

; prefix of a list
(define (prefix n L)
  (if (= n 0) '()
      (cons (car L) (prefix (- n 1) (cdr L)))))