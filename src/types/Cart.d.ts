interface AddToCart {
  bookId: string;
  quantity: number;
}

interface UpdateCart {
  bookId: string;
  quantity: number;
}

interface RemoveFromCart {
  bookId: string;
}

interface ICart {
  book: string;
  quantity: number
  price: number
}

export { AddToCart, UpdateCart, RemoveFromCart, ICart };
