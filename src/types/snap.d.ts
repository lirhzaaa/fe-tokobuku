interface SnapPayResult {
  order_id: string;
  status_code: string;
  transaction_status: string;
  payment_type: string;
  transaction_id: string;
  gross_amount: string;
}

interface SnapPayCallbacks {
  onSuccess: (result: SnapPayResult) => void;
  onPending: (result: SnapPayResult) => void;
  onError: (result: SnapPayResult) => void;
  onClose: () => void;
}

interface Snap {
  pay(token: string, callbacks?: SnapPayCallbacks): void;
}

interface Window {
  snap: Snap;
}