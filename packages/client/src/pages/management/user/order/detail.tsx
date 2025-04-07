import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function OrderDetail({ orderId }: { orderId: number }) {
  return <div>{orderId}</div>;
}

export function OrderDetailButton({ orderId }: { orderId: number }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return <OrderDetail orderId={orderId} />;
}
 