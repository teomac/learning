instance (Num f) => (Num [f]) where
    a + [] = a
    [] + b = b
    (x:xs) + (y:ys) = (x+y):(xs+ys)

    a - [] = a
    [] - b = b
    (x:xs) - (y:ys) = (x-y):(xs-ys)

    a * [] = map (\x -> 0) a
    [] * b = map (\x -> 0) b
    (x:xs) * (y:ys) = (x*y):(xs*ys)

    abs = map abs

    signum = map signum

    fromInteger a = [fromInteger a]

data TT = VV Int | LL [TT] deriving (Show, Eq)

len (VV _) = 0
len (LL x) = length x

member x (LL y) = (VV x) 'elem' y

lile a = member (len a) a