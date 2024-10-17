import React, { useEffect, useState } from 'react';
import { doc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this points to your Firebase config
import Header from './Header';

const Dashboard = ({ user }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [selectedCharity, setSelectedCharity] = useState('');
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user || !user.uid) return;

      try {
        const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(paymentsQuery);
        const payments = [];
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          payments.push({
            id: data.id,
            amount: data.amount,
            charity: data.charity,
            date: data.date.toDate(),
          });
          total += data.amount;
        });
        setPaymentData(payments);
        setTotalDonations(total);
      } catch (err) {
        console.error('Failed to fetch payment data', err);
      }
    };

    fetchPayments();
  }, [user]);

  const handlePayment = async () => {
    if (!selectedCharity) {
      alert('Please select a charity before proceeding.');
      return;
    }

    const options = {
      key: 'rzp_live_hoGPJY2ykACPY4',
      amount: selectedAmount * 100,
      currency: 'INR',
      name: 'Your Charity Name',
      description: `Donation to ${selectedCharity}`,
      handler: async function (response) {
        const { razorpay_payment_id } = response;
        console.log('Payment Successful', razorpay_payment_id);

        try {
          await setDoc(doc(db, 'payments', razorpay_payment_id), {
            userId: user.uid,
            amount: selectedAmount,
            charity: selectedCharity,
            date: Timestamp.now(),
          });

          const newPayment = {
            id: razorpay_payment_id,
            amount: selectedAmount,
            charity: selectedCharity,
            date: new Date(),
          };
          setPaymentData(prev => [...prev, newPayment]);
          setTotalDonations(prev => prev + selectedAmount);
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center ">Charity Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
          <p className="text-gray-600 mb-6">Choose an amount and charity to support</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Donation Amount</label>
              <div className="flex flex-wrap gap-2">
                {[1, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    className={`py-2 px-4 rounded ${
                      selectedAmount === amount
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ₹{amount}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="w-32 px-3 py-2 border rounded bg-gray-200 focus:outline-none"
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Charity</label>
              <select
                value={selectedCharity}
                onChange={(e) => setSelectedCharity(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              >
                <option value="">Choose a charity</option>
                <option value="Health & Medical">Health & Medical</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Education">Education</option>
                <option value="Local Charities">Local Charities</option>
              </select>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-500 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <p className="text-gray-600 mb-6">Your recent donations</p>
          {paymentData.length === 0 ? (
            <p className="text-center text-gray-500">No payment history available.</p>
          ) : (
            <ul className="space-y-4">
              {paymentData.map(payment => (
                <li key={payment.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{payment.charity}</p>
                    <p className="text-sm text-gray-500">{payment.date.toLocaleDateString()}</p>
                  </div>
                  <span className="font-bold">₹{payment.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Donations</span>
            <span className="font-bold text-lg">₹{totalDonations.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Your Impact
        </h2>
        <p className="text-gray-600 mb-6">See how your donations are making a difference</p>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2">₹{totalDonations.toFixed(2)}</p>
          <p className="text-xl">Total Amount Donated</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{paymentData.length}</p>
            <p>Donations Made</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{new Set(paymentData.map(p => p.charity)).size}</p>
            <p>Charities Supported</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;