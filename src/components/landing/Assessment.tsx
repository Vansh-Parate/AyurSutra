import React, { useMemo, useState } from 'react';

type DoshaScores = { vata: number; pitta: number; kapha: number };

type ChoiceOption = {
	label: string;
	tag: 'Vata' | 'Pitta' | 'Kapha';
	info: string;
	score: DoshaScores;
};

type SliderQuestion = {
	section: 'Physical' | 'Mental' | 'Lifestyle';
	title: string;
	subtitle: string;
	type: 'slider';
	min: number;
	max: number;
	value: number;
	scaleLabels: [string, string, string];
	scoreMap: (val: number) => DoshaScores;
};

type ChoiceQuestion = {
	section: 'Physical' | 'Mental' | 'Lifestyle';
	title: string;
	subtitle: string;
	type: 'choice';
	options: ChoiceOption[];
};

type Question = SliderQuestion | ChoiceQuestion;

const questions: Question[] = [
	{
		section: 'Physical',
		title: 'Body frame',
		subtitle: 'Choose the figure that feels most like you.',
		type: 'choice',
		options: [
			{ label: 'Light & lean', tag: 'Vata', info: 'Vata: air + ether; light and mobile.', score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Medium & athletic', tag: 'Pitta', info: 'Pitta: fire + water; sharp and warm.', score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Sturdy & grounded', tag: 'Kapha', info: 'Kapha: earth + water; steady and cool.', score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Physical',
		title: 'Skin & temperature',
		subtitle: 'Notice your baseline skin feel and warmth.',
		type: 'choice',
		options: [
			{ label: 'Dry, cool hands', tag: 'Vata', info: 'Dryness and coolness align with Vata.', score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Warm, may flush', tag: 'Pitta', info: 'Warmth and flushing align with Pitta.', score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Smooth, cool/moist', tag: 'Kapha', info: 'Moisture and coolness align with Kapha.', score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Physical',
		title: 'Appetite rhythm',
		subtitle: 'From gentle to intense hunger.',
		type: 'slider',
		min: 1, max: 5, value: 3,
		scaleLabels: ['Gentle', 'Steady', 'Strong'],
		scoreMap: (val: number) => {
			if (val <= 2) return { vata: 2, pitta: 0, kapha: 0 };
			if (val === 3) return { vata: 0, pitta: 0, kapha: 2 };
			return { vata: 0, pitta: 2, kapha: 0 };
		}
	},
	{
		section: 'Mental',
		title: 'Mind pace',
		subtitle: 'How does your mind usually flow?',
		type: 'choice',
		options: [
			{ label: 'Quick & creative', tag: 'Vata', info: 'Vata minds are imaginative and fast.', score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Sharp & driven', tag: 'Pitta', info: 'Pitta minds are analytical and focused.', score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Calm & steady', tag: 'Kapha', info: 'Kapha minds are tranquil and consistent.', score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Mental',
		title: 'Emotional tendency',
		subtitle: 'What arises most often under stress?',
		type: 'choice',
		options: [
			{ label: 'Worry or restlessness', tag: 'Vata', info: 'Vata can increase anxiety and movement.', score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Irritability or heat', tag: 'Pitta', info: 'Pitta can increase intensity and heat.', score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Withdrawal or heaviness', tag: 'Kapha', info: 'Kapha can increase inertia and attachment.', score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Mental',
		title: 'Sleep quality',
		subtitle: 'How would you describe your sleep most nights?',
		type: 'slider',
		min: 1, max: 5, value: 3,
		scaleLabels: ['Light', 'Average', 'Deep'],
		scoreMap: (val: number) => {
			if (val <= 2) return { vata: 2, pitta: 0, kapha: 0 };
			if (val === 3) return { vata: 0, pitta: 2, kapha: 0 };
			return { vata: 0, pitta: 0, kapha: 2 };
		}
	},
	{
		section: 'Lifestyle',
		title: 'Climate preference',
		subtitle: 'Which environment do you naturally choose?',
		type: 'choice',
		options: [
			{ label: 'Warm & humid', tag: 'Vata', info: "Warmth helps balance Vata's cool quality.", score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Cool & fresh air', tag: 'Pitta', info: "Coolness soothes Pitta's heat.", score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Dry & bright', tag: 'Kapha', info: "Dryness lightens Kapha's heaviness.", score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Lifestyle',
		title: 'Activity style',
		subtitle: 'Your movement rhythm most days.',
		type: 'choice',
		options: [
			{ label: 'Spontaneous bursts', tag: 'Vata', info: 'Irregular, playful movement.', score: { vata: 2, pitta: 0, kapha: 0 } },
			{ label: 'Intense & competitive', tag: 'Pitta', info: 'Goal-driven and fiery.', score: { vata: 0, pitta: 2, kapha: 0 } },
			{ label: 'Steady endurance', tag: 'Kapha', info: 'Consistent and grounded.', score: { vata: 0, pitta: 0, kapha: 2 } },
		]
	},
	{
		section: 'Lifestyle',
		title: 'Routine consistency',
		subtitle: 'From flexible to structured.',
		type: 'slider',
		min: 1, max: 5, value: 3,
		scaleLabels: ['Fluid', 'Balanced', 'Structured'],
		scoreMap: (val: number) => {
			if (val <= 2) return { vata: 2, pitta: 0, kapha: 0 };
			if (val === 3) return { vata: 0, pitta: 2, kapha: 0 };
			return { vata: 0, pitta: 0, kapha: 2 };
		}
	}
];

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

const Assessment: React.FC = () => {
	const [index, setIndex] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [dosha, setDosha] = useState<DoshaScores>({ vata: 0, pitta: 0, kapha: 0 });
	const [showResults, setShowResults] = useState(false);

	const totalQ = questions.length;
	const current = questions[index];

	const journeyPct = Math.round((index / totalQ) * 100);

	const sectionColor = useMemo(() => {
		const map: Record<string, string> = {
			Physical: '#2563eb',
			Mental: '#059669',
			Lifestyle: '#92400e'
		};
		return map[current?.section] || '#2563eb';
	}, [current]);

	function applySelection() {
		if (!current) return;
		if (current.type === 'choice') {
			const opt = selected != null ? current.options[selected] : undefined;
			if (opt) setDosha(d => ({ vata: d.vata + opt.score.vata, pitta: d.pitta + opt.score.pitta, kapha: d.kapha + opt.score.kapha }));
		} else {
			const val = clamp(selected ?? current.value, current.min, current.max);
			const s = current.scoreMap(val);
			setDosha(d => ({ vata: d.vata + s.vata, pitta: d.pitta + s.pitta, kapha: d.kapha + s.kapha }));
		}
	}

	function onNext() {
		applySelection();
		const next = index + 1;
		if (next >= totalQ) {
			setShowResults(true);
		} else {
			setIndex(next);
			setSelected(null);
		}
	}

	function onBack() {
		if (index === 0) return;
		setIndex(i => Math.max(0, i - 1));
	}

	function onNotSure() {
		setDosha(d => ({ vata: d.vata + 1, pitta: d.pitta + 1, kapha: d.kapha + 1 }));
		onNext();
	}

	function dominantDosha(): 'Vata' | 'Pitta' | 'Kapha' {
		const { vata, pitta, kapha } = dosha;
		const max = Math.max(vata, pitta, kapha);
		if (max === vata) return 'Vata';
		if (max === pitta) return 'Pitta';
		return 'Kapha';
	}

	const vPct = useMemo(() => {
		const total = dosha.vata + dosha.pitta + dosha.kapha || 1;
		return Math.round((dosha.vata / total) * 100);
	}, [dosha]);
	const pPct = useMemo(() => {
		const total = dosha.vata + dosha.pitta + dosha.kapha || 1;
		return Math.round((dosha.pitta / total) * 100);
	}, [dosha]);
	const kPct = useMemo(() => {
		const total = dosha.vata + dosha.pitta + dosha.kapha || 1;
		return Math.round((dosha.kapha / total) * 100);
	}, [dosha]);

	const dom = dominantDosha();

	return (
		<section id="assessment" className="relative mt-16 sm:mt-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="rounded-2xl bg-white ring-1 ring-zinc-200 overflow-hidden">
					<div className="relative px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-r from-[#f8fafc] via-white to-[#f8fafc]">
						<div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
							<div>
								<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1f2937]">Dosha Assessment</h2>
								<p className="mt-1 text-sm text-zinc-600">A Digital Sage’s Journey — discover your unique constitution with gentle guidance.</p>
							</div>
							<div className="sm:min-w-[320px]">
								<div className="flex items-center gap-3">
									<div className="flex-1 h-2 rounded-full bg-[#e2e8f0] overflow-hidden">
										<div className="h-2 rounded-full bg-gradient-to-r from-[#2563eb] via-[#059669] to-[#92400e] transition-all duration-500" style={{ width: `${showResults ? 100 : journeyPct}%` }}></div>
									</div>
									<span className="text-xs text-zinc-600 min-w-[30px] text-right">{showResults ? 100 : journeyPct}%</span>
								</div>
								<div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
									<span>Physical</span><span>Mental</span><span>Lifestyle</span><span>Reveal</span>
								</div>
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-12 gap-0">
						<aside className="lg:col-span-3 hidden lg:flex flex-col gap-4 p-6 border-r border-zinc-200">
							<div className="rounded-lg ring-1 ring-zinc-200 p-4">
								<div className="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#2563eb]"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z"/></svg>
									<span className="text-sm font-medium text-[#1f2937]">Your journey</span>
								</div>
								<div className="mt-3 space-y-3">
									<div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full" style={{ background: '#2563eb' }}></div><span className="text-xs text-zinc-600">Physical characteristics</span></div>
									<div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full" style={{ background: index >= 3 ? '#059669' : '#d4d4d8' }}></div><span className="text-xs text-zinc-600">Mental & emotional</span></div>
									<div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full" style={{ background: index >= 6 ? '#92400e' : '#d4d4d8' }}></div><span className="text-xs text-zinc-600">Lifestyle & preferences</span></div>
									<div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full" style={{ background: showResults ? '#111827' : '#d4d4d8' }}></div><span className="text-xs text-zinc-600">Grand reveal</span></div>
								</div>
							</div>
							<div className="rounded-lg ring-1 ring-zinc-200 p-4">
								<div className="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#059669]"><path d="M3 12a9 9 0 1 0 18 0"/></svg>
									<span className="text-sm font-medium text-[#1f2937]">Dosha energies</span>
								</div>
								<div className="mt-3 space-y-3">
									<div>
										<div className="flex items-center justify-between text-xs text-zinc-600"><span>Vata</span><span>{vPct}%</span></div>
										<div className="mt-1 h-2 w-full rounded bg-zinc-100"><div className="h-2 rounded" style={{ width: `${vPct}%`, background: '#2563eb' }}></div></div>
									</div>
									<div>
										<div className="flex items-center justify-between text-xs text-zinc-600"><span>Pitta</span><span>{pPct}%</span></div>
										<div className="mt-1 h-2 w-full rounded bg-zinc-100"><div className="h-2 rounded" style={{ width: `${pPct}%`, background: '#92400e' }}></div></div>
									</div>
									<div>
										<div className="flex items-center justify-between text-xs text-zinc-600"><span>Kapha</span><span>{kPct}%</span></div>
										<div className="mt-1 h-2 w-full rounded bg-zinc-100"><div className="h-2 rounded" style={{ width: `${kPct}%`, background: '#059669' }}></div></div>
									</div>
								</div>
							</div>
						</aside>

						<section className="lg:col-span-6 p-6 sm:p-8">
							{!showResults && (
								<div className="space-y-4">
									<div className="flex items-center gap-2 text-xs text-zinc-500">
										<span className="inline-flex items-center gap-1 rounded-full bg-[#f8fafc] px-2 py-1 ring-1 ring-[#e2e8f0]" style={{ color: sectionColor }}>
											<span className="h-1.5 w-1.5 rounded-full" style={{ background: sectionColor }}></span>
											{current.section}
										</span>
										<span aria-hidden="true">•</span>
										<span>Question {index + 1} of {totalQ}</span>
									</div>

									<div className="rounded-xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-sm">
										<h3 className="text-xl font-semibold tracking-tight text-[#1f2937]">{current.title}</h3>
										<p className="mt-1 text-sm text-zinc-600">{current.subtitle}</p>
										<div className="mt-4 grid gap-3">
											{current.type === 'choice' && (
												<div className="grid sm:grid-cols-3 gap-3">
													{current.options.map((opt, idx) => (
														<button
															key={opt.label}
															type="button"
															className={`group relative text-left rounded-lg ring-1 ring-zinc-200 transition p-3 flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${selected === idx ? 'bg-emerald-50 ring-emerald-300' : 'hover:ring-emerald-200 hover:bg-emerald-50/40'}`}
															onClick={() => setSelected(idx)}
														>
															<span className="inline-flex shrink-0 items-center justify-center h-7 w-7 rounded-full ring-1 ring-zinc-200 bg-white text-[11px] font-medium text-zinc-700">{opt.tag[0]}</span>
															<div className="min-w-0">
																<div className="text-sm font-medium text-zinc-800">{opt.label}</div>
																<div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> {opt.tag}</div>
															</div>
														</button>
													))}
												</div>
											)}
											{current.type === 'slider' && (
												<div className="space-y-3">
													<input type="range" min={current.min} max={current.max} defaultValue={current.value} onChange={(e) => setSelected(parseInt(e.target.value, 10))} className="w-full accent-emerald-600" aria-label="Adjust value" />
													<div className="text-xs text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100 inline-flex items-center gap-1 px-2 py-1 rounded"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> {String(selected ?? current.value)}</div>
													<div className="flex items-center justify-between text-[11px] text-zinc-500"><span>{current.scaleLabels[0]}</span><span>{current.scaleLabels[1]}</span><span>{current.scaleLabels[2]}</span></div>
												</div>
											)}
										</div>
										<div className="mt-5 flex items-center justify-between">
											<button onClick={onBack} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none" disabled={index === 0}>Back</button>
											<div className="flex items-center gap-2">
												<button onClick={onNotSure} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#2563eb] ring-1 ring-[#e2e8f0] hover:bg-[#f8fafc]">Not sure</button>
												<button onClick={onNext} className="inline-flex items-center gap-2 rounded-md bg-[#059669] px-3.5 py-2 text-sm font-medium text-white ring-1 ring-[#059669]/80 hover:bg-[#047857]" disabled={selected == null && current.type === 'choice'}>
													Next
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</section>

						{showResults && (
							<div className="space-y-3">
								<div className="rounded-xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-sm">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-xl font-semibold tracking-tight text-[#1f2937]">Your Dosha Mandala</h3>
											<p className="mt-1 text-sm text-zinc-600">A snapshot of your Vata, Pitta, and Kapha energies.</p>
										</div>
										<span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ring-zinc-200 bg-[#f8fafc] text-zinc-700">Dominant: {dom}</span>
									</div>
									<div className="mt-4 grid gap-6 lg:grid-cols-2">
										<div className="rounded-lg ring-1 ring-zinc-200 p-3">
											<div className="p-2">
												<div className="rounded-md bg-[#f8fafc] ring-1 ring-[#e2e8f0] p-3">
													<div className="text-sm text-zinc-600">Energy distribution</div>
													<div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
														<div className="rounded-md bg-white ring-1 ring-zinc-200 p-2"><div className="text-zinc-600">Vata</div><div className="mt-1 font-semibold text-emerald-700">{vPct}%</div></div>
														<div className="rounded-md bg-white ring-1 ring-zinc-200 p-2"><div className="text-zinc-600">Pitta</div><div className="mt-1 font-semibold text-emerald-700">{pPct}%</div></div>
														<div className="rounded-md bg-white ring-1 ring-zinc-200 p-2"><div className="text-zinc-600">Kapha</div><div className="mt-1 font-semibold text-emerald-700">{kPct}%</div></div>
													</div>
												</div>
											</div>
										</div>
										<div className="space-y-3">
											<div className="rounded-lg ring-1 ring-zinc-200 p-4 bg-[#f8fafc]">
												<h4 className="text-[15.5px] font-semibold tracking-tight text-[#1f2937]">Personalized guidance</h4>
												<p className="mt-2 text-sm text-zinc-600">Your tailored lifestyle and nutrition tips will appear here.</p>
											</div>
											<div className="rounded-lg ring-1 ring-zinc-200 p-4">
												<div className="flex items-center gap-2 text-sm text-zinc-700">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-[#2563eb]"><path d="M3 4h18M3 12h18M3 20h18"/></svg>
													Explore your results deeply
												</div>
												<ul className="mt-2 space-y-1.5 text-[13px] text-zinc-600">
													<li>Sleep, movement, and diet recommendations tuned to your constitution.</li>
													<li>Mindfulness practices to balance energies.</li>
													<li>Seasonal tips that adapt through the year.</li>
												</ul>
											</div>
											<div className="flex items-center gap-2">
												<a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-[#059669] px-3.5 py-2 text-sm font-medium text-white ring-1 ring-[#059669]/80 hover:bg-[#047857]">Book a consultation</a>
												<button onClick={() => { setIndex(0); setSelected(null); setDosha({ vata: 0, pitta: 0, kapha: 0 }); setShowResults(false); }} className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium text-[#2563eb] ring-1 ring-[#e2e8f0] hover:bg-[#f8fafc]">Retake</button>
											</div>
										</div>
								</div>
								<p className="mt-3 text-[12.5px] text-zinc-500">Save to your profile and receive evolving recommendations.</p>
							</div>
						</div>
						)}

						<aside className="lg:col-span-3 p-6 border-t lg:border-t-0 border-zinc-200">
							<div className="rounded-xl ring-1 ring-zinc-200 p-5 bg-[#f8fafc]">
								<div className="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#92400e]"><path d="M2 12h20"/></svg>
									<span className="text-sm font-medium text-[#1f2937]">Seasonal lens</span>
								</div>
								<p className="mt-2 text-[13px] text-zinc-600">Visuals adapt as your energies unfold.</p>
								<div className="mt-3 h-28 rounded-lg bg-white ring-1 ring-zinc-200 flex items-center justify-center">
									<div className="flex items-center gap-2 text-[12.5px] text-zinc-600">
										<div className="h-3 w-3 rounded-full" style={{ background: sectionColor, opacity: 0.7 }}></div>
										<span>{dom} vibe</span>
									</div>
								</div>
							</div>
							<div className="mt-4 rounded-xl ring-1 ring-zinc-200 p-5">
								<div className="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#2563eb]"><path d="M12 2v20"/></svg>
									<span className="text-sm font-medium text-[#1f2937]">Tip</span>
								</div>
								<p className="mt-2 text-[13px] text-zinc-600">Long-press on options to learn more about Sanskrit terms.</p>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Assessment;
