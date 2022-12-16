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

--member x (LL y) = (VV x) 'elem' y

--lile a = member (len a) a


suffixes' :: [a] -> [[a]]
suffixes' [] = []
suffixes' (x:xs) = (xs) : (suffixes xs)

suffixes lst = suf lst []
            where
                suf :: [a] -> [[a]] -> [[a]]
                suf [] res = res
                suf (x:xs) res = suf xs ((x:xs) : res)
prefixes lst = pre lst []
            where
                pre [] res = res
                pre (x:xs) [] = pre xs [[x]]
                pre (x:xs) res = pre xs $ ((head res) ++ [x]) : res

infixes lst = foldl (++) [] $
                map suffixes (prefixes lst)