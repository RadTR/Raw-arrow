import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const steps = ["Bag Review", "Delivery Info", "Payment"];

const inputClass = "w-full border-b border-neutral-300 bg-transparent py-3 text-sm text-black transition-colors focus:border-black focus:outline-none dark:border-neutral-700 dark:text-white dark:focus:border-white";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Tunisia"
  });

  const shipping = deliveryMethod === "express" ? 12 : 0;
  const total = cartSubtotal + shipping;

  const progressWidth = useMemo(() => {
    if (step === 0) return "0%";
    if (step === 1) return "50%";
    return "100%";
  }, [step]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validateDelivery = () => {
    const nextErrors = {};
    ["firstName", "lastName", "email", "phone", "address", "city"].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "Required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Invalid email";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueToPayment = () => {
    if (validateDelivery()) setStep(2);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    clearCart();
    navigate('/order-confirmation');
  };

  const orderSummary = (
    <div className="border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-black dark:text-white">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Your bag is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img src={item.product.image} alt={item.product.name} className="h-[52px] w-10 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold uppercase tracking-wide text-black dark:text-white">
                  {item.product.name}
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Size {item.size} / Qty {item.quantity}
                </p>
              </div>
              <p className="text-xs font-semibold text-black dark:text-white">
                {item.product.price * item.quantity} TND
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm dark:border-neutral-800">
        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Subtotal</span>
          <span>{cartSubtotal} TND</span>
        </div>
        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `${shipping} TND`}</span>
        </div>
        <div className="flex justify-between font-bold text-black dark:text-white">
          <span>Total</span>
          <span>{total} TND</span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="mx-auto min-h-screen max-w-screen-2xl bg-white px-5 py-12 transition-colors dark:bg-neutral-950 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
          Back to Store
        </Link>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-px bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="absolute left-0 top-3 h-px bg-raw-yellow transition-all duration-500" style={{ width: progressWidth }}></div>
            <div className="relative flex justify-between">
              {steps.map((label, index) => (
                <div key={label} className="bg-white pr-3 dark:bg-neutral-950">
                  <div className={`text-xs uppercase tracking-widest ${
                    index < step
                      ? "font-bold text-raw-yellow"
                      : index === step
                        ? "font-bold text-black dark:text-white"
                        : "text-neutral-400"
                  }`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          {cartItems.length === 0 && step !== 0 && (
            <section className="border border-neutral-200 p-8 text-center dark:border-neutral-800">
              <AlertCircle className="mx-auto text-raw-yellow" size={32} />
              <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-tight text-black dark:text-white">
                Your bag is empty
              </h1>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                Add a RawArrow piece before continuing checkout.
              </p>
              <Link to="/collection" className="mt-8 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
                Return to Shop
              </Link>
            </section>
          )}
          {step === 0 && (
            <section>
              <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
                Bag Review
              </h1>
              <div className="mt-8 space-y-5">
                {cartItems.length === 0 ? (
                  <div className="border border-neutral-200 p-8 text-center dark:border-neutral-800">
                    <p className="font-heading text-xl font-bold uppercase tracking-tight text-black dark:text-white">Your bag is empty.</p>
                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Start with denim, tees, or trending pieces before checkout.</p>
                    <Link to="/collection" className="mt-6 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
                      Return to Shop
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
                      <img src={item.product.image} alt={item.product.name} className="h-[52px] w-10 object-cover" />
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate font-heading text-sm font-bold uppercase tracking-wide text-black dark:text-white">
                          {item.product.name}
                        </h2>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          Size {item.size} / Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-black dark:text-white">
                        {item.product.price * item.quantity} TND
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="font-bold uppercase tracking-widest text-black dark:text-white">Subtotal</span>
                <span className="font-bold text-black dark:text-white">{cartSubtotal} TND</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Shipping calculated at next step.</p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-8 h-14 w-full bg-black text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-white dark:text-black dark:hover:bg-raw-yellow lg:w-auto lg:px-12"
                disabled={cartItems.length === 0}
              >
                Continue to Delivery
              </button>
            </section>
          )}

          {cartItems.length > 0 && step === 1 && (
            <section>
              <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
                Delivery Info
              </h1>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {[
                  ["firstName", "First Name", ""],
                  ["lastName", "Last Name", ""],
                  ["email", "Email Address", "md:col-span-2"],
                  ["phone", "Phone Number", "md:col-span-2"],
                  ["address", "Address Line 1", "md:col-span-2"],
                  ["city", "City", ""]
                ].map(([field, label, span]) => (
                  <label key={field} className={span}>
                    <input className={inputClass} placeholder={label} value={form[field]} onChange={(event) => updateField(field, event.target.value)} />
                    {errors[field] && <span className="mt-2 block text-xs text-red-500">{errors[field]}</span>}
                  </label>
                ))}
                <input className={inputClass} placeholder="Postal Code" value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} />
                <select className={`md:col-span-2 ${inputClass}`} value={form.country} onChange={(event) => updateField("country", event.target.value)}>
                  <option>Tunisia</option>
                  <option>Algeria</option>
                  <option>Morocco</option>
                </select>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  { id: "standard", title: "Standard (3-5 days)", price: "Free" },
                  { id: "express", title: "Express (1-2 days)", price: "12 TND" }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setDeliveryMethod(method.id)}
                    className={`flex items-center justify-between border p-5 text-left transition-colors ${
                      deliveryMethod === method.id
                        ? "border-raw-yellow"
                        : "border-neutral-200 hover:border-black dark:border-neutral-800 dark:hover:border-white"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-bold uppercase tracking-widest text-black dark:text-white">{method.title}</span>
                      <span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-400">{method.price}</span>
                    </span>
                    <span className={`h-4 w-4 rounded-full border ${deliveryMethod === method.id ? "border-raw-yellow bg-raw-yellow" : "border-neutral-400"}`}></span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => setStep(0)} className="h-14 border border-neutral-300 px-10 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:border-black dark:border-neutral-700 dark:text-white dark:hover:border-white">
                  Back
                </button>
                <button type="button" onClick={continueToPayment} className="h-14 bg-black px-10 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
                  Continue to Payment
                </button>
              </div>
            </section>
          )}

          {cartItems.length > 0 && step === 2 && (
            <section className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
                  Payment
                </h1>
                <div className="mt-8 border border-neutral-200 p-8 transition-colors dark:border-neutral-800">
                  <Lock className="text-raw-yellow" size={28} />
                  <h2 className="mt-5 font-heading text-xl font-bold uppercase tracking-tight text-black dark:text-white">
                    Secure payment coming soon
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    We'll contact you to confirm your order via WhatsApp or email.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => setStep(1)} className="h-14 border border-neutral-300 px-10 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:border-black dark:border-neutral-700 dark:text-white dark:hover:border-white">
                    Back
                  </button>
                  <button type="button" onClick={placeOrder} className="h-14 bg-black px-10 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
                    Place Order
                  </button>
                </div>
              </div>

              <details className="border border-neutral-200 p-5 dark:border-neutral-800 lg:hidden">
                <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-black marker:content-none dark:text-white">
                  Order Summary
                </summary>
                <div className="mt-5">{orderSummary}</div>
              </details>
              <aside className="hidden lg:block">{orderSummary}</aside>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
