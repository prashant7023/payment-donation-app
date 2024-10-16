import React, { useEffect, useState } from 'react';
import { doc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this points to your Firebase config
import Header from './Header';

const Dashboard = ({ user }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(50); // Default amount
  const [selectedCharity, setSelectedCharity] = useState('');
  const [totalDonations, setTotalDonations] = useState(0); // Total donations

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user || !user.uid) return; // Ensure user and uid are defined

      try {
        const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(paymentsQuery);
        const payments = [];
        let total = 0; // Variable to calculate total donations

        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          payments.push({
            id: data.id,
            amount: data.amount,
            charity: data.charity,
            date: data.date.toDate(), // Convert Firestore timestamp to JS Date
          });
          total += data.amount; // Accumulate the total donations
        });
        setPaymentData(payments);
        setTotalDonations(total); // Set total donations
      } catch (err) {
        console.error('Failed to fetch payment data', err);
      }
    };

    fetchPayments();
  }, [user]); // Dependencies on user

  const handlePayment = async () => {
    if (!selectedCharity) {
      alert('Please select a charity before proceeding.');
      return;
    }

    const options = {
      key: 'rzp_live_hoGPJY2ykACPY4', // Replace with your Razorpay key
      amount: selectedAmount * 100, // Amount in paisa
      currency: 'INR',
      name: 'Your Charity Name',
      description: `Donation to ${selectedCharity}`,
      handler: async function (response) {
        const { razorpay_payment_id } = response;
        console.log('Payment Successful', razorpay_payment_id);

        try {
          // Store payment data in Firestore
          await setDoc(doc(db, 'payments', razorpay_payment_id), {
            userId: user.uid, // Ensure user.uid is available
            amount: selectedAmount,
            charity: selectedCharity,
            date: Timestamp.now(), // Store current timestamp
          });

          // Update local state with new payment
          const newPayment = {
            id: razorpay_payment_id,
            amount: selectedAmount,
            charity: selectedCharity,
            date: new Date(), // Store as a Date object
          };
          setPaymentData(prev => [...prev, newPayment]);
          setTotalDonations(prev => prev + selectedAmount); // Update total donations
          alert('Payment successful');
        } catch (error) {
          console.error('Error saving payment data:', error);
          alert('Payment successful, but failed to save the transaction.');
        }
      },
      prefill: {
        name: user?.username || 'Guest',
        email: user?.email || '',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container mx-auto rounded-sm">
      <Header />
      <h2 className="text-xl font-bold my-4">Welcome to the Payment Dashboard!</h2>

      <div className="bg-white shadow-md rounded p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4">Make a Donation</h3>
        <div className="flex items-center mb-4">
          <span className="mr-2">Donation Amount:</span>
          {[1, 25, 50, 100].map(amount => (
            <button
              key={amount}
              className={`py-2 px-4 border rounded ${selectedAmount === amount ? 'bg-gray-300' : 'bg-white'}`}
              onClick={() => setSelectedAmount(amount)}
            >
              ₹{amount}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Select Charity:</label>
          <select
            value={selectedCharity}
            onChange={(e) => setSelectedCharity(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Choose a charity</option>
            <option value="Red Cross">Health & Medical</option>
            <option value="UNICEF">Animal Welfare</option>
            <option value="World Wildlife Fund">Education</option>
            <option value="Doctors Without Borders">Local Charities</option>
          </select>
        </div>

        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Payment History Section */}
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
        {paymentData.length === 0 ? (
          <p>No payment history available.</p>
        ) : (
          <ul>
            {paymentData.map(payment => (
              <li key={payment.id} className="flex justify-between py-2 border-b">
                <div>
                  <strong>{payment.charity}</strong>
                  <p>{payment.date.toLocaleDateString()}</p> {/* Format date */}
                </div>
                <span>₹{(payment.amount).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Total Donations */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Total Donations: ₹{(totalDonations).toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Dashboard;
