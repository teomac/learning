(define (leap-year? year)
    (cond
    [(not (eq? (remainder year 4) 0)) #f]
    [(not (eq? (remainder year 100) 0)) #t]
    [(not (eq? (remainder year 400) 0)) #f]
    [else #t]))