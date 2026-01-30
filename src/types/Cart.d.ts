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

export {
    AddToCart,
    UpdateCart,
    RemoveFromCart
}