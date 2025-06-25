import { BrainCircuit, FileOutput, FileText } from 'lucide-react';
import { ReactNode } from 'react';

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const Steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: 'Upload your PDF',
    description: 'Simply drag & drop you PDF or upload click to upload',
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: 'AI Analysis',
    description: 'Our advanced AI processes and analyzes your document',
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: 'Get Summary',
    description: 'Receive a clear, concise summary of your document',
  },
];

function HowItWorksSection() {
  return (
    <section className="relative px-5 py-5">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="font-bold uppercase">How it works</h2>
        <h3>
          Transform any PDF into an easy-to-digest summary in three simple steps
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {Steps.map((step, idx) => (
          <StepItem key={idx} {...step} />
        ))}
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-6 rounded-2xl flex flex-col items-center justify-center text-center">
      <div className="bg-gray-300 rounded-2xl p-2"> {icon}</div>
      <h4 className="font-bold">{label}</h4>
      <p>{description}</p>
    </div>
  );
}

export default HowItWorksSection;
