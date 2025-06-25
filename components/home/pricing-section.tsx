import { Check, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const Plans: PriceType[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2,
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    description: 'Perfect for occasional use',
    paymentLink: '',
    priceId: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5,
    items: [
      'Unlimited PDF Reader',
      'Priority processing',
      '24/7 priority support',
      'Markdown export',
    ],
    description: 'For professional use and teams',
    paymentLink: '',
    priceId: '',
  },
];

function PricingSection() {
  return (
    <section className="px-5 py-5 mx-auto">
      <div className="text-center p-10 uppercase font-bold">
        <h2>Pricing</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
  //priceId,
}: PriceType) {
  return (
    <div
      id="pricing"
      className={cn(
        'border-2 border-gray-300 p-4 flex flex-col gap-2 rounded-2xl cursor-pointer hover:border-black hover:scale-105 hover:transition-all duration-300',
        id == 'pro' ? 'border-black' : '',
      )}
    >
      <div className="capitalize font-bold">{name}</div>
      <div>{description}</div>
      <div className="flex flex-row items-center">
        <DollarSign />
        <div className="text-5xl">{price}</div>
        <div className="flex flex-col justify-end mt-[10px] ml-[5px]">
          <div className="font-bold text-[10px]">USD</div>
          <div className="font-bold text-[10px]">/month</div>
        </div>
      </div>
      <ul className="flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-row items-center gap-1">
            <Check color="green" className="w-5 h-5" />
            <li key={idx}>{item}</li>
          </div>
        ))}
      </ul>
      <div className="flex justify-center items-end">
        <Link
          href={paymentLink}
          className={cn(
            'bg-white flex-1 text-center rounded-2xl border-2 hover:border-black',

            id == 'pro' ? 'border-black' : 'opacity-50',
          )}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}

export default PricingSection;
