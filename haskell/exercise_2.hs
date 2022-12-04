data Point = Point Float Float deriving (Show, Eq)

pointx (Point x _) = x
pointy (Point _ y) = y

distance :: Point -> Point -> Float
distance (Point x1 y1) (Point x2 y2) =
    let dx = x1 - x2
        dy = y1 -y2
    in sqrt $ dx^2 + dy^2

type TPoint = (Float, Float)

distancet :: TPoint -> TPoint -> Float
distancet (x1,y1) (x2,y2) =
    let dx = x1 - x2
        dy = y1 -y2
    in sqrt $ dx^2 + dy^2

newtype NPoint = NPoint (Float, Float)

--filter implementation
myFilter :: (a -> Bool) -> [a] -> [a]
myFilter _ [] = []
myFilter f (x:xs)
    | f x = x : myFilter f xs
    |otherwise = myFilter f xs

--zip implementation
myZip :: [a] -> [b] -> [(a,b)]
myZip [] _ = []
myZip _ [] = []
myZip (x:xs) (y:ys) = (x,y) : myZip xs ys

--zipWith implementation
myZipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
myZipWith _ [] _ = []
myZipWith _ _ [] = []
myZipWith f (x:xs) (y:ys) = (f x y) : myZipWith f xs ys

--sumf [1,2,3,4] --> 1+2+3+4
sumf :: Num a => [a] -> a
sumf = foldr (+) 0

--binary tree implementation
data BTree a = BEmpty | BNode a (BTree a) (BTree a)

bleaf x = BNode x BEmpty BEmpty

instance Show a => Show (BTree a) where
    show BEmpty = ""
    show (BNode v x y) = "<" ++ show x ++ " " ++ show v ++ " " ++ show y ++ ">"

t = BNode 1 (bleaf 2) (BNode 3 (bleaf 4) (bleaf 5))

bToList :: (BTree a) -> [a]
bToList BEmpty = []
bToList (BNode v x y) = [v] ++ (bToList x) ++ (bToList y)

--check if the values of two binary trees are the same
instance Eq a =>  Eq (BTree a) where
    x == y = (bToList x) == (bToList y)

--map applied to a binary tree
bmap f BEmpty = BEmpty
bmap f (BNode v x y) = BNode (f v) (bmap f x) (bmap f y)

-- infinite binary trees
-- binf :: Integer -> BTree Integer
binf x = 
    let t = binf (x+1)
    in BNode x t t