import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import Lightbox from '../components/Lightbox';
import SwipeDots from '../components/SwipeDots';

const easeStd = [0.25, 0.1, 0.25, 1];
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: easeStd } };

// ── DATA ──────────────────────────────────────────────────────────────────────

const COMPANIES = [
  {
    id: 'pmgpt',
    categories: ['enterprise', 'building'],
    year: '2025–',
    active: true,
    employmentType: 'Part-time',
    name: 'pmGPT',
    logo: '/pmgpt-logo.png',
    brandColor: '#7c3aed',
    website: 'https://pmgpt.ai',
    role: 'Passion Project',
    description: 'An AI-native operating system for product teams, orchestrating the entire lifecycle from research and PRDs to sprint execution through agentic workflows. It leverages integrations, RAG, and MCPs to turn fragmented tools and data into a unified, intelligent execution layer.',
    roleNarrative: 'I\'m building this end to end as a passion project, initially to explore vibe coding with Claude Code on real product problems I was facing as a product leader. What started as an experiment evolved into a well-structured system where I independently own everything from product design and agent definition to system architecture and hands-on development. The architectural choices I\'ve made, including the six-agent structure, three-tier LLM routing, and a privacy-first governance layer, were deliberate decisions to ensure the system is enterprise-ready from day one and not just functional. Building across the full stack has sharpened my instincts for where AI-native product design diverges from traditional software thinking, particularly around context management, agentic state persistence, and user trust in autonomous systems.',
    caseStudies: [],
    ratings: [],
    products: [
      {
        id: 'pmgpt-platform',
        name: 'pmGPT Platform',
        businessTags: ['B2B', 'SaaS'],
        headline: 'Six-agent architecture with three-tier LLM routing — privacy-first from day one.',
        tags: [
          { label: 'Building Now', cls: 'tag-green' },
          { label: 'Claude · GPT-4o · Gemini', cls: 'tag-amber' },
          { label: 'React · Vite · n8n', cls: 'tag-teal' },
        ],
        artifacts: [
          { type: 'video', label: 'Demo video', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
          { type: 'image', label: 'Architecture diagram', color: 'var(--color-background-tertiary)' },
          { type: 'pdf', label: 'Pitch deck', color: '#faece7' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Six specialist agents — Research, PRD, Roadmap, Stakeholder Comms, Retrospective, Discovery',
          'Three-tier LLM routing — routes tasks to Claude, GPT-4o, or Gemini by cost and capability',
          'Governance & anonymization layer — strips PII before any LLM call',
          'RAG with RBAC — context-aware retrieval gated by user role',
          'Connector plugin system — Jira, Notion, Confluence, Slack out of the box',
          'Privacy-first — on-prem and air-gapped deployment options',
        ],
        caseStudies: [],
        ratings: [],
        problem: '~2M PM practitioners spend 60%+ of their time on coordination and documentation rather than strategic product thinking.',
        decision: 'Six-agent architecture with three-tier LLM routing, a governance/anonymization layer, RAG with RBAC, and a connector plugin system. Privacy-first from day one — designed for enterprise procurement.',
        learnings: 'Vibe coding with Claude Code is genuinely productive for complex system architecture. Maintaining context across long agentic sessions is the real engineering challenge. AI-native product design requires rethinking every user interaction from first principles — existing UX patterns do not map cleanly.',
        lastStatus: 'Active · Building and iterating solo. Seeking early design partners and pilot customers.',
        outcomes: [
          { num: '~2M', label: 'target PM practitioners' },
          { num: '6', label: 'specialist agents' },
          { num: '3-tier', label: 'LLM routing' },
          { num: 'Privacy', label: 'first by design' },
        ],
      },
    ],
  },

  {
    id: 'retailabs',
    categories: ['building'],
    year: '2025–',
    active: true,
    employmentType: 'Part-time',
    name: 'Retailabs.AI',
    logo: null,
    brandColor: '#0ea5e9',
    website: '#',
    role: 'Co-Founder / Building',
    description: 'Details coming soon.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },

  {
    id: 'photai',
    categories: ['enterprise', 'consumer', 'consulting'],
    year: '2025–26',
    active: false,
    employmentType: 'Consulting',
    name: 'Phot.AI',
    logo: '/phot-logo-long.svg',
    brandColor: '#7c3aed',
    website: 'https://phot.ai',
    role: 'Product Consultant',
    description: 'A GenAI-powered creative automation platform that enables brands to generate, test, and scale high-performing marketing and catalog creatives through intelligent workflows, combining product data, market signals, and AI-driven design.',
    roleNarrative: 'My role was to drive product thinking and execution across the platform, shaping it from a creative tool into a performance-driven system. I worked on translating real customer and market problems into scalable workflows, while actively contributing to sales through demos, client conversations, and positioning the product to drive adoption and business outcomes. A key contribution was reframing the product narrative by shifting the conversation from creative quality to measurable performance outcomes like ROAS and CPA, which proved decisive in enterprise deals. I also helped define the roadmap for AngleLab and ListingLab, working directly with customers to validate use cases and move the platform toward a full performance marketing intelligence layer.',
    caseStudies: [{
        title: 'GreenGainz',
        logo: '/automation-anywhere.jpg',
        result: 'Reduced CPA by 47% and achieved ~3.5x ROAS for GreenGainz by using AI-driven creative testing to identify and scale proof-based ad angles, focusing on comparisons, testimonials, and real user outcomes over brand-led storytelling.',
        href: 'https://www.phot.ai/case-studies/anglelab/greengainz',
      },
      {
        title: 'Home Crayons',
        logo: '/accela.png',
        result: 'Helped HomeCrayons achieve 4.41x ROAS by using AI-driven creative testing to identify and scale emotion-first ad angles, shifting focus from product features to customer-centric storytelling and improving conversions.',
        href: 'https://www.phot.ai/case-studies/anglelab/homecrayons',
      },
      {
        title: 'Chumbak',
        logo: '/accela.png',
        result: 'Helped Chumbak launch 50 SKUs on Walmart within a week by transforming a single image into fully compliant, enriched listings, resulting in 80% faster GTM and 45% higher conversion rates, while eliminating design dependency and compliance issues.',
        href: 'https://www.phot.ai/case-studies/listinglab/chumbak',
      }],
    ratings: [],
    businessImpact: [
      { num: '~4x', label: 'increase in ROAS', level: 'up' },
          { num: '80%', label: 'faster GTM', level: 'up'  },
          { num: '45%', label: 'more conversions', level: 'up'  },
          { num: '47%', label: 'reduction in CPA' , level: 'down' }],
    products: [
      {
        id: 'photai-platform',
        name: 'Phot.AI Platform',
        businessTags: ['B2B', 'B2C', 'SaaS'],
        headline: '30+ AI tools for instant content creation and high-quality product visuals — built for creators and D2C brands.',
        tags: [
          { label: 'Gen AI', cls: 'tag-green' },
          { label: 'D2C', cls: 'tag-amber' },
          { label: 'Creator Tools', cls: 'tag-purple' },
        ],
        artifacts: [],
        businessImpact: [],
        keyFeatures: [
          '30+ AI-powered tools for content creation',
          'High-quality product visuals for D2C brands',
          'GenAI-powered image generation and editing workflows',
          'Instant content creation without design expertise',
          'SaaS platform scalable for creators and enterprise brands',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Creators and D2C brands needed affordable, fast, high-quality AI-powered visual content tools without requiring design expertise or large production budgets.',
        decision: 'Built and scaled a GenAI-powered SaaS platform with 30+ AI tools covering instant content creation and product visual generation, purpose-built for creators and D2C brands.',
        learnings: 'Positioning a creative AI tool as a performance marketing engine — not just a design tool — dramatically changes the buyer conversation. ROI metrics like ROAS and CPA beat aesthetic quality claims in every sales conversation. The D2C segment moves fast; iteration speed matters more than feature depth early on.',
        lastStatus: 'Consulting engagement ended · Product continues to scale at Phot.AI with a growing customer base.',
        outcomes: [
          { num: '~4x', label: 'increase in ROAS' },
          { num: '80%', label: 'faster GTM' },
          { num: '45%', label: 'higher conversion rates' },
          { num: '47%', label: 'reduction in CPA' }
        ],
      },
    ],
  },

  {
    id: 'searchunify',
    categories: ['enterprise', 'fulltime'],
    year: '2024–25',
    active: false,
    employmentType: 'Full-time',
    name: 'SearchUnify',
    logo: '/searchunify-logo.png',
    brandColor: '#F08702',
    website: 'https://searchunify.com',
    featuredLayout: true,
    businessImpact: [
      { num: '32%', label: 'ARR growth', direction: 'up' },
      { num: '87%', label: 'Self-serve deflection', direction: 'up' },
      { num: '77%', label: 'Closed cases lift', direction: 'up' },
      { num: '4.5+ ★', label: 'G2 Leader score', direction: 'up' },
    ],
    role: 'Senior Product Manger (Interim Head of Product)',
    description: 'Gartner-recognized AI platform powering agentic workflows, autonomous agents, co-pilots, enterprise search for support and sales automation across Fortune 200 enterprises.',
    roleNarrative: 'Although my official title at SearchUnify was Senior Product Manager, in practice I operated as the product lead for the company\'s AI transformation, reporting directly to the CTO. I drove the journey from enterprise search to 360° customer support automation and into the Agentic AI Suite, while shaping how agentic capabilities could extend into other business functions. My scope covered product strategy, conceptualization, execution, cross-functional alignment, customer and sales conversations, leadership communication, and team management, effectively functioning at a Head of Product level for the AI portfolio. I partnered closely with the executive team on analyst relations, contributing to Forrester, IDC, and G2 evaluations, and helped shape the go-to-market positioning that underpinned the company\'s 32% ARR growth and five consecutive years of G2 Leadership recognition.',
    caseStudies: [
      {
        title: 'Automation Anywhere',
        logo: '/automation-anywhere.jpg',
        result: 'Automation Anywhere, a global RPA leader, boosted knowledge creation by 57%, increased contributors by 37%, and cut publishing time by 46% with AI-driven content automation.',
        href: 'https://www.searchunify.com/resource-center/success-story/how-automation-anywhere-is-winning-at-user-experience-with-searchunify/',
      },
      {
        title: 'Accela',
        logo: '/accela.png',
        result: 'Accela, a leading provider of cloud-based civic solutions, boosted case resolution by 77.5%, reduced first response time by 92.7%, and improved agent productivity by 16% using AI-powered agent assistance.',
        href: 'https://www.searchunify.com/resource-center/success-story/accela-scales-support-efficiency-and-decrease-first-response-time-by-92/',
      },
      {
        title: 'Cornerstone OnDemand',
        logo: null,
        result: 'Cornerstone OnDemand, a global leader in talent management software, achieved 98% self-service resolution, improved CSAT by 5%, and increased same-day resolutions by 9% using AI-driven knowledge and search automation.',
        href: 'https://www.searchunify.com/resource-center/success-story/how-cornerstone-ondemand-achieved-a-98-self-service-resolution-rate-with-searchunify/',
      },
      {
        title: 'EBSCO',
        logo: null,
        result: 'EBSCO, a leading provider of research and eLearning content, drove 125.8% growth in content views and improved content discoverability and user engagement through AI-powered search and content intelligence.',
        href: 'https://www.searchunify.com/resource-center/success-story/ebsco-academy-boosts-learner-engagement-by-125-8-with-searchunify/',
      }
    ],
    ratings: [
      {
        source: 'G2',
        logo: '/g2-logo.jpeg',
        badge: 'Leader',
        label: 'in G2 Grid® Report for Enterprise Search for 5 Years (2020-2025)',
        href: 'https://www.searchunify.com/press-release/searchunify-achieves-5-consecutive-years-of-leadership-in-g2-grid-report-for-enterprise-search/',
        sourceColor: '#e4291b',
      },
      {
        source: 'IDC',
        logo: '/idc-logo.jpg',
        badge: 'Gold Medalist',
        label: 'in IDC MarketScape for General-Purpose Knowledge Discovery Software, 2025',
        href: 'https://www.searchunify.com/press-release/searchunify-achieves-5-consecutive-years-of-leadership-in-g2-grid-report-for-enterprise-search/',
        sourceColor: '#0055a5',
      },
      {
        source: 'Forrester',
        logo: '/foresta-logo.svg',
        badge: 'Strong Performer',
        label: 'in the Forrester Wave™: Knowledge Management Solutions, Q4 2024',
        href: 'https://www.searchunify.com/press-release/grazitti-interactives-searchunify-cited-as-a-strong-performer-among-knowledge-management-solutions-in-latest-evaluation-by-independent-research-firm/',
        sourceColor: '#0a6640',
      },
      {
        source: 'SoftwareReviews',
        badge: 'Gold Medalist',
        label: 'in Enterprise Search Data Quadrant Report: 2024, 2025',
        href: 'https://www.searchunify.com/press-release/searchunify-named-a-gold-medalist-in-2025-enterprise-search-data-quadrant-report-by-info-tech-research-groups-softwarereviews/',
        sourceColor: '#2d7d3a',
      },
    ],
    products: [
      {
        id: 'su-agentsuite',
        name: 'Agentic Suite',
        businessTags: ['B2B', 'PaaS', 'Enterprise'],
        headline: 'Agentic Suite is an agentic AI platform that combines LLMs, workflows, and enterprise integrations to build and scale autonomous, goal-driven agents.',
        tags: [
          { label: 'Agentic AI', cls: 'tag-blue' },
          { label: 'LLM', cls: 'tag-blue' },
          { label: 'RAG', cls: 'tag-gray' },
          { label: 'Gen AI', cls: 'tag-green' },
        ],
        artifacts: [
          { type: 'video', label: 'Product demo', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
          { type: 'image', label: 'Agent workflow UI', color: 'var(--color-background-tertiary)' },
          { type: 'pdf', label: 'Forrester report', color: '#faece7' },
        ],
        keyFeatures: [
          'SearchUnify FRAG™ Engine',
          'First-Touch Self-Service',
          'Coordinated Multi-Agent System',
          'Sentiment-Aware Prioritization',
          'Smart Ticket Routing',
          'Data Security & Compliance',
          'Self-Optimizing AI',
          'Agent Assistance',
          'Performance Analytics',
          'Seamless System Integration (Connectors & MCPs)',
          'AI Knowledge Management',
        ],
        businessImpact: [
          { num: '45%', label: 'reduction in customer escalations', direction: 'up' },
          { num: '60%', label: 'increase in case deflection', direction: 'up' },
          { num: '35%', label: 'faster resolution time', direction: 'up' },
          { num: '30%', label: 'reduction in case volume per agent', direction: 'down' },
          { num: '40%', label: 'higher CSAT', direction: 'up' },
          { num: '20%', label: 'higher renewal rates', direction: 'up' },
        ],
        problem: 'SearchUnify needed to move beyond search into full agentic workflow automation to compete in an accelerating enterprise AI market.',
        decision: 'No-code Agent Builder with modular workflow orchestration, LLM routing layer, MCP connector libraries, in-house multimodal RAG — shipped with an 8-PM team over 18 months.',
        learnings: 'Enterprise AI adoption is more about change management than technology capability. No-code interfaces unlock adoption but require extensive onboarding and guardrails to prevent misuse. Agentic workflows need clear fallback strategies and human-in-the-loop checkpoints to maintain trust at scale.',
        lastStatus: 'Active · In production across Fortune 200 enterprises. Feature development continues under the current team.',
        outcomes: [],
      },
      {
        id: 'su-agentbuilder',
        name: 'SUVA',
        businessTags: ['B2B', 'SaaS', 'Enterprise'],
        headline: 'SUVA is an enterprise AI assistant that delivers hyper-personalized, context-aware self-service experiences across channels.',
        tags: [
          { label: 'Enterprise', cls: 'tag-blue' },
          { label: 'AI Agent', cls: 'tag-teal' },
          { label: 'LLM', cls: 'tag-blue' },
          { label: 'CRMs', cls: 'tag-teal' },
        ],
        artifacts: [
          { type: 'image', label: 'Builder canvas UI', color: 'var(--color-background-tertiary)' },
          { type: 'video', label: 'Build demo', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
          { type: 'pdf', label: 'Product one-pager', color: '#faece7' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Multi-turn Conversations',
          'Reference Citations',
          'Multilingual Interactions',
          'Agent Handoff',
          'Multimodal Intelligence',
          'Case Management',
          'Temperature Control',
          'Access Control Settings'
        ],
        problem: 'Traditional rule-based bots were rigid, hard to scale, and failed to deliver personalized, context-aware experiences, limiting self-service effectiveness and increasing dependency on human agents.',
        decision: 'Moved to build SUVA as a multimodal, LLM-powered, context-driven AI assistant capable of understanding user intent, personalizing responses, and executing agentic actions to automate end-to-end support journeys.',
        learnings: 'LLM-powered assistants fail silently in production — hallucinations in enterprise contexts destroy trust fast. Temperature control and contextual guardrails became as important as the core capability. Measuring self-service success required new metrics beyond deflection rate.',
        lastStatus: 'Active · Deployed and scaling across enterprise clients globally as a flagship self-service product.',
        outcomes: [
          { num: '85%', label: 'reduction in support Operational cost' },
          { num: '55%', label: 'reduction in IT Ticket Volume' },
          { num: '15%', label: 'increase in Employee Satisfaction' },
          { num: '78%', label: 'reduction in HR Inquiry Response Time' },
          { num: '41%', label: 'decrease in MTTR' },
          { num: '35%', label: 'reduction in AHT' }]
      },
      {
        id: 'su-rag',
        name: 'Agent Helper',
        businessTags: ['B2B', 'SaaS'],
        headline: "Agent Helper is an AI-powered support co-pilot that provides real-time context, automated responses, and intelligent recommendations to help agents resolve cases faster.",
       tags: [
          { label: 'Enterprise', cls: 'tag-blue' },
          { label: 'AI Co-Pilot', cls: 'tag-teal' },
          { label: 'LLM', cls: 'tag-blue' },
          { label: 'CRMs', cls: 'tag-teal' },
        ],
        artifacts: [
          { type: 'image', label: 'RAG pipeline diagram', color: 'var(--color-background-tertiary)' },
          { type: 'pdf', label: 'Technical whitepaper', color: '#faece7' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Sentiment Analysis',
          'Escalation Prediction',
          'Holistic Case Timeline',
          'Case Summarisation',
          'AI Editor',
          'Intelligent Swarming',
          'Recommended Top Experts',
          'Surface Top Articles & Cases',
          'Customisable Response Tonality',
          'Smarter Analytics'
        ],
        problem: 'Support agents struggled with fragmented context across systems and spent significant time handling complex cases, leading to slower resolutions, inconsistent responses, and higher dependency on experienced agents.',
        decision: 'AI-powered co-pilot that unifies context, assists in resolving complex cases with intelligent recommendations, and auto-generates responses to enable faster and more accurate resolutions.',
        learnings: 'Co-pilot tools are harder to sell than autonomous agents because the ROI is less immediately visible. Quantifying speed improvements for support agents — moving from anecdotal to measurable outcomes — was the core adoption challenge.',
        lastStatus: 'Active · Deployed across enterprise support teams, embedded within the broader Agentic Suite.',
        outcomes: [
          { num: '92%', label: 'descrease in FRT' },
          { num: '77%', label: 'increase in total closed case volume' },
          { num: '16%', label: 'in agent productivity' }
        ],
      },
    ],
  },

  {
    id: 'reverie',
    categories: ['enterprise', 'fulltime'],
    year: '2022–24',
    active: false,
    employmentType: 'Full-time',
    name: 'Reverie (Acquired by Reliance Jio)',
    logo: '/reverie-logo.jpg',
    brandColor: '#e8131b',
    website: 'https://reverieinc.com',
    role: 'Senior Product Manager (Interim Head of Voice Products)',
    description: "An AI-first language technology platform offering speech-to-text, text-to-speech, translation, and conversational AI solutions to build multilingual, voice-enabled applications at scale across Indic languages.",
    roleNarrative: 'Although my official title at Reverie was Senior Product Manager, I operated under the market designation of Head of Voice Products, reporting to the CTO. I was brought in to productize in-house AI technologies, leading the journey from market research and problem discovery to defining the vision, product strategy, and a two-year roadmap, then executing the platform from scratch. I managed a five-member product team and a 39-member cross-functional team across engineering, data science, and design, focused on building a no-code/low-code multilingual voice AI platform. I also partnered closely with sales, customer success, and marketing to drive adoption and positioning. The hardest challenge was navigating the technical constraints of Indic language AI, where data scarcity, phonetic variation, and dialect complexity required building in-house data pipelines and fine-tuning strategies that no off-the-shelf solution could address. Winning Reliance Jio as the flagship customer, driving 10M+ DAU, and contributing to the eventual acquisition validated the platform\'s market fit and the depth of the moat we had built.',
    caseStudies: [
      { title: 'Reliance Jio', result: '10M+ DAU on voice-enabled customer support flows in Hindi, Tamil, and 8 other Indic languages.', href: 'https://reverieinc.com' },
    ],
    businessImpact: [
       { num: '32%', label: 'YoY ARR growth', direction: 'up' },
          { num: '10M+', label: 'DAU managed', direction: 'up' },
          { num: '14%', label: 'increase in ARPU', direction: 'up' },
          { num: '24%', label: 'gain in sprint efficiency', direction: 'up' }
    ],
    ratings: [],
    products: [
      {
        id: 'reverie-voiceplatform',
        name: 'Cuberoot',
        website: 'https://reverieinc.com/products/cuberoot/',
        businessTags: ['B2B', 'SaaS'],
        headline: 'Cuberoot is an AI-powered voice agent platform that enables enterprises to build, deploy, and scale human-like, multilingual voice interactions across lead generation, collections, customer support and more across 22+ indic languages',
        tags: [
          { label: 'No-code', cls: 'tag-teal' },
          { label: 'Voice AI', cls: 'tag-purple' },
          { label: 'Indic Languages', cls: 'tag-amber' },
          { label: 'Reliance Jio', cls: 'tag-gray' },
        ],
        artifacts: [
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=HPWD376Rqws', label: 'Platform Demo', color: '#e6f1fb' },
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=tWXHMPq-DP8', label: 'Product Walkthrough', color: '#e6f1fb' },
          { type: 'link', url: 'https://reverieinc.com/customer-success-stories/jio-set-top-box/', label: 'Jio Set-top Box', color: '#faece7', icon: '📰' },
          { type: 'link', url: 'https://www.expresscomputer.in/news/reverie-bets-big-on-multilingual-speech-interface-market-for-in-car-voice-assistants/107098/', label: 'In-car Voice AI', color: 'var(--color-background-tertiary)', icon: '🔗' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Context preservation',
          'Seamless Voice Integration (STT/TTS)',
          'Multiligual Support',
          'Workflow Automation',
          'Adaptive & Real-time processing',
          'MultiVendor Support',
          'Cusomtizable Voice Generation',
          'Agentic Actions',
          'Multi Native System Integrations',
          'Transcription Analysis & Reporting',
          'Data Security & Compliance'
        ],
        caseStudies: [ {
        title: 'Jio Set-top Box',
        logo: 'automation-anywhere.jpg',
        result: 'Automation Anywhere, a global RPA leader, boosted knowledge creation by 57%, increased contributors by 37%, and cut publishing time by 46% with AI-driven content automation.',
        href: 'https://www.searchunify.com/resource-center/success-story/how-automation-anywhere-is-winning-at-user-experience-with-searchunify/',
      }],
        ratings: [],
        problem: "Enterprises and governments struggled to build scalable multilingual voice AI solutions for Indic languages due to fragmented tools and high engineering effort. Additionally, as a business, it was difficult to monetize standalone technologies since delivering end-to-end solutions required reliance on external vendors, leading to slower execution and significant revenue sharing.",
        decision: 'Decided to productize in-house language AI technologies into a unified, no-code/low-code SaaS platform that delivers end-to-end multilingual, voice-first conversational AI solutions, eliminating vendor dependency and enabling better control over customer experience and revenue.',
        learnings: 'Building a platform vs. a service requires a completely different GTM motion. No-code works only when the problem space is well-defined — Indic language complexity meant domain-specific guardrails were essential even for no-code users. Eliminating vendor dependency unlocked both margins and delivery speed.',
        lastStatus: 'Active · Reverie acquired by Reliance Jio. Cuberoot continues as a flagship voice AI product within the Jio ecosystem.',
        outcomes: [
          { num: '77%', label: 'increase in customer reach' },
          { num: '80%', label: 'leads qualified within minutes' },
          { num: '60%', label: 'reduction in calling costs' },
          { num: '50%', label: 'improvement in customer satisfaction'},
          { num: '87%', label: 'reduction in scalability'}
        ],
      },
    ],
  },

  {
    id: 'officebanao',
    categories: ['enterprise', 'fulltime'],
    year: '2022',
    active: false,
    employmentType: 'Consulting',
    name: 'OfficeBanao (Backed by Lightspeed VC)',
   logo: '/officebanao-logo.png',
    brandColor: '#1565c0',
    website: '#',
    role: 'Founding Member',
    description: 'A tech-enabled SaaS platform that streamlines the end-to-end office creation lifecycle, from design and procurement to execution, bringing transparency, efficiency, and scalability to a traditionally fragmented interiors ecosystem.',
    roleNarrative: 'I joined OfficeBanao as a founding member and Product Head, working closely with CXOs as the second hire to build the product portfolio from the ground up. I led everything from defining vision, strategy, and roadmap to setting up the team, tools, and execution frameworks, driving end-to-end product development. This journey took the product from inception to early maturity, onboarding the first successful customers and contributing to the initial fundraise. I later transitioned into a part-time consulting role to take the product to completion while moving to Reverie to deepen my focus on AI. Early on, navigating the operational complexity of a marketplace business and coordinating between enterprise clients and a fragmented vendor ecosystem gave me a deep understanding of how supply-side quality becomes the primary product variable in marketplace models, and how operationally intensive businesses need tight product-ops feedback loops from day one.',
    caseStudies: [],
    ratings: [],
    businessImpact: [
      { num: '$2.2M', label: 'first-year sales', direction: 'up' },
      { num: '$6M+', label: 'Lightspeed funding secured', direction: 'up' },
    ],
    products: [
      {
        id: 'officebanao-platform',
        name: 'OfficeBanao Platform',
        businessTags: ['B2B', 'Marketplace'],
        headline: 'End-to-end office design, procurement, and renovation platform — 4 epics shipped from 0 to $2.2M in first-year sales.',
        tags: [
          { label: 'Lightspeed VC', cls: 'tag-blue' },
          { label: 'B2B Marketplace', cls: 'tag-teal' },
          { label: 'PropTech', cls: 'tag-amber' },
        ],
        artifacts: [
          { type: 'link', url: 'https://techcrunch.com/2023/04/10/officebanao-funding-lightspeed/', label: 'TechCrunch · Lightspeed', color: '#faece7', icon: '📰' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Full product portfolio — 4 epics from ideation to launch',
          'End-to-end office design and renovation workflows',
          'Vendor and procurement marketplace',
          'Product roadmap and strategy from 0 to 1',
          'Go-to-market strategy driving $2.2M first-year sales',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Enterprises had no single platform for end-to-end office design, procurement, and renovation — leading to fragmented vendor management and high coordination overhead.',
        decision: 'Built a 4-epic product portfolio from ideation to launch, defining roadmap, strategy, and go-to-market execution that achieved $2.2M in first-year sales and secured $6M+ in Lightspeed Ventures funding.',
        learnings: 'B2B marketplace products live or die by supply-side quality. Signing up vendors is easy — ensuring consistent delivery quality is the hard part. Operationally intensive businesses need tight product-ops feedback loops from day one, not after scale.',
        lastStatus: 'Active · Secured $6M+ Lightspeed funding post my transition. Product continues to operate with a growing vendor network.',
        outcomes: [
          { num: '$2.2M', label: 'first-year sales' },
          { num: '$6M+', label: 'Lightspeed funding' },
          { num: '4 epics', label: 'shipped from 0' },
        ],
      },
    ],
  },

  {
    id: 'ingendynamics',
    categories: ['enterprise', 'consumer', 'consulting', 'parttime'],
    year: '2022',
    active: false,
    employmentType: 'Part-time',
    name: 'inGen Dynamics Inc.',
    logo: '/ingen-dynamics-logo.jpeg',
    brandColor: '#00838f',
    website: '#',
    role: 'Interim Head of Product',
    description: 'An AI robotics and IoT startup focused on building intelligent systems for home automation and healthcare, leveraging machine learning, robotics, and computer vision, backed by 1,500+ Indiegogo backers and US investors.',
    roleNarrative: 'I contributed through weekend engagements, working closely with the founder to guide product direction across AI robotics and IoT use cases. I mentored and reviewed PMs, helped unblock critical challenges, and supported product and engineering teams in aligning on vision, execution, and real-world deployments, while gaining hands-on exposure to robotics systems. A key contribution was the Sentinel surveillance product, where I drove the market research and competitive analysis that shaped its initial positioning, defined technical product specs for the IoT device layer, and coordinated cross-functional execution across hardware and software teams. I also guided the AI module strategy for Aido across healthcare and elderly care, helping prioritize use cases where behavioral adoption barriers were lower than technical complexity, a discipline that proved invaluable in subsequent AI product work.',
    caseStudies: [],
    ratings: [],
    businessImpact: [
      { num: '3.6x', label: 'sales increase — Kaiser Haus', direction: 'up' },
      { num: '1.6x', label: 'overall sales uplift', direction: 'up' },
    ],
    products: [
      {
        id: 'ingen-kaiserhaus',
        name: 'Kaiser Haus',
        businessTags: ['B2C', 'IoT', 'Smart Home'],
        headline: 'Automated smart home with IoT automation — surveillance, security, and home intelligence for modern living.',
        tags: [
          { label: 'Smart Home', cls: 'tag-teal' },
          { label: 'IoT', cls: 'tag-blue' },
          { label: 'Computer Vision', cls: 'tag-purple' },
        ],
        artifacts: [
          { type: 'link', url: 'https://www.einpresswire.com/article/535267126/ingen-dynamics-announces-successful-worldwide-deployment-of-sentinel-prime-installations-based-on-the-origami-platform', label: 'Sentinel Deployment', color: 'var(--color-background-tertiary)', icon: '📰' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Sentinel home surveillance — market research and competitive analysis',
          'Technical product specifications for IoT devices',
          'Cross-functional coordination with hardware and engineering teams',
          'Detailed user stories and feature work orders',
          'Project planning and execution across cross-functional teams',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Smart home products lacked cohesive product strategy and user-centric design, resulting in poor adoption and below-target sales performance.',
        decision: 'Strategized product innovations achieving a 3.6x sales increase. Introduced Sentinel for home surveillance through market research and competitive analysis, documented user stories and specifications, and coordinated cross-functional project execution.',
        learnings: 'Hardware-software product strategy is fundamentally different — the feedback loop is longer, iteration timelines are constrained by supply chains, and failure costs are much higher than software. Product specs must accommodate hardware limitations upfront, not as afterthoughts.',
        lastStatus: 'Active · Deployed globally. inGen Dynamics secured $150M GEM investment post engagement. Sentinel product line continues.',
        outcomes: [
          { num: '3.6x', label: 'sales increase' },
        ],
      },
      {
        id: 'ingen-aido',
        name: 'Aido Robot',
        businessTags: ['B2C', 'Robotics', 'AI'],
        headline: 'An AI robotics and IoT startup focused on building intelligent systems for home automation and healthcare, leveraging machine learning, robotics, and computer vision, backed by 1,500+ Indiegogo backers and US investors.',
        tags: [
          { label: 'AI Robotics', cls: 'tag-purple' },
          { label: 'Healthcare', cls: 'tag-teal' },
          { label: 'Computer Vision', cls: 'tag-blue' },
        ],
        artifacts: [
          { type: 'link', url: 'https://fastcompany.co.za/tech/2023-08-10-gem-increases-investment-commitment-for-ingen-dynamics-to-150-million-accelerating-the-ai-and-robotics-evolution/', label: 'Fast Company · $150M', color: 'var(--color-background-tertiary)', icon: '📰' },
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=oOn5lVxTGjk', label: 'Aido Demo', color: '#e6f1fb' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Healthcare and elderly care AI modules',
          'Home surveillance and kids\' care features',
          'Optimal IoT device architecture definition',
          'AI module guidance for multimodal interactions',
          'Metrics monitoring for performance optimization',
          'Market trend analysis and promotional strategy',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'AI robotics products for home and healthcare needed focused product strategy and well-defined AI module architecture to drive adoption and market positioning.',
        decision: 'Guided AI modules for Aido across healthcare, elderly care, home surveillance, and kids\' care. Defined optimal IoT architecture, collaborated with hardware team, and monitored metrics for performance optimization — driving a 1.6x sales uplift.',
        learnings: 'AI robotics at the intersection of home and healthcare requires deep user empathy — the gap between technically possible and user-comfortable is massive. Adoption barriers were behavioral, not technical. Clear use-case prioritization mattered more than breadth of features.',
        lastStatus: 'Active · inGen Dynamics secured $150M GEM investment. Aido continues development with an expanded healthcare focus.',
        outcomes: [
          { num: '1.6x', label: 'sales uplift' },
        ],
      },
    ],
  },

  {
    id: 'discovr',
    categories: ['enterprise', 'fulltime'],
    year: '2017–22',
    active: false,
    employmentType: 'Full-time',
    brandColor: '#0B0D27',
    name: 'Discovr.AI (Backed by ONGC, Micromax & Banking HNIs)',
    logo: '/discovr-ai-logo.jpeg',
    website: '#',
    role: 'Co-Founder, Chief Product Officer',
    description: 'A no-code AI platform that empowers enterprises to build and scale intelligent systems across computer vision, conversational AI, OCR, and predictive use cases using pre-built ML models and fine-tuned algorithms, enabling real-time insights, automated decision-making, and faster time to value. It operates as the B2B vertical of Red Ginger Technologies, backed by Micromax, ONGC, and prominent HNIs.',
    roleNarrative: 'As Co-founder and Chief Product Officer, my role centered on product thinking and development, defining GTM, ICPs, and prioritization while building AI systems grounded in real-world use cases. We partnered with leading enterprises and government bodies including Reliance Jio, Tata Steel, ONGC, the Indian Army, Cairn Vedanta, Texas Instruments, NITI Aayog, and the Telangana Government, running multiple POCs, MVPs, and live deployments to acquire data, validate problems, and refine ML models. Over three years, this iterative approach helped us evolve from project-led execution to a mature, scalable SaaS platform. Building enterprise trust in AI was one of the hardest challenges, particularly with government and defence clients where on-prem deployment, air-gapped environments, and explainability were hard requirements and not optional features. Managing investor relationships with Micromax and ONGC while simultaneously shipping product and closing deployments gave me a deep understanding of how to balance strategic stakeholder management with execution velocity.',
    caseStudies: [
      { title: 'ONGC', result: 'Automated pipeline defect detection — reduced manual inspection cost by 40%.', href: '#' },
      { title: 'Indian Army', result: 'Air-gapped on-prem deployment for perimeter surveillance at two installations.', href: '#' },
      { title: 'Tata Steel', result: 'Automated document classification for 5M+ procurement documents; 60% faster processing.', href: '#' },
      { title: 'Telangana Government', result: 'Citizen grievance classification system processing 50K+ submissions/month.', href: '#' },
    ],
    ratings: [],
    products: [
      {
        id: 'discovr-cv',
        name: 'Netra',
        businessTags: ['B2B', 'B2G'],
        headline: 'Low-code CV model builder — object detection, OCR, quality inspection — deployed in manufacturing, oil & gas, and defence.',
        tags: [
          { label: 'Low-code', cls: 'tag-teal' },
          { label: 'White-label', cls: 'tag-coral' },
          { label: 'ONGC · Micromax backed', cls: 'tag-amber' },
          
        ],
        artifacts: [
          { type: 'image', label: 'Platform screenshots', color: 'var(--color-background-tertiary)' },
          { type: 'video', label: 'Demo video', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Low-code model training — annotate, train, and deploy CV models in hours',
          'Pre-built templates — defect detection, OCR, face recognition, object counting',
          'On-prem deployment — air-gapped defence and government environments',
          'White-label packaging — for consulting firm resellers (PwC, EY, Tech Mahindra)',
          'Edge deployment — manufacturing floor cameras',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Large enterprises needed Computer Vision capabilities but had no ML talent in-house. Custom CV projects took 6–18 months and cost ₹50L+.',
        decision: 'Built a low-code CV platform with annotation tools, one-click training, and on-prem deployment. White-labeled for consulting firms who bundled it into client engagements.',
        learnings: 'Enterprise CV buyers needed extensive POC hand-holding. White-labeling through consulting firms (PwC, EY, Tech Mahindra) was the right distribution strategy — trust by proxy. Direct enterprise sales cycles ran 12-18 months; indirect was 3-6. CV models trained in lab conditions consistently underperform in field due to lighting, angle, and occlusion variance.',
        lastStatus: 'Evolved · Integrated into the full Discovr.AI SaaS platform. Multiple enterprise and government deployments remain active.',
        outcomes: [
          { num: '30+', label: 'enterprise clients' },
          { num: '65%', label: 'renewal rate' },
          { num: '5M+', label: 'documents processed' },
          { num: 'NPS 56+', label: 'flagship accounts' },
        ],
      },
      {
        id: 'discovr-nlp',
        name: 'Moksha',
        businessTags: ['B2B', 'B2G'],
        headline: 'Low-code platform for text classification, sentiment analysis, entity extraction, and churn prediction.',
        tags: [
          { label: 'Low-code', cls: 'tag-teal' },
          { label: 'White-label', cls: 'tag-coral' },
          { label: 'Predictive ML', cls: 'tag-purple' },
        ],
        artifacts: [
          { type: 'image', label: 'NLP pipeline UI', color: 'var(--color-background-tertiary)' },
          { type: 'pdf', label: 'Architecture doc', color: '#faece7' },
        ],
        businessImpact: [],
        keyFeatures: [
          'No-code text classifier — train custom intent and entity models on client data',
          'Pre-built models — sentiment, PII detection, document classification',
          'Predictive ML templates — churn, demand forecasting, anomaly detection',
          'REST API + webhook output — easy integration into existing systems',
          'Explainability layer — feature importance and confidence scores per prediction',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Enterprises had large text datasets and needed ML insights but no data science teams. Off-the-shelf NLP APIs had no customization and failed on domain-specific language.',
        decision: 'Extended the Discovr platform to NLP with a no-code training interface. Built pre-trained templates for the 5 most common enterprise NLP tasks and a Predict API for BI tool integration.',
        learnings: 'Domain-specific language — legal, finance, engineering — breaks generic NLP models at production scale. Pre-training on industry corpora was non-negotiable for accuracy above 80%. Government clients required on-prem deployment as a hard constraint, not a nice-to-have.',
        lastStatus: 'Evolved · Integrated into Discovr.AI platform. Government and enterprise NLP deployments continue to run.',
        outcomes: [
          { num: '60%', label: 'faster doc processing' },
          { num: '50K+', label: 'submissions/month automated' },
          { num: '12', label: 'NLP model types' },
          { num: '3 days', label: 'avg time to first model' },
        ],
      },
      {
        id: 'discovr-cv',
        name: 'Caravan',
        businessTags: ['B2B', 'B2G'],
        headline: 'Low-code CV model builder — object detection, OCR, quality inspection — deployed in manufacturing, oil & gas, and defence.',
        tags: [
          { label: 'Low-code', cls: 'tag-teal' },
          { label: 'White-label', cls: 'tag-coral' },
          { label: 'ONGC · Micromax backed', cls: 'tag-amber' },

        ],
        artifacts: [
          { type: 'image', label: 'Platform screenshots', color: 'var(--color-background-tertiary)' },
          { type: 'video', label: 'Demo video', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
          { type: 'link', url: 'https://startup.ongc.co.in/home', label: 'ONGC Startup', color: '#e6f1fb', icon: '🔗' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Low-code model training — annotate, train, and deploy CV models in hours',
          'Pre-built templates — defect detection, OCR, face recognition, object counting',
          'On-prem deployment — air-gapped defence and government environments',
          'White-label packaging — for consulting firm resellers (PwC, EY, Tech Mahindra)',
          'Edge deployment — manufacturing floor cameras',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Large enterprises needed Computer Vision capabilities but had no ML talent in-house. Custom CV projects took 6–18 months and cost ₹50L+.',
        decision: 'Built a low-code CV platform with annotation tools, one-click training, and on-prem deployment. White-labeled for consulting firms who bundled it into client engagements.',
        outcomes: [
          { num: '30+', label: 'enterprise clients' },
          { num: '65%', label: 'renewal rate' },
          { num: '5M+', label: 'documents processed' },
          { num: 'NPS 56+', label: 'flagship accounts' },
        ],
      },
    {
        id: 'discovr-cv',
        name: 'Nirvana',
        businessTags: ['B2B', 'B2G'],
        headline: 'Low-code CV model builder — object detection, OCR, quality inspection — deployed in manufacturing, oil & gas, and defence.',
        tags: [
          { label: 'Low-code', cls: 'tag-teal' },
          { label: 'White-label', cls: 'tag-coral' },
          { label: 'ONGC · Micromax backed', cls: 'tag-amber' },
          
        ],
        artifacts: [
          { type: 'image', label: 'Platform screenshots', color: 'var(--color-background-tertiary)' },
          { type: 'video', label: 'Demo video', color: '#e6f1fb', iconColor: 'var(--color-text-info)' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Low-code model training — annotate, train, and deploy CV models in hours',
          'Pre-built templates — defect detection, OCR, face recognition, object counting',
          'On-prem deployment — air-gapped defence and government environments',
          'White-label packaging — for consulting firm resellers (PwC, EY, Tech Mahindra)',
          'Edge deployment — manufacturing floor cameras',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Large enterprises needed Computer Vision capabilities but had no ML talent in-house. Custom CV projects took 6–18 months and cost ₹50L+.',
        decision: 'Built a low-code CV platform with annotation tools, one-click training, and on-prem deployment. White-labeled for consulting firms who bundled it into client engagements.',
        outcomes: [
          { num: '30+', label: 'enterprise clients' },
          { num: '65%', label: 'renewal rate' },
          { num: '5M+', label: 'documents processed' },
          { num: 'NPS 56+', label: 'flagship accounts' },
        ],
      }
    ],
  },

  {
    id: 'onelabs',
    categories: ['consumer', 'fulltime'],
    year: '2015–21',
    active: false,
    employmentType: 'Full-time',
    name: 'OneLabs by Red Ginger',
    logo: '/onelabs-logo.jpeg',
    brandColor: '#F3672B',
    website: '#',
    role: 'Co-Founder, Chief Product & Technology Officer',
    description: "A consumer internet product company building and launching mobile and aggregator super apps across ecommerce and concierge services, scaling to 20M+ downloads across 6+ countries. As the B2C vertical of Red Ginger Technologies, backed by Micromax, ONGC, and prominent HNIs, it is driven by the ambition to become the Bytedance of India.",
    roleNarrative: "As Co-founder and Chief Product and Technology Officer, I owned the end-to-end journey of building and scaling the company's product ecosystem, driving product vision, technology architecture, and growth strategy. I led everything from identifying opportunities and defining what to build to executing across product, engineering, and growth, ensuring scalable systems, rapid experimentation, and sustainable monetization. The defining phase was the series of pivots from Yana to inOne to FoodBox, each driven by real user behavior data rather than top-down strategy, and each sharpening our instincts for what distribution fit actually means. Scaling FoodBox to 14M+ downloads across six countries taught me that telecom bundling as a channel mattered as much as product-market fit. Managing a full portfolio while maintaining investor confidence with Micromax and ONGC-backed funding sharpened my discipline around prioritization, resource allocation, and knowing when to double down versus when to sunset.",
    caseStudies: [],
    ratings: [],
    products: [
      {
        id: 'onelabs-foodbox',
        name: 'FoodBox - All-in-one Food App',
        businessTags: ['B2C', 'eCommerce'],
        headline: 'an all-in-one food app designed for price-sensitive users, transforming the journey from dish-driven discovery to coupon-driven choices of the day. It enables users to discover the best deals, decide what to eat, and book orders natively on the platform without needing to download multiple apps.',
        tags: [
          { label: 'Food · Productivity', cls: 'tag-amber' },
          { label: '50+ vendors', cls: 'tag-gray' },
        ],
        artifacts: [
          { type: 'image', label: 'FoodBox UI', color: 'var(--color-background-tertiary)' },
          { type: 'image', label: 'inOne screenshots', color: 'var(--color-background-tertiary)' },
        ],
        businessImpact: [],
        keyFeatures: [
          'FoodBox — aggregated menus from 50+ restaurant partners with single checkout',
          'inOne — productivity super-app combining tasks, notes, calendar, and file storage',
          'Shared ad tech and analytics stack — across both products',
          'Cross-promotion — drove 22% of new installs organically',
        ],
        caseStudies: [],
        ratings: [],
        problem: "While experimenting with GTM for inOne, we launched category-specific apps and observed that food had significantly higher frequency of use. We also saw that ~86% of users were price-sensitive and made decisions based on deals and comparisons, yet existing platforms were dish or restaurant-led, forcing users to switch across apps. At the same time, brands like KFC and McDonald's faced aggregator monopolies, limiting access to user data, retargeting, and control over customer relationships, revealing a clear gap for a unified, high-frequency platform.",
        decision: 'We restructured the journey from coupon discovery at the home screen → decision-making → ordering into a unified, deal-first flow aligned with real user behavior. At the same time, we enabled direct integrations for brands to regain control over user relationships, allowing users to complete bookings natively within the platform. This approach scaled to 14M+ downloads across 6 countries within 2 years.',
        learnings: 'Deal-first discovery beat restaurant-first discovery because users optimized for price, not brand loyalty. Telecom bundling reduced CAC by 60% — distribution channel fit matters as much as product-market fit. First-mover advantage in Tier-2/3 cities was a bigger moat than we initially estimated.',
        lastStatus: 'Sunset · Scaled to 14M+ downloads across 6 countries. Resources pivoted to B2B AI (Discovr.AI) to pursue a larger enterprise opportunity.',
        outcomes: [
          { num: '50+', label: 'vendor integrations' },
          { num: '22%', label: 'organic cross-install rate' },
          { num: '60%', label: 'lower CAC vs standalone' },
          { num: '51%', label: 'YoY ARR growth' },
        ],
      },
      {
        id: 'onelabs-foodbox',
        name: 'inOne - Super App',
        businessTags: ['B2C', 'eCommerce'],
        headline: 'Food aggregator and productivity super-app — 50+ vendor integrations.',
        tags: [
          { label: 'Food · Productivity', cls: 'tag-amber' },
          { label: '50+ vendors', cls: 'tag-gray' },
        ],
        artifacts: [
          { type: 'image', label: 'FoodBox UI', color: 'var(--color-background-tertiary)' },
          { type: 'image', label: 'inOne screenshots', color: 'var(--color-background-tertiary)' },
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=THdypgOUpU4', label: 'inOne Demo', color: '#e6f1fb' },
        ],
        businessImpact: [],
        keyFeatures: [
          'FoodBox — aggregated menus from 50+ restaurant partners with single checkout',
          'inOne — productivity super-app combining tasks, notes, calendar, and file storage',
          'Shared ad tech and analytics stack — across both products',
          'Cross-promotion — drove 22% of new installs organically',
        ],
        caseStudies: [],
        ratings: [],
        problem: "As we evolved from Yana, we observed that Indian users still relied heavily on tap-based interactions, leading to fragmented journeys where users switched across multiple apps for comparison and transactions, along with mobile space constraints. At the same time, businesses struggled with building and managing apps and relied heavily on app stores for distribution, creating a clear gap for a unified platform.",
        decision: 'We built a backend-driven super app with native integrations to unify user journeys, along with a platform layer that converts websites into app-like experiences for easy distribution. The system enabled dynamic, hyper-personalized experiences, reduced app size to ~7MB, and scaled to support 50+ services without requiring multiple app downloads.',
        learnings: 'Super apps require ecosystem lock-in that single-feature apps do not. The 7MB app size constraint forced architectural elegance that proved to be a competitive moat in low-bandwidth markets. Backend-driven UI was ahead of its time but created server dependency that needed more resilience investment.',
        lastStatus: 'Sunset · 20M+ lifetime downloads across 6 countries. Core architectural patterns directly influenced the Discovr.AI platform design.',
        outcomes: [
          { num: '50+', label: 'vendor integrations' },
          { num: '22%', label: 'organic cross-install rate' },
          { num: '60%', label: 'lower CAC vs standalone' },
          { num: '51%', label: 'YoY ARR growth' },
        ],
      },
      {
        id: 'onelabs-yana',
        name: 'Yana - A Virtual Assistant',
        businessTags: ['B2C', 'Consumer App'],
        headline: "a vernacular AI assistant designed as India's answer to Siri and Alexa, going beyond conversational and in-built mobile actions to enable real-world transactions like groceries, cabs, and services through voice and native integrations, powered by in-house ML-based intent recognition and classification engines.",
        tags: [
          { label: 'Personalisation', cls: 'tag-purple' },
          { label: 'Ad Tech', cls: 'tag-purple' },
          { label: 'Growth · AARRR', cls: 'tag-teal' },
        ],
        artifacts: [
          { type: 'image', label: 'App screenshots', color: 'var(--color-background-tertiary)' },
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=ZSh16vP5rd0', label: 'Yana Demo', color: '#e6f1fb' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Multilingual',
          'Multi Services',
          'Compare Prices',
          '2G compatible',
        ],
        caseStudies: [],
        ratings: [],
        problem: "Voice assistants like Siri and Alexa saw low real-world adoption because they focused on commands, not outcomes. With increasing internet penetration and the rise of digital services in India, there was a clear gap and a strong opportunity to shape new user behavior through a vernacular assistant that could execute tasks and book services on the go, not just respond.",
        decision: 'We decided to move beyond conversational assistants and build a system that could execute real-world tasks. Initial validation was done through manual operations over WhatsApp with structured SOPs, but as demand grew, scalability became a challenge. This pushed us to automate the experience using in-house ML models for intent recognition and native integrations for end-to-end task execution.',
        learnings: 'Manual WhatsApp-based validation before automation was the right call — it gave us real intent data before over-engineering. The 2G compatibility constraint shaped every architecture decision and turned out to be a competitive moat in rural markets. Voice-first India was a real thesis, just 5 years early.',
        lastStatus: 'Evolved · Sunset as a standalone product. Core voice and intent architecture evolved into inOne and directly informed Cuberoot voice AI design at Reverie.',
        outcomes: [
          { num: '1M+', label: 'users' },
        ],
      },
    ],
  },
  {
    id: 'gemini',
    categories: ['enterprise', 'fulltime'],
    year: '2014–15',
    active: false,
    employmentType: 'Full-time',
    name: 'Gemini Solutions',
    logo: '/gemini-solutions-logo.jpg',
    brandColor: '#1a237e',
    website: '#',
    role: 'Senior Software Consultant',
    description: 'Fintech-focused global IT offshore firm building risk management and portfolio analytics tools for leading financial institutions including PIMCO.',
    roleNarrative: 'My role was a mix of consulting, DevOps, and hands-on development, working on risk management systems for global financial clients. I built and supported data pipelines ingesting and processing data from institutions like JP Morgan and Barclays, ensuring timely, output-driven workflows for portfolio managers at PIMCO across US and Asia market cycles. This role gave me deep exposure to financial data infrastructure, including the precision requirements of real-time risk systems, data integrity protocols in high-stakes environments, and the engineering discipline required when the margin for error is effectively zero. It was here that I first understood how systems thinking and rigorous validation separate reliable infrastructure from fragile point solutions, a principle I\'ve carried into every product and engineering decision since.',
    caseStudies: [
      ],
    ratings: [],
    businessImpact: [],
    products: [
     
    ],
  },

  {
    id: 'socialappshq',
    categories: ['enterprise', 'fulltime'],
    year: '2013–14',
    active: false,
    employmentType: 'Full-time',
    name: 'SocialAppsHQ',
    logo: '/socialappshq-logo.png',
    brandColor: '#1565c0',
    website: '#',
    role: 'Software Development Engineer',
    description: 'A unified social media monitoring and sentiment analysis platform that aggregates conversations across 60+ sources, enabling brands like Pepsi Global, Mumbai Police to track, analyze, and manage engagement from a single interface.',
    roleNarrative: 'I started as a Software Development Engineer, working under guidance and quickly ramping up to owning key parts of the product. Within six months, I was leading three modules, building new source connectors, managing server access, implementing custom features, resolving critical bugs, and working directly with clients to deliver solutions. Working with enterprise clients like Pepsi Global and Mumbai Police exposed me early to the realities of B2B product delivery, where client-specific requirements, SLA pressure, and real-time data reliability are first-class concerns. This experience also introduced me to the challenges of aggregating social signals at scale, including data normalization across heterogeneous sources, sentiment accuracy under domain-specific language, and the product complexity of building intuitive dashboards over deeply noisy data.',
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [
    ],
  },
  {
    id: 'pec',
    categories: ['fulltime'],
    year: '2009–13',
    active: false,
    employmentType: 'Education',
    name: 'PEC University of Technology, Chandigarh',
    logo: '/pec-logo.png',
    brandColor: '#F4C939',
    website: 'https://pec.ac.in',
    role: 'B.E. Information Technology',
    description: 'Bachelors of Engineering in Information Technology from PEC Chandigarh (2009–2013). Where the journey began — built the foundation in systems, algorithms, and software engineering.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },

  // ── D2C ───────────────────────────────────────────────────────────────────
  {
    id: 'khuraq',
    categories: ['d2c', 'consumer'],
    year: 'TBD',
    active: false,
    employmentType: 'Passion Project',
    name: 'Khuraq',
    logo: null,
    brandColor: '#e11d48',
    website: '#',
    role: 'Founder',
    description: 'Details coming soon.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },

  // ── SHELVED IDEAS ─────────────────────────────────────────────────────────
  {
    id: 'zippy',
    categories: ['shelved', 'consumer'],
    year: 'TBD',
    active: false,
    employmentType: 'Passion Project',
    name: 'Zippy',
    logo: null,
    brandColor: '#f59e0b',
    website: '#',
    role: 'Founder / Idea Stage',
    description: 'Details coming soon.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },
  {
    id: 'petme',
    categories: ['shelved', 'consumer'],
    year: 'TBD',
    active: false,
    employmentType: 'Passion Project',
    name: 'PetMe',
    logo: null,
    brandColor: '#10b981',
    website: '#',
    role: 'Founder / Idea Stage',
    description: 'Details coming soon.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },
  {
    id: 'socio',
    categories: ['shelved', 'consumer'],
    year: 'TBD',
    active: false,
    employmentType: 'Passion Project',
    name: 'Socio',
    logo: null,
    brandColor: '#3b82f6',
    website: '#',
    role: 'Founder / Idea Stage',
    description: 'Details coming soon.',
    roleNarrative: null,
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
  },
];

// ── FILTER CONFIG ─────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'fulltime', label: 'Full-time' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'consumer', label: 'Consumer' },
  { key: 'd2c', label: 'D2C' },
  { key: 'building', label: 'Building Now' },
  { key: 'consulting', label: 'Consulting & Part-time' },
  { key: 'shelved', label: 'Shelved Ideas' },
];

// ── EMPLOYMENT TYPE BADGE COLORS ──────────────────────────────────────────────

const EMPLOYMENT_COLORS = {
  'Full-time': { bg: 'rgba(0,122,255,0.08)', color: '#0066cc', border: 'rgba(0,102,204,0.2)' },
  'Part-time': { bg: 'rgba(255,149,0,0.08)', color: '#b36200', border: 'rgba(255,149,0,0.2)' },
  'Passion Project': { bg: 'rgba(52,199,89,0.08)', color: '#1a7f37', border: 'rgba(52,199,89,0.2)' },
  'Consulting': { bg: 'rgba(142,142,147,0.1)', color: 'var(--color-text-tertiary)', border: 'var(--color-border-tertiary)' },
  'Education': { bg: 'rgba(13,71,161,0.08)', color: '#1565c0', border: 'rgba(13,71,161,0.2)' },
};

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────

function ProductCard({ product, companyName, onMediaClick, brandColor, productIndex }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');
  const bc = brandColor || '#7c3aed';

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: `0.5px solid ${bc}30`,
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
      transition: 'var(--transition-colors)',
    }}>
      {/* Product header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '16px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
          cursor: 'pointer',
          background: 'none',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-background-secondary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <div style={{ flex: 1 }}>
          {/* Product name + business tags inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
            {productIndex && (
              <span style={{ fontSize: 12, fontWeight: 700, color: bc, fontFamily: 'var(--font-display)', opacity: 0.7, flexShrink: 0 }}>{productIndex}.</span>
            )}
            {product.website ? (
              <a href={product.website} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', textDecoration: 'none', transition: 'var(--transition-colors)' }}>
                {product.name}
              </a>
            ) : (
              <span style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', transition: 'var(--transition-colors)' }}>
                {product.name}
              </span>
            )}
            {product.businessTags && product.businessTags.map((bt, i) => (
              <span key={i} style={{
                fontSize: 10, fontWeight: 500,
                padding: '2px 7px',
                borderRadius: 'var(--border-radius-pill)',
                background: 'var(--color-background-tertiary)',
                border: '0.5px solid var(--color-border-tertiary)',
                color: 'var(--color-text-tertiary)',
                transition: 'var(--transition-colors)',
              }}>
                {bt}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.55, marginBottom: 10, transition: 'var(--transition-colors)' }}>
            {product.headline}
          </p>
          {product.tags.length > 0 && (
            <div className="tags-row" style={{ marginTop: 0 }}>
              {product.tags.map((t, i) => <span key={i} className={`tag ${t.cls}`}>{t.label}</span>)}
            </div>
          )}
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          border: '0.5px solid var(--color-border-tertiary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: 'var(--color-text-tertiary)',
          flexShrink: 0, marginTop: 2,
          transition: 'var(--transition-colors)',
        }}>
          {open ? '−' : '+'}
        </div>
      </button>

      {/* Product expanded body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="product-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeStd }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: `0.5px solid ${bc}30` }}>

              {/* ARTIFACTS — always above tabs */}
              {product.artifacts.length > 0 && (
                <div style={{ padding: '12px 16px', borderBottom: `0.5px solid ${bc}25`, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.artifacts.map((a, i) => (
                    <MediaThumb key={i} item={a} company={companyName} onClick={onMediaClick} />
                  ))}
                </div>
              )}

              {/* TAB BAR */}
              {(() => {
                const tabs = [
                  { key: 'problem',   label: 'Problem',         has: !!product.problem },
                  { key: 'decision',  label: 'Decision',        has: !!product.decision },
                  { key: 'features',  label: 'Key Features',    has: product.keyFeatures?.length > 0 },
                  { key: 'impact',    label: 'Business Impact', has: (product.businessImpact?.length > 0) || (product.outcomes?.length > 0) },
                  { key: 'learnings', label: 'My Learnings',    has: !!product.learnings },
                ].filter(t => t.has);

                if (tabs.length === 0) return null;

                const currentTab = tabs.find(t => t.key === activeTab) ? activeTab : tabs[0].key;

                return (
                  <>
                    {/* Tab strip */}
                    <div style={{ display: 'flex', borderBottom: `0.5px solid ${bc}25`, overflowX: 'auto' }} className="cs-scroll">
                      {tabs.map(t => {
                        const isActive = currentTab === t.key;
                        return (
                          <button
                            key={t.key}
                            onClick={e => { e.stopPropagation(); setActiveTab(t.key); }}
                            style={{
                              padding: '9px 16px',
                              fontSize: 12, fontWeight: isActive ? 700 : 500,
                              color: isActive ? bc : 'var(--color-text-tertiary)',
                              background: isActive ? `${bc}08` : 'none',
                              border: 'none', cursor: 'pointer',
                              borderBottom: isActive ? `2px solid ${bc}` : '2px solid transparent',
                              marginBottom: -1,
                              whiteSpace: 'nowrap',
                              transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                            }}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Tab panel */}
                    <div style={{ padding: '14px 16px', minHeight: 72 }}>
                      {currentTab === 'problem' && (
                        <p style={{ fontSize: 13, lineHeight: 1.65, transition: 'var(--transition-colors)' }}>{product.problem}</p>
                      )}
                      {currentTab === 'decision' && (
                        <p style={{ fontSize: 13, lineHeight: 1.65, transition: 'var(--transition-colors)' }}>{product.decision}</p>
                      )}
                      {currentTab === 'learnings' && (
                        <p style={{ fontSize: 13, lineHeight: 1.65, transition: 'var(--transition-colors)' }}>{product.learnings}</p>
                      )}
                      {currentTab === 'features' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }} className="feat-grid">
                          {product.keyFeatures.map((f, i) => {
                            const title = f.includes(' — ') ? f.split(' — ')[0] : f;
                            return (
                              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ color: bc, fontSize: 13, flexShrink: 0, marginTop: 1, fontWeight: 600 }}>✓</span>
                                <span style={{ fontSize: 13, lineHeight: 1.55, transition: 'var(--transition-colors)' }}>{title}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {currentTab === 'impact' && (() => {
                        const impactItems = product.businessImpact?.length > 0
                          ? product.businessImpact
                          : (product.outcomes || []).map(o => ({ num: o.num, label: o.label, direction: 'up' }));
                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="impact-grid">
                            {impactItems.map((m, i) => {
                              const isUp = m.direction !== 'down';
                              return (
                                <div key={i} style={{ background: `${bc}08`, border: `0.5px solid ${bc}25`, borderRadius: 'var(--border-radius-md)', padding: '10px 12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 3 }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{m.num}</div>
                                    {m.direction !== undefined && <span style={{ fontSize: 12, fontWeight: 700, color: isUp ? '#34c759' : '#ff3b30', lineHeight: 1 }}>{isUp ? '↑' : '↓'}</span>}
                                  </div>
                                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.4 }}>{m.label}</div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </>
                );
              })()}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// ── MEDIA THUMB ───────────────────────────────────────────────────────────────

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&#]+)/);
  return match ? match[1] : null;
}

function MediaThumb({ item, company, onClick }) {
  const isVideo = item.type === 'video';
  const isPdf = item.type === 'pdf';
  const isYoutube = item.type === 'youtube';
  const isLink = item.type === 'link';
  const ytId = isYoutube ? getYouTubeId(item.url) : null;

  // External links open directly in new tab — no lightbox
  if (isLink) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          width: 96, height: 60,
          borderRadius: 'var(--border-radius-md)',
          border: '0.5px solid var(--color-border-tertiary)',
          background: item.color || 'var(--color-background-tertiary)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 3, cursor: 'pointer', position: 'relative',
          overflow: 'hidden', flexShrink: 0,
          textDecoration: 'none',
          transition: 'var(--transition-colors)',
        }}
      >
        <span style={{ fontSize: 16 }}>{item.icon || '🔗'}</span>
        <span style={{
          fontSize: 8, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '0 4px',
          lineHeight: 1.3,
        }}>
          {item.label}
        </span>
        <span style={{ fontSize: 8, color: 'var(--color-accent)', position: 'absolute', top: 4, right: 5 }}>↗</span>
      </a>
    );
  }

  // YouTube thumbnails open lightbox with embed
  if (isYoutube) {
    return (
      <button
        onClick={() => onClick({ ...item, company })}
        style={{
          width: 96, height: 60,
          borderRadius: 'var(--border-radius-md)',
          border: '0.5px solid var(--color-border-tertiary)',
          background: ytId ? `url(https://img.youtube.com/vi/${ytId}/mqdefault.jpg) center/cover` : '#e6f1fb',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 4, cursor: 'pointer', position: 'relative',
          overflow: 'hidden', flexShrink: 0,
          transition: 'var(--transition-colors)',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 24, height: 24, borderRadius: '50%',
          background: 'rgba(255,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '5px 0 5px 10px', borderColor: 'transparent transparent transparent white', marginLeft: 2 }} />
        </div>
        <span style={{
          fontSize: 8, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
          color: '#fff', position: 'absolute', bottom: 4, left: 0, right: 0, textAlign: 'center',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}>
          {item.label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick({ ...item, company })}
      style={{
        width: 96, height: 60,
        borderRadius: 'var(--border-radius-md)',
        border: '0.5px solid var(--color-border-tertiary)',
        background: item.color || 'var(--color-background-tertiary)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 4, cursor: 'pointer', position: 'relative',
        overflow: 'hidden', flexShrink: 0,
        transition: 'var(--transition-colors)',
      }}
    >
      {isVideo && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 20, height: 20, borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '4px 0 4px 8px', borderColor: 'transparent transparent transparent white', marginLeft: 2 }} />
        </div>
      )}
      <span style={{ fontSize: isPdf ? 14 : 16 }}>
        {isVideo ? '' : isPdf ? '📄' : '🖼'}
      </span>
      <span style={{
        fontSize: 8, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
        color: item.iconColor || (isPdf ? '#993c1d' : 'var(--color-text-tertiary)'),
        position: isVideo ? 'absolute' : 'static',
        bottom: isVideo ? 4 : 'auto', left: 0, right: 0, textAlign: 'center',
      }}>
        {item.label}
      </span>
    </button>
  );
}

// ── COMPANY CARD ──────────────────────────────────────────────────────────────

function CompanyCard({ company, onMediaClick }) {
  const [open, setOpen] = useState(false);
  const [csIdx, setCsIdx] = useState(0);
  const [narrativeExpanded, setNarrativeExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileRecsOpen, setMobileRecsOpen] = useState(false);
  const [mobileImpactOpen, setMobileImpactOpen] = useState(false);
  const [mobileCasesOpen, setMobileCasesOpen] = useState(false);
  const empColors = EMPLOYMENT_COLORS[company.employmentType] || EMPLOYMENT_COLORS['Full-time'];
  const allImpact = company.businessImpact?.length ? company.businessImpact : [];
  const hasRightCol = (company.caseStudies?.length > 0) || (allImpact.length > 0);

  // Brand color with opacity for border/shadow — convert hex to rgba
  const bc = company.brandColor || '#7c3aed';

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
      transition: 'var(--transition-colors)',
      border: `0.5px solid ${bc}2e`,
      boxShadow: `0 2px 14px ${bc}12, 0 1px 4px rgba(0,0,0,0.04)`,
    }}>

      {/* ── CARD BODY: 2-column grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: hasRightCol ? '1fr 260px' : '1fr' }} className="company-grid">

        {/* ══ LEFT COLUMN ══ */}
        <div
          className="company-left-col"
          style={{ padding: '20px 22px', borderRight: hasRightCol ? `0.5px solid ${bc}50` : 'none', cursor: 'pointer', transition: 'var(--transition-colors)' }}
          onClick={() => setOpen(o => !o)}
        >
          {/* Section 1: Logo + header row + description */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 0 }}>

            {/* Logo — fixed square */}
            <div style={{
              width: 54, height: 54, flexShrink: 0,
              borderRadius: 'var(--border-radius-md)',
              background: company.logo ? '#fff' : 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700,
              //color: 'var(--color-text-secondary)',
              overflow: 'hidden',
              padding: company.logo ? 6 : 0,
              flexShrink: 0,
              transition: 'var(--transition-colors)',
            }}>
              {company.logo
                ? <img src={company.logo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                : company.name.charAt(0)
              }
            </div>

            {/* Right of logo */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Header row: Company name · Designation · Employment type */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 0 }}>
                {company.website && company.website !== '#' ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: company.brandColor || 'var(--color-text-primary)', letterSpacing: '-0.02em', textDecoration: 'none', transition: 'color 300ms ease, opacity 300ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    {company.name}
                  </a>
                ) : (
                  <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: company.brandColor || 'var(--color-text-primary)', letterSpacing: '-0.02em', transition: 'var(--transition-colors)' }}>
                    {company.name}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>
                  {company.role}
                </span>
                <span className="year-mobile" style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', transition: 'var(--transition-colors)' }}>
                  {company.active ? company.year.replace(/–\s*$/, '') + ' – Present' : company.year}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: '2px 9px',
                  borderRadius: 'var(--border-radius-pill)',
                  background: empColors.bg,
                  border: `0.5px solid ${empColors.border}`,
                  color: empColors.color,
                  whiteSpace: 'nowrap',
                }}>
                  {company.employmentType}
                </span>
              </div>

              {/* Company description — desktop inline truncate / mobile collapsible */}
              <div className="desc-desktop">
                {(() => {
                  const LIMIT = 160;
                  const text = company.description;
                  const needsTrunc = text.length > LIMIT;
                  return (
                    <p style={{ fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.7, fontWeight: 400, transition: 'var(--transition-colors)' }}>
                      {!descExpanded && needsTrunc ? text.slice(0, LIMIT) + '… ' : text + ' '}
                      {!descExpanded && needsTrunc && (
                        <button onClick={e => { e.stopPropagation(); setDescExpanded(true); }} style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'var(--transition-colors)' }}>Read more ↓</button>
                      )}
                      {descExpanded && needsTrunc && (
                        <button onClick={e => { e.stopPropagation(); setDescExpanded(false); }} style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'var(--transition-colors)' }}>Show less ↑</button>
                      )}
                    </p>
                  );
                })()}
              </div>
              {/* Mobile: About Company toggle */}
              <div className="desc-mobile">
                <button
                  onClick={e => { e.stopPropagation(); setMobileAboutOpen(v => !v); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer', marginTop: 6 }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>About Company</span>
                  <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileAboutOpen ? '−' : '+'}</span>
                </button>
                {mobileAboutOpen && (
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-text-secondary)', padding: '8px 2px 4px', transition: 'var(--transition-colors)' }}>
                    {company.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Role narrative — 3-line clamp with inline Read more for all companies */}
          {company.roleNarrative && (
          <div style={{ height: '0.5px', background: `${bc}40`, margin: '14px 0' }} />
          )}
          {company.roleNarrative && (() => {
            const LIMIT = 240;
            const text = company.roleNarrative;
            const needsTrunc = text.length > LIMIT;
            return (
              <p style={{ fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.75, fontStyle: 'italic', transition: 'var(--transition-colors)' }}>
                {!narrativeExpanded && needsTrunc ? text.slice(0, LIMIT) + '… ' : text + ' '}
                {!narrativeExpanded && needsTrunc && (
                  <button onClick={e => { e.stopPropagation(); setNarrativeExpanded(true); }} style={{ fontSize: 11, fontWeight: 600, fontStyle: 'normal', color: 'var(--color-accent)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'var(--transition-colors)' }}>
                    Read more ↓
                  </button>
                )}
                {narrativeExpanded && needsTrunc && (
                  <button onClick={e => { e.stopPropagation(); setNarrativeExpanded(false); }} style={{ fontSize: 11, fontWeight: 600, fontStyle: 'normal', color: 'var(--color-accent)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'var(--transition-colors)' }}>
                    Show less ↑
                  </button>
                )}
              </p>
            );
          })()}

          {/* NON-FEATURED LAYOUT: Products in left column */}
          {!company.featuredLayout && company.products?.length > 0 && (
            <>
              <div style={{ height: '0.5px', background: `${bc}40`, margin: '14px 0' }} />
              {/* Desktop */}
              <div className="desc-desktop">
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>Products</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {company.products.map((p, i) => (
                    <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', transition: 'var(--transition-colors)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile toggle */}
              <div className="desc-mobile">
                <button onClick={e => { e.stopPropagation(); setMobileProductsOpen(v => !v); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Products · {company.products.length}</span>
                  <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileProductsOpen ? '−' : '+'}</span>
                </button>
                {mobileProductsOpen && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 2px 4px' }}>
                    {company.products.map((p, i) => (
                      <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', color: 'var(--color-text-primary)' }}>{p.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* FEATURED LAYOUT: Products + Recognitions in left column */}
          {company.featuredLayout && (
            <>
              <div style={{ height: '0.5px', background: `${bc}40`, margin: '14px 0' }} />
              {/* Desktop products */}
              <div className="desc-desktop">
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>Products</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {company.products.map((p, i) => (
                    <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', transition: 'var(--transition-colors)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>{p.name}</span>
                    </div>
                  ))}
                </div>
                {company.ratings?.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>Recognitions</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {company.ratings.map((r, i) => (
                        <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 10px 5px 8px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', textDecoration: 'none', transition: 'box-shadow 150ms ease, var(--transition-colors)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                          {r.logo ? <img src={r.logo} alt={r.source} onError={e => { e.currentTarget.style.display = 'none'; }} style={{ height: 16, maxWidth: 56, objectFit: 'contain', objectPosition: 'left center', display: 'block', flexShrink: 0 }} /> : <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: r.sourceColor || 'var(--color-accent)', flexShrink: 0 }}>{r.source}</span>}
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)', whiteSpace: 'nowrap' }}>{r.badge}</span>
                          <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Mobile: Products toggle */}
              <div className="desc-mobile">
                <button onClick={e => { e.stopPropagation(); setMobileProductsOpen(v => !v); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Products · {company.products.length}</span>
                  <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileProductsOpen ? '−' : '+'}</span>
                </button>
                {mobileProductsOpen && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 2px 4px' }}>
                    {company.products.map((p, i) => (
                      <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', color: 'var(--color-text-primary)' }}>{p.name}</span>
                    ))}
                  </div>
                )}
                {company.ratings?.length > 0 && (
                  <>
                    <button onClick={e => { e.stopPropagation(); setMobileRecsOpen(v => !v); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer', marginTop: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Recognitions · {company.ratings.length}</span>
                      <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileRecsOpen ? '−' : '+'}</span>
                    </button>
                    {mobileRecsOpen && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '8px 2px 4px' }}>
                        {company.ratings.map((r, i) => (
                          <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', color: 'var(--color-text-primary)' }}>{r.badge}</span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {/* Mobile: Business Impact + Case Studies toggles (right col hidden on mobile) */}
          {hasRightCol && (
            <div className="desc-mobile" onClick={e => e.stopPropagation()}>
              {allImpact.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <button
                    onClick={e => { e.stopPropagation(); setMobileImpactOpen(v => !v); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Business Impact · {allImpact.length}</span>
                    <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileImpactOpen ? '−' : '+'}</span>
                  </button>
                  {mobileImpactOpen && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '8px 2px 4px' }}>
                      {allImpact.map((m, i) => {
                        const isUp = m.direction !== 'down';
                        return (
                          <div key={i} style={{ padding: '9px 10px 8px', borderRadius: 'var(--border-radius-md)', background: `${bc}08`, border: `0.5px solid ${bc}28` }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
                              <span style={{ fontSize: 9, fontWeight: 800, color: isUp ? '#1a9e42' : '#d93025' }}>{isUp ? '↑' : '↓'}</span>
                              <span style={{ fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.num}</span>
                            </div>
                            <div style={{ fontSize: 11, lineHeight: 1.3, color: 'var(--color-text-secondary)' }}>{m.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              {company.caseStudies?.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <button
                    onClick={e => { e.stopPropagation(); setMobileCasesOpen(v => !v); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Case Studies · {company.caseStudies.length}</span>
                    <span style={{ fontSize: 14, color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{mobileCasesOpen ? '−' : '+'}</span>
                  </button>
                  {mobileCasesOpen && (
                    <div style={{ padding: '8px 2px 4px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {company.caseStudies.map((cs, i) => (
                        <div key={i} style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '10px 12px', border: `0.5px solid ${bc}40` }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 5 }}>{cs.title}</div>
                          <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--color-text-secondary)', marginBottom: cs.href && cs.href !== '#' ? 6 : 0 }}>{cs.result}</p>
                          {cs.href && cs.href !== '#' && (
                            <a href={cs.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>Read →</a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ RIGHT COLUMN — Case Studies + Business Impact (all cards) ══ */}
        {hasRightCol && <div className="company-right-col" style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 18, borderLeft: `0.5px solid ${bc}50`, transition: 'var(--transition-colors)', minWidth: 0, overflow: 'hidden', alignSelf: 'start' }}>

          {/* ── Company Business Impact ── */}
          {allImpact.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
                Business Impact
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {allImpact.map((m, i) => {
                  const isUp = m.direction !== 'down';
                  return (
                    <div key={i} style={{ padding: '9px 10px 8px', borderRadius: 'var(--border-radius-md)', background: `${bc}08`, border: `0.5px solid ${bc}28` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color: isUp ? '#1a9e42' : '#d93025' }}>{isUp ? '↑' : '↓'}</span>
                        <span style={{ fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{m.num}</span>
                      </div>
                      <div style={{ fontSize: 11, lineHeight: 1.3, color: 'var(--color-text-secondary)' }}>{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Case Studies carousel (all cards that have them) ── */}
          {company.caseStudies?.length > 0 && (() => {
            const cs = company.caseStudies[csIdx];
            const total = company.caseStudies.length;
            return (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>
                  Case Studies
                </div>
                <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', border: `0.5px solid ${bc}40`, transition: 'var(--transition-colors)', overflow: 'hidden', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    {cs.logo
                      ? <img src={cs.logo} alt="" title={cs.title} onError={e => { e.currentTarget.style.display = 'none'; }} style={{ height: 20, maxWidth: 130, objectFit: 'contain', objectPosition: 'left center', display: 'block' }} />
                      : <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', transition: 'var(--transition-colors)' }}>{cs.title}</span>
                    }
                    {total > 1 && (
                      <div style={{ display: 'flex', gap: 3 }}>
                        <button onClick={e => { e.stopPropagation(); setCsIdx(i => Math.max(0, i - 1)); }}
                          style={{ width: 22, height: 22, borderRadius: '50%', border: '0.5px solid var(--color-border-tertiary)', background: 'var(--color-background-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, opacity: csIdx === 0 ? 0.3 : 1, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>‹</button>
                        <button onClick={e => { e.stopPropagation(); setCsIdx(i => Math.min(total - 1, i + 1)); }}
                          style={{ width: 22, height: 22, borderRadius: '50%', border: '0.5px solid var(--color-border-tertiary)', background: 'var(--color-background-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, opacity: csIdx === total - 1 ? 0.3 : 1, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>›</button>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 10, transition: 'var(--transition-colors)', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cs.result}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {company.caseStudies.map((_, i) => (
                        <span key={i} onClick={e => { e.stopPropagation(); setCsIdx(i); }}
                          style={{ width: csIdx === i ? 14 : 5, height: 5, borderRadius: 3, background: csIdx === i ? bc : 'var(--color-border-tertiary)', cursor: 'pointer', transition: 'all 250ms ease' }} />
                      ))}
                    </div>
                    {cs.href && cs.href !== '#' && (
                      <a href={cs.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none' }}>
                        Read →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}


        </div>}

      </div>

      {/* ── EXPAND TOGGLE — only if products exist ── */}
      {company.products.length > 0 && <div
        onClick={() => setOpen(o => !o)}
        style={{
          borderTop: '0.5px solid var(--color-border-tertiary)',
          padding: '9px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'pointer', fontSize: 11, fontWeight: 500,
          color: 'var(--color-text-tertiary)',
          background: 'var(--color-background-secondary)',
          transition: 'background 150ms ease, var(--transition-colors)',
          userSelect: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-background-tertiary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-background-secondary)'}
      >
        <span>{open ? 'Collapse product details' : `View ${company.products.length} product${company.products.length > 1 ? 's' : ''} in detail`}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'inline-flex', fontSize: 12 }}
        >
          ↓
        </motion.span>
      </div>}

      {/* ── EXPANDED: product cards + ratings ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="company-products"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: `0.5px solid ${bc}30`,
              background: `linear-gradient(180deg, ${bc}0d 0%, ${bc}06 100%)`,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              {company.products.length > 1 && (
                <div className="section-label" style={{ marginBottom: 4 }}>
                  Products · {company.products.length} shipped
                </div>
              )}
              {company.products.map((p, idx) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  productIndex={idx + 1}
                  companyName={company.name}
                  brandColor={bc}
                  onMediaClick={onMediaClick}
                />
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .company-grid { transition: var(--transition-colors); }
        @media (max-width: 700px) {
          .company-grid { grid-template-columns: 1fr !important; }
          .company-right-col { border-left: none !important; border-top: 0.5px solid var(--color-border-tertiary) !important; }
        }
        .cs-scroll { scrollbar-width: none; }
        .cs-scroll::-webkit-scrollbar { display: none; }
        .rec-scroll { scrollbar-width: none; }
        .rec-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function Work() {
  const [ref, inView] = useInView();
  const [activeFilters, setActiveFilters] = useState(['fulltime']);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [showAllFulltime, setShowAllFulltime] = useState(false);
  const workScrollRef = useRef(null);

  function toggleFilter(key) {
    setActiveFilters(prev => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev;
        return prev.filter(k => k !== key);
      }
      return [...prev, key];
    });
    setShowAllFulltime(false);
  }

  const allVisible = COMPANIES.filter(c =>
    c.categories.some(cat => activeFilters.includes(cat))
  );

  // When only fulltime is active on desktop, show just the latest unless expanded
  // On mobile this is ignored — all are shown in horizontal scroll
  const isOnlyFulltime = activeFilters.length === 1 && activeFilters[0] === 'fulltime';
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const visible = (isOnlyFulltime && !showAllFulltime && !isMobile) ? allVisible.slice(0, 1) : allVisible;
  const hiddenCount = (isOnlyFulltime && !showAllFulltime && !isMobile) ? allVisible.length - 1 : 0;

  return (
    <section
      id="work"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Work · Products</SectionLabel>
        <h2 className="section-heading" style={{ marginBottom: 8 }}>
          Products I've built. <em>Results they've delivered.</em>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 32, transition: 'var(--transition-colors)' }}>
          Expand a company to see the products · expand a product for full details
        </p>

        {/* Filter pills */}
        <div
          className="work-filter-row"
          style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}
        >
          {FILTERS.map(f => {
            const on = activeFilters.includes(f.key);
            return (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--border-radius-pill)',
                  fontSize: 13, fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  border: `1.5px solid ${on ? 'var(--color-text-primary)' : 'var(--color-border-tertiary)'}`,
                  background: on ? 'var(--color-text-primary)' : 'transparent',
                  color: on ? 'var(--color-background-primary)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 64 }} className="timeline-outer">
          {/* Background line — faint fallback for top/bottom ends */}
          <div style={{
            position: 'absolute', left: 6, top: 8, bottom: 8,
            width: 8, background: 'var(--color-border-tertiary)',
            opacity: 0.25,
            transition: 'var(--transition-colors)',
          }} />

          <SwipeDots scrollRef={workScrollRef} count={visible.length} />
          <motion.div layout ref={workScrollRef} className="work-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <AnimatePresence mode="popLayout">
              {visible.map((company, i) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: easeStd }}
                  style={{ position: 'relative', marginBottom: 28 }}
                >
                  {/* Colored line — current company's color */}
                  {i < visible.length - 1 && (
                    <div
                      className="timeline-colored-line"
                      style={{
                        position: 'absolute',
                        left: -58,    /* 6 - paddingLeft(64) = -58, same x as bg line */
                        top: 24,
                        width: 8,
                        bottom: -32,
                        background: company.brandColor || 'var(--color-border-tertiary)',
                        opacity: 0.55,
                        borderRadius: 4,
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Year label — vertical, left of line */}
                  <div
                    className="timeline-year-label"
                    style={{
                      position: 'absolute',
                      left: -95,    /* right edge lands at ~x=4 from outer, 2px gap before line */
                      top: 4,
                      writingMode: 'vertical-lr',
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--color-text-tertiary)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.05em',
                      zIndex: 2,
                      transition: 'var(--transition-colors)',
                      transform: 'rotate(180deg)'
                    }}
                  >
                    {company.active ? company.year.replace(/–\s*$/, '') + ' – Present' : company.year}
                  </div>

                  {/* Dot — exactly centered on line: left=-paddingLeft, dot 20px, center=paddingLeft+left+10=10 */}
                  <div className="timeline-dot-wrapper" style={{ position: 'absolute', left: -64, top: 4, zIndex: 2 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      border: '2px solid var(--color-background-primary)',
                      background: company.active ? '#34c759' : company.brandColor || 'var(--color-text-primary)',
                      boxShadow: company.active ? '0 0 0 3px rgba(52,199,89,0.2)' : `0 0 0 3px ${company.brandColor ? company.brandColor + '33' : 'transparent'}`,
                      transition: 'var(--transition-colors)',
                    }} />
                  </div>

                  <CompanyCard company={company} onMediaClick={setLightboxItem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      {/* View / collapse previous experiences */}
      {isOnlyFulltime && hiddenCount > 0 && (
        <div className="container view-prev-exp" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <button
            onClick={() => setShowAllFulltime(v => !v)}
            style={{
              marginLeft: 64,
              padding: '10px 22px',
              borderRadius: 'var(--border-radius-pill)',
              border: '1.5px solid var(--color-border-tertiary)',
              background: 'transparent',
              fontSize: 13, fontWeight: 600,
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-tertiary)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
          >
            {showAllFulltime
              ? 'Collapse previous experiences ↑'
              : `View ${hiddenCount} previous experience${hiddenCount > 1 ? 's' : ''} ↓`}
          </button>
        </div>
      )}

      <style>{`
        .year-mobile { display: none; }
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .pd-grid { grid-template-columns: 1fr !important; }
          .outcome-row { grid-template-columns: repeat(2, 1fr) !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .timeline-outer { padding-left: 40px !important; }
          .timeline-dot-wrapper { left: -40px !important; }
          .timeline-colored-line { left: -34px !important; }
          .timeline-year-label { display: none !important; }
          .year-mobile { display: inline !important; }
          .work-filter-row { gap: 6px !important; }
          .work-filter-row button { padding: 6px 12px !important; font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .timeline-outer { padding-left: 32px !important; }
          .timeline-dot-wrapper { left: -32px !important; }
          .timeline-colored-line { left: -26px !important; }
        }
      `}</style>
    </section>
  );
}
