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


-- 1. Define a generic tree data structure, called Gtree, for trees having any number of children.

data Gtree a = Leaf a | Node [Gtree a] deriving (Show, Eq)

-- 2. Make Gtree an instance of Functor.

instance Gtree Functor where
    fmap f (Node []) = Node []
    fmap f (Leaf a) = (Leaf f a)
    fmap f (Node (x:xs)) = Node ((fmap f x) : (fmap f (Node xs)))

-- 3. Make Gtree an instance of Applicative, with <*> working like ftree in Exercise 1, but for the empty 
-- first parameter (i.e. the two arguments of <*> must necessarily have the same structure)

ftree :: Gtree (a->b) -> Gtree a -> Gtree b
ftree (Node []) (Node []) = Node []
ftree (Leaf f) (Leaf v) = Leaf (f v)
ftree (Node f:fs) (Node x:xs) = Node (ftree f x) : vs where
                                Node vs = ftree (Node fs) (Node xs)

instance Gtree Applicative where
    pure = Leaf
    (<*>) = ftree

-- 1) Define a Tritree data structure, i.e. a tree where each node has at most 3 children, and every node contains 
-- a value.

data Tritree a = Nil | Tritree a (Tritree x) (Tritree y) (Tritree z) deriving (Show, Eq)

-- 2) Make Tritree an instance of Foldable and Functor.

instance Tritree Functor where
    fmap f Nil = Nil
    fmap f (Tritree v t1 t2 t3) = Tritree (f v) (fmap f t1) (fmap f t2) (fmap f t3)

instance  Tritree Foldable where
    foldr f z Nil = z
    foldr f z (Tritree v t1 t2 t3) = f v (foldr f (foldr f (foldr f z t3) t2) t1)

-- 3) Define a Tritree concatenation t1 +++ t2, where t2 is appended at the bottom-rightmost position of t1.

x +++ Nil = x
Nil +++ x = x
(Tritree v x1 x2 Nil) +++ t = (Tritree v x1 x2 t)
(Tritree v x1 x2 x3) +++ t = (Tritree v x1 x2 (x3 +++ t))