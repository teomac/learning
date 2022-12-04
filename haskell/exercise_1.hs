--factorial
fact :: Int -> Int
fact 0 = 1
fact n = n * fact(n-1)

--length of a list
len :: [a] -> Integer
len[] = 0
len (x:xs) = 1 + len xs

--reverse of a list (quadratic)
rev :: [a] -> [a]
rev[] = []
rev (x:xs) = (rev xs) ++ [x]

--fold left
foldleft :: (a -> b -> b) -> b -> [a] -> b
foldleft f z [] = z
foldleft f z (x:xs) = foldleft f (f x z) xs

--reverse of a list (linear)
rev' :: [a] -> [a]
rev' = foldleft (:) []

data TrafficLight = Red | Yellow | Green

instance Show TrafficLight where
    show Red = "red"
    show Yellow = "yellow"
    show Green = "green"

instance Eq TrafficLight where
    Red == Red = True
    Yellow == Yellow = True
    Green == Green = True
    _ == _ = False