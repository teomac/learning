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

; implementation of while construct
(define (while c b)
  (when (c)
    (b)
    (while c b)))


; while function test
(define (test-while)
  (define x 0)
  (while (lambda ()
           (< x 10))
         (lambda ()
           (displayln x)
           (set! x (+ 1 x)))))

; reverse of a list
(define (tsil L)
  (if (null? L)
      '()
      (append (tsil (cdr L)) (list (car L)))))

; implementation of flatten method (already present in racket)
(define (flat L)
  (if (null? L)
      '()
      (append (if (list? (car L))
                  (flat (car L))
                  (list (car L)))
              (flat (cdr L)))))