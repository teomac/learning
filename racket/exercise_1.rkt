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

; implementation of vector-ref for lists
(define (ref k L)
  (if (= k 0) (car L)
        (ref (- k 1) (cdr L))))

; range function
; range(3) --> (0 1 2 3)
; range(2 4) --> (2 3 4)
(define (range s . e)
  (define (r s e)
    (if (= s e)
        (list s)
        (cons s (r (+ s 1) e))))
  (if (null? e)
      (r 0 s)
      (r s (car e))))