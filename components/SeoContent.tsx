import React from 'react';

const Section: React.FC<{ title: string; emoji?: string; children: React.ReactNode; className?: string }> = ({ title, emoji, children, className = '' }) => (
  <section className={`mb-12 ${className}`}>
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
      {emoji && <span className="mr-3 text-2xl sm:text-3xl" role="img" aria-label={title}>{emoji}</span>}
      {title}
    </h2>
    <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
      {children}
    </div>
  </section>
);

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 group">
        <summary className="font-semibold text-md cursor-pointer text-slate-800 dark:text-slate-200 list-none flex justify-between items-center transition-colors hover:text-sky-600 dark:hover:text-sky-400">
            {question}
            <svg className="w-5 h-5 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </summary>
        <div className="mt-3 text-slate-600 dark:text-slate-400">
            {children}
        </div>
    </details>
);

const StyledTable: React.FC<{ headers: string[]; data: (string|number)[][]; note?: string }> = ({ headers, data, note }) => (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-700/80">
                <tr>
                    {headers.map(h => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="bg-white dark:bg-slate-800 border-b last:border-b-0 dark:border-slate-700">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? 'font-medium text-slate-800 dark:text-slate-200' : ''}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-b-lg border-t border-slate-200 dark:border-slate-700">{note}</p>}
    </div>
);


export const SeoContent: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-in-out]">
            <header className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">
                    ⚡ TNEB Bill Calculator – Tamil Nadu Electricity Bill Estimator (2025)
                </h1>
            </header>

            <Section title="What is the TNEB Bill Calculator?" emoji="🔍">
                <p>The <strong>TNEB Bill Calculator</strong> (Tamil Nadu Electricity Board Bill Calculator) helps consumers easily <strong>calculate their bi-monthly TANGEDCO electricity bill</strong> online based on <strong>units consumed (kWh)</strong>. It uses the <strong>latest Tamil Nadu EB tariff rates (2025)</strong> to estimate your <strong>total electricity charges</strong>, including <strong>energy charges and subsidies</strong>.</p>
                <p>Whether you're a <strong>domestic user, commercial shop owner, or industrial customer</strong>, this calculator gives you an <strong>accurate electricity bill estimate</strong> in seconds.</p>
            </Section>

            <Section title="How to Use the TNEB Bill Calculator" emoji="💡">
                <p>Follow these simple steps to calculate your Tamil Nadu electricity bill:</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li><strong>Enter total units consumed (kWh)</strong> — as shown in your EB meter reading.</li>
                    <li>The calculator automatically applies the domestic tariff rates.</li>
                    <li>Click <strong>“Calculate Bill”</strong>.</li>
                    <li>Instantly get your <strong>estimated TNEB bill amount</strong> with detailed charge breakdown.</li>
                </ol>
                <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p>👉 <strong>Example:</strong> If you consumed <strong>450 units</strong>, the calculator will show your <strong>energy charges</strong>, <strong>subsidy</strong>, and <strong>net payable bill</strong>.</p>
                </div>
            </Section>
            
            <Section title="TNEB Tariff Rates (Domestic – 2025)" emoji="📊">
                <StyledTable 
                    headers={['Units Consumed', 'Tariff Rate (₹/Unit)', 'Remarks']}
                    data={[
                        ['0 – 100 Units', 'Free', 'Government subsidy'],
                        ['101 – 200 Units', '₹2.25', 'Subsidized rate'],
                        ['201 – 400 Units', '₹4.50', 'Medium slab'],
                        ['401 – 500 Units', '₹6.00', 'Higher slab'],
                        ['Above 500 Units', '₹8.00', 'Standard rate'],
                    ]}
                    note="⚠️ *Note: Tariff rates are subject to TANGEDCO updates."
                />
            </Section>

            <Section title="Example Calculation" emoji="🧮">
                <p><strong>If you consumed 350 units:</strong></p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>First 100 units – <strong>Free</strong></li>
                    <li>Next 100 units @ ₹2.25 = ₹225</li>
                    <li>Next 150 units @ ₹4.50 = ₹675</li>
                </ul>
                <p className="mt-2 text-lg font-bold text-slate-800 dark:text-slate-100">✅ Total Bill = ₹900</p>
            </Section>

            <Section title="Features of Our TNEB Bill Calculator" emoji="⚙️">
                <ul className="list-disc list-inside space-y-2 grid sm:grid-cols-2 gap-x-6">
                    <li>✅ Based on <strong>latest TANGEDCO tariff</strong></li>
                    <li>✅ <strong>Fast and accurate</strong> online calculation</li>
                    <li>✅ Designed for <strong>domestic connections</strong></li>
                    <li>✅ Includes <strong>subsidy calculation</strong></li>
                    <li>✅ <strong>Mobile-friendly & responsive</strong></li>
                    <li>✅ <strong>No login required</strong></li>
                </ul>
            </Section>

            <Section title="FAQs About TNEB Bill Calculator" emoji="💬">
                <FaqItem question="Q1. How is the TNEB bill calculated?">
                    <p>A: The TNEB bill is calculated based on the <strong>number of units consumed</strong>, multiplied by the <strong>tariff rate per slab</strong>, plus any applicable taxes.</p>
                </FaqItem>
                <FaqItem question="Q2. What is the free unit limit in Tamil Nadu?">
                    <p>A: Tamil Nadu domestic consumers get <strong>100 units free</strong> every billing cycle.</p>
                </FaqItem>
                <FaqItem question="Q3. What is the TNEB rate for 1 unit?">
                    <p>A: The rate starts from ₹2.25 per unit (after 100 free units) and goes up to ₹8.00 per unit for higher slabs, based on the simplified 2025 tariff example.</p>
                </FaqItem>
                <FaqItem question="Q4. Can I use this calculator for commercial connections?">
                    <p>A: This calculator is pre-configured for domestic connections. Commercial tariffs differ.</p>
                </FaqItem>
                 <FaqItem question="Q5. How can I reduce my EB bill in Tamil Nadu?">
                    <p>A: Use energy-efficient appliances, switch to LED bulbs, and reduce usage during peak hours.</p>
                </FaqItem>
            </Section>

            <Section title="Test Your EB Knowledge" emoji="🧩" className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <p className="mb-4 font-medium">1️⃣ How many free units are available for domestic users in Tamil Nadu?</p>
                <p className="pl-4 mb-4 text-slate-500 dark:text-slate-400">a) 50<br/>b) 100<br/>c) 150</p>
                <p className="mb-4 font-medium">2️⃣ What is the EB rate for units above 500 (in the example)?</p>
                <p className="pl-4 mb-4 text-slate-500 dark:text-slate-400">a) ₹6<br/>b) ₹8<br/>c) ₹9</p>
                <p className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-600">👉 <strong>Answers:</strong><br/>✅ 1 – b) 100 units<br/>✅ 2 – b) ₹8 per unit</p>
            </Section>
            
            <Section title="Final Thoughts" emoji="🚀">
                <p>The <strong>TNEB Bill Calculator</strong> is your <strong>go-to online tool</strong> for understanding and managing electricity expenses in Tamil Nadu. It’s quick, accurate, and updated with the <strong>latest TANGEDCO tariff rates</strong>. Start using it now to <strong>plan your energy usage, avoid surprises</strong>, and <strong>track your bi-monthly consumption smartly</strong>.</p>
            </Section>
        </div>
    );
};