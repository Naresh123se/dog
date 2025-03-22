import { useState } from "react";

function FaqItem({ question, answer, isOpenInitially = false }) {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold mb-2">{question}</h3>
        <span className="text-xl font-bold">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <p className="text-gray-600 mt-2">{answer}</p>}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <FaqItem
            question="What services do you offer?"
            answer="We offer a comprehensive range of pet care services including grooming, training, boarding, day care, and veterinary services."
            isOpenInitially={true} // First item open by default
          />
          <FaqItem
            question="How often should I groom my pet?"
            answer="The frequency of grooming depends on your pet's breed and coat type. Generally, we recommend professional grooming every 4-8 weeks."
          />
          <FaqItem
            question="Do you offer emergency services?"
            answer="Yes, we provide 24/7 emergency veterinary services for registered pets."
          />
          <FaqItem
            question="What are your boarding facilities like?"
            answer="Our boarding facilities feature spacious, climate-controlled rooms, regular exercise areas, and 24/7 monitoring."
          />
        </div>
      </div>
    </section>
  );
}
