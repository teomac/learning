data Listree a = Cons a (Listree a) | Null | Branch (Listree a) (Listree a) deriving (Show, Eq)
leaf x = Cons x Null

instance Functor Listree where
    fmap f Null = Null
    fmap f (Cons a b) = Cons (f a) (fmap f b)
    fmap f (Branch a b) = Branch (fmap f a) (fmap f b)

instance Foldable Listree where
    foldr f z Null = z
    foldr f z (Cons x t) = f x (foldr f z t)
    foldr f z (Branch t1 t2) = (foldr f (foldr f z t2) t1)

x <++> Null = x
Null <++> x = x
(Cons v t) <++> y = Cons v (t <++> y)
x <++> y = (Branch x y)

ltconcat t = foldr (<++>) Null t
ltconcatmap f t = ltconcat (fmap f t)

instance Applicative Listree where
    pure = leaf
    fs <*> xs = ltconcatmap (\f -> fmap f xs) fs

---

apply42 f x =
    let s = f x
    in if s > 42
        then Just s
        else Nothing

sequence42 x =
    case apply42 (+ 12) x of
        Nothing -> Nothing
        Just x' -> case apply42 (subtract 6) x' of
            Nothing -> Nothing
            Just x'' -> apply42 (*2) x''

--same function but with monads (two possibilities: binds or do)
sequence42m x = apply42 (+12) x >>= apply42 (subtract 6) >>= apply42 (*2)

sequence42do x =
    do  x <- apply42 (+12) x
        x <- apply42 (subtract 6) x
        x <- apply42 (*2) x
        return x


--Logger monad
type Log = [String]

data Logger a = Logger {getContent :: a
                        , getLog :: Log }
-- data Logger a = Logger a Log (same thing)

instance (Eq a) => Eq (Logger a) where
    (Logger x _) == (Logger y _) = x == y

instance (Show a) => Show (Logger a) where
    show (Logger d l) = show d
        ++ "\nLog:\n" ++
        foldr (\line acc -> "\n\t" ++ line ++ acc) "" l

instance Functor Logger where
    fmap f (Logger x l) = Logger (f x) l

instance Applicative Logger where
    pure x = Logger x []
    (Logger f fl) <*> (Logger x xl) = Logger (f x) (fl ++ xl)

instance Monad Logger where
    (Logger x l) >>= f =
        let Logger x' l' = f x
        in Logger x' (l ++ l')

logPlusOne x = Logger (x+1) ["Increase by 1."]
logMultTwo x = Logger (x*2) ["Multiply by 2."]

logOp1 x = do
    x <- logPlusOne x
    x <- logPlusOne x
    x <- logMultTwo x
    return x