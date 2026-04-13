import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
};

const QA = [
  {
    q: 'Why do most AI products fail in the real world?',
    a: 'They optimize for demo performance instead of production reliability. The gap between a model that scores 90% in a notebook and a system that holds up under real, messy, high-variance data is enormous. Teams underestimate infrastructure, latency, and human behavior. Shipping a demo is easy. Keeping a system honest at scale is the actual problem.',
  },
  {
    q: 'How do you move from AI hype to measurable business impact?',
    a: 'Start with a workflow, not a technology. Pick one painful, high-volume process, define success in business terms before writing a line of code, and build a narrow AI system to attack it. Ship fast. Measure relentlessly. Expand only after the unit economics work. Companies that skip this step build impressive internal demos and nothing else.',
  },
  {
    q: 'How do you choose the right AI model, not just the most hyped one?',
    a: 'Model selection is an engineering tradeoff, not a prestige decision. Evaluate latency, context window, cost per token, reliability on your specific task, and integration fit with your existing stack. The best model is the one that solves your problem reliably at a cost you can sustain. Chasing the newest release is a distraction.',
  },
  {
    q: 'How do you protect enterprise data while moving fast with AI?',
    a: 'Speed and security are not opposites if you design with both in mind from day one. Use private deployments, classify data before granting model access, enforce strict access controls, and build audit trails early. Retrofitting trust architecture onto a fast-moving AI system is expensive and painful. Do not leave it for later.',
  },
  {
    q: 'Can AI be trusted, or do we just learn to manage its risk?',
    a: 'Trust in AI is engineered, not assumed. It comes from grounding responses in verifiable data, building evaluation pipelines, setting confidence thresholds, and designing systems that fail gracefully. The goal is not perfect AI. It is AI that fails predictably, recovers quickly, and has a human in the loop wherever the stakes are genuinely high.',
  },
  {
    q: 'How do you evaluate whether an AI system is actually performing well?',
    a: 'Build your evaluation suite before you build the product. Test for accuracy on diverse inputs, edge case handling, latency under load, and output consistency over time. If you cannot measure it, you cannot improve it and you cannot trust it in production. Evaluation is infrastructure, not an afterthought.',
  },
  {
    q: 'What should teams measure in AI beyond accuracy?',
    a: 'Accuracy is table stakes. The metrics that matter are adoption rate, task completion rate, P95 latency, cost per inference, failure mode distribution, and the actual business outcome the system was built to move. Most teams measure the model. You should measure the system, and then measure whether the system is changing the business.',
  },
  {
    q: 'Why do so many companies rush into GenAI without fixing workflows first?',
    a: 'Because GenAI is exciting and workflow redesign is hard. But AI applied to a broken process creates a faster broken process. Before adding any AI layer, map the workflow, identify where decisions happen, and understand the data driving those decisions. Fix the process first. Then add AI to amplify what already works.',
  },
  {
    q: 'Why is everyone moving toward agents, and where do agents actually make sense?',
    a: 'Agents matter where tasks require multi-step reasoning, real system interaction, and conditional decision-making at a volume humans cannot sustain. They fall apart in high-stakes, low-tolerance environments where a single wrong action cascades. The question is never whether to use agents. It is where failure is recoverable and where the cost of a mistake is acceptable.',
  },
  {
    q: 'When should AI assist humans, and when should it act autonomously?',
    a: 'Assist when stakes are high, context is ambiguous, or the cost of a wrong action is irreversible. Act autonomously when the task is well-defined, failure modes are contained, and the system has been validated across enough real-world edge cases to earn that trust. Build toward autonomy incrementally and never skip the earned trust step.',
  },
  {
    q: 'If OpenAI, Google, and Anthropic are building everything, where can smaller teams still win?',
    a: 'Foundation models are commoditizing fast. Smaller companies win in the last mile: proprietary domain data, deep workflow integration, and customer trust built over time. A vertical AI product with genuine domain depth and embedded customer workflows has a moat that no foundation model can replicate from the outside. The defensibility is in the distribution and the data loop.',
  },
  {
    q: 'What is actually defensible in AI right now?',
    a: 'Data moats, workflow depth, and earned trust. If your system improves with every customer interaction, lives inside core workflows, and has been validated against domain-specific edge cases, you have something that takes years to replicate. Speed of compounding matters more than any single model choice. Proprietary feedback loops are the real asset.',
  },
  {
    q: 'What kind of talent will survive and thrive in the AI era?',
    a: 'People who combine business judgment, systems thinking, product taste, and enough technical fluency to work directly with AI systems. The ceiling rises fast for those who can frame the right problem, pick the right tool, and ship working systems. The floor drops for people whose value is purely executing well-defined, repetitive knowledge tasks.',
  },
  {
    q: 'Why do companies fail when they hire for AI the wrong way?',
    a: 'They hire for credentials instead of judgment. They over-index on research scientists when they need ML engineers with product sense. They build AI teams that sit away from the business instead of embedded in it. And they hire before defining the problem clearly, which means the team spends the first six months debating scope.',
  },
  {
    q: 'Which roles will AI replace, compress, or elevate over the next few years?',
    a: 'Replace: repetitive knowledge work with clear rules and low variation. Compress: roles whose primary function is aggregating information or producing first drafts. Elevate: roles that require judgment, context, stakeholder management, and the ability to direct and evaluate AI systems well. The distribution is already happening faster than most organizations are tracking.',
  },
  {
    q: 'How should an enterprise actually adopt AI without creating chaos?',
    a: 'Start with a portfolio view. Map use cases by business value and implementation complexity. Pick three to four high-value, medium-complexity bets and build governance from the start. Treat AI rollout as an organizational change program, not just a tech deployment. Change management is half the work, and most enterprises ignore it entirely.',
  },
  {
    q: 'How much governance is enough without slowing innovation to death?',
    a: 'Governance should be proportional to risk. High-stakes decisions need human review, audit trails, and defined escalation paths. Low-stakes automation needs monitoring and rollback capability. A tiered framework lets you move fast on safe bets while protecting high-risk surfaces. One-size governance kills velocity and usually fails to prevent the real problems anyway.',
  },
  {
    q: 'How do you track AI systems after launch, not just before launch?',
    a: 'Build observability into the system architecture before launch. Track input drift, output distribution, latency degradation, and business outcome correlation continuously. Create feedback loops from user behavior back to model evaluation. AI systems degrade in production silently and unpredictably. If you are not instrumenting them, you are flying blind.',
  },
  {
    q: 'Why does AI feel magical in a demo and disappointing in production?',
    a: 'Because demos are curated and production is chaotic. In a demo, inputs are clean, context is controlled, and failure cases are invisible. In production, users behave unexpectedly, data is messy, and edge cases are constant. Building for demo performance is a trap that most teams fall into. Build for production robustness from the first line of code.',
  },
  {
    q: 'Is AI just a feature, or is it rewriting how businesses operate?',
    a: 'Both, and the difference is intent. If you bolt AI onto existing workflows, it is a feature and a marginal improvement. If you redesign workflows around AI capabilities, it changes your operating model, your talent mix, your decision-making speed, and your cost structure fundamentally. The companies treating AI as a feature will be outcompeted by the ones treating it as a transformation.',
  },
];

function AccordionItem({ item, index, isOpen, onToggle, inView }) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={inView ? fadeUp.animate : fadeUp.initial}
      transition={{ ...fadeUp.transition, delay: Math.min(index * 0.04, 0.5) }}
      style={{
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        transition: 'var(--transition-colors)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'opacity 150ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--color-accent)',
          letterSpacing: '0.04em',
          minWidth: 28,
          paddingTop: 3,
          flexShrink: 0,
          transition: 'var(--transition-colors)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.45,
          letterSpacing: '-0.018em',
          flex: 1,
          transition: 'var(--transition-colors)',
        }}>
          {item.q}
        </span>

        {/* Toggle icon */}
        <span style={{
          fontSize: 18,
          color: 'var(--color-text-tertiary)',
          lineHeight: 1,
          paddingTop: 2,
          flexShrink: 0,
          transition: 'transform 250ms ease, color 150ms ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'block',
        }}>
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingLeft: 44,
              paddingBottom: 20,
              paddingRight: 32,
            }}>
              <div style={{
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: 16,
                opacity: 0.9,
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '-0.008em',
                  margin: 0,
                  transition: 'var(--transition-colors)',
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AIQuestions() {
  const [ref, inView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

  // On mobile show first 10 by default, expand on demand
  const leftItems  = QA.slice(0, 10);
  const rightItems = QA.slice(10);
  const mobileVisible = showAll ? QA : QA.slice(0, 10);

  return (
    <section
      id="ai-questions"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-primary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">

        {/* Header */}
        <SectionLabel>Point of View</SectionLabel>

        <div style={{ maxWidth: 760, marginBottom: 40 }}>
          <motion.h2
            className="section-heading"
            style={{ margin: '0 0 18px' }}
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={fadeUp.transition}
          >
            The questions <em>defining AI</em> transformation.
          </motion.h2>

          <motion.p
            initial={fadeUp.initial}
            animate={inView ? fadeUp.animate : fadeUp.initial}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              margin: 0,
              letterSpacing: '-0.008em',
              transition: 'var(--transition-colors)',
            }}
          >
            These are the questions serious AI builders, operators, and enterprise leaders should be
            sitting with right now. I think about, write about, and build around these every day.
            No generic takes. No buzzword padding. Just honest, hard-earned perspective.
          </motion.p>
        </div>

        {/* Desktop: two columns. Mobile: single column, first 10 visible + show more */}
        {!isMobile ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0 56px',
            alignItems: 'start',
          }}>
            <div>
              {leftItems.map((item, i) => (
                <AccordionItem key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} inView={inView} />
              ))}
            </div>
            <div>
              {rightItems.map((item, i) => (
                <AccordionItem key={i + 10} item={item} index={i + 10} isOpen={openIndex === i + 10} onToggle={() => toggle(i + 10)} inView={inView} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {mobileVisible.map((item, i) => (
              <AccordionItem key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} inView={inView} />
            ))}

            {/* Show more / less toggle */}
            <motion.button
              onClick={() => { setShowAll(v => !v); if (showAll) setOpenIndex(null); }}
              initial={fadeUp.initial}
              animate={inView ? fadeUp.animate : fadeUp.initial}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                marginTop: 4,
                padding: '13px 0',
                background: 'var(--color-background-tertiary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--color-accent)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'var(--transition-colors)',
              }}
            >
              {showAll ? 'Show less ↑' : `Show 10 more questions ↓`}
            </motion.button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
          style={{
            marginTop: 48,
            padding: '24px 28px',
            background: 'var(--color-background-tertiary)',
            borderRadius: 'var(--border-radius-xl)',
            border: '0.5px solid var(--color-border-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            transition: 'var(--transition-colors)',
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              lineHeight: 1.5,
              margin: '0 0 4px',
              letterSpacing: '-0.018em',
              transition: 'var(--transition-colors)',
            }}>
              AI is moving fast. The winners will not be the loudest teams.
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              color: 'var(--color-text-tertiary)',
              margin: 0,
              lineHeight: 1.6,
              transition: 'var(--transition-colors)',
            }}>
              They will be the ones asking better questions and building better systems.
              If you are navigating these while building or scaling AI, let us talk.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn-accent"
            style={{ flexShrink: 0 }}
            onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start a conversation ↗
          </a>
        </motion.div>
      </div>

    </section>
  );
}
