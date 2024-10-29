import { useState } from 'react';
import Image from 'next/image';
import styles from './TestPaymentPage.module.css';

function TestPaymentPage() {
  const [quantity, setQuantity] = useState(1); // Par défaut, la quantité est 1
  const [loading, setLoading] = useState(false);

  const itemName = 'Produit Exemple';
  const itemPrice = 1500; // Exemple de prix, remplacez par la valeur réelle

  // Ajuster la quantité
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handlePayment = async () => {
    setLoading(true);
    const response = await fetch('/api/paytech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemName,
        itemPrice: itemPrice * quantity, // Prix total
        quantity,
        refCommand: `cmd_${Date.now()}`
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success && data.redirect_url) {
      window.location.href = data.redirect_url;
    } else {
      alert('Erreur de paiement: ' + (data.error || 'Réponse invalide'));
    }
  };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>{itemName}</h2> */}
      
      <Image
        src="/images/product-sample.jpg"
        alt={itemName}
        className={styles.productImage}
        width={500}
        height={500}
      />

      <p className={styles.description}>
        Ce produit est un exemple pour tester l&apos;intégration du paiement avec Paytech. Veuillez ajuster la quantité et cliquer sur &quot;Payer&quot;.
      </p>

      <div className={styles.priceQuantityContainer}>
        <span className={styles.price}>{itemPrice * quantity} XOF</span>
        <div className={styles.quantityControls}>
          <button onClick={decrementQuantity} className={styles.quantityButton}>-</button>
          <span className={styles.quantity}>{quantity}</span>
          <button onClick={incrementQuantity} className={styles.quantityButton}>+</button>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className={styles.payButton}
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Payer'}
      </button>
    </div>
  );
}

export default TestPaymentPage;