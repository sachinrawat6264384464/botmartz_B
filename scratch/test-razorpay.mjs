import fetch from 'node-fetch';

const keyId = "rzp_test_TGo9D6IVOjJAmk";
const keySecret = "NNZcr2GcAyT35VXC3txnYXMI";

const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

async function test() {
  console.log('Testing Razorpay Auth for key:', keyId);
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: 39900,
      currency: 'INR',
      receipt: 'test_123'
    })
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

test();
