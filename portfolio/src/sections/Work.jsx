import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import Lightbox from '../components/Lightbox';
import SwipeDots from '../components/SwipeDots';

const easeStd = [0.25, 0.1, 0.25, 1];

// ── DATA ──────────────────────────────────────────────────────────────────────

const COMPANIES = [
  {
    id: 'pmgpt',
    categories: ['enterprise', 'building', 'founder'],
    year: '2025–',
    active: true,
    employmentType: 'Consulting',
    name: 'pmGPT',
    logo: '/pmgpt-logo.png',
    brandColor: '#1F71F7',
    website: 'https://pmgpt.ai',
    role: 'Passion Project',
    description: 'An AI-native operating system for product teams, orchestrating the entire lifecycle from research and PRDs to sprint execution through agentic workflows. It leverages integrations, RAG, and MCPs to turn fragmented tools and data into a unified, intelligent execution layer.',
    roleNarrative: 'I\'m building this end to end as a passion project, initially to explore vibe coding with Claude Code on real product problems I was facing as a product leader. What started as an experiment evolved into a well-structured system where I independently own everything from product design and agent definition to system architecture and hands-on development. The architectural choices I\'ve made, including the six-agent structure, three-tier LLM routing, and a privacy-first governance layer, were deliberate decisions to ensure the system is enterprise-ready from day one and not just functional. Building across the full stack has sharpened my instincts for where AI-native product design diverges from traditional software thinking, particularly around context management, agentic state persistence, and user trust in autonomous systems.',
    caseStudies: [],
    ratings: [],
    products: [
      {
        id: 'pmgpt-platform',
        name: 'pmGPT - Agentic AI OS for Product Teams',
        businessTags: ['B2B', 'SaaS'],
        headline: 'Six-agent architecture with three-tier LLM routing — privacy-first from day one.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'Agentic AI', cls: 'ptag-ai' },
        ],
        artifacts: [],
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
    categories: ['building', 'founder'],
    year: '2025–',
    active: true,
    employmentType: 'Consulting',
    name: 'Retailabs.AI',
    logo: '/retailabs-logo.avif',
    brandColor: '#0ea5e9',
    website: '#',
    role: 'Co-Founder & CPO',
    description: 'An AI-native retail intelligence platform enabling enterprises to automate decision-making across merchandising, pricing, campaigns, and store operations using agent-based systems. Converts raw retail signals into insights, decisions, and autonomous execution — replacing passive dashboards with action.',
    roleNarrative: 'Built Retailabs from ground zero as a hands-on product and AI operator. Own end-to-end platform architecture, product strategy, and enterprise problem discovery with FMCG and retail clients. Designed and developed AI agents across retail workflows, wrote agent logic and decision systems, and drove 0 to MVP to early PMF through rapid iteration loops. Pure 0 to 1 builder with direct ownership of product, technology, and business outcomes.',
    caseStudies: [],
    ratings: [],
    impactLabel: 'Expected Impact',
    businessImpact: [
      { num: '5–15%', label: 'Trade ROI uplift', level: 'up' },
      { num: '10–25%', label: 'campaign conversion', level: 'up' },
      { num: '2–5%', label: 'revenue uplift', level: 'up' },
      { num: '10–20%', label: 'stockout reduction', level: 'down' },
      { num: '2–4%', label: 'store traffic increase', level: 'up' },
      { num: '+50–150bps', label: 'margin lift', level: 'up' },
    ],
    products: [
      {
        id: 'retailabs-platform',
        name: 'Retailabs - Agentic AI OS for Retail Decisioning',
        businessTags: ['B2B', 'SaaS'],
        headline: 'Agent-based retail decisioning platform — converts signals → insights → decisions → execution across merchandising, pricing, campaigns, and store operations.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'Agentic AI', cls: 'ptag-ai' },
        ],
        artifacts: [
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=zockFHOF9ug&t=91s', label: 'Platform Demo', color: '#e6f1fb' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Unified data layer across POS, ERP, and supply chain systems',
          'Agent-based architecture — Demand, Pricing, Campaigns, and Merchandising agents',
          'LLM-powered reasoning + ML predictions for real-time decisions',
          'Decision automation workflows — not just recommendations, but execution',
          'Natural language interface for business users across retail teams',
          'Real-time execution and feedback loops for continuous improvement',
          'Modular deployment — fast enterprise POCs with incremental rollout',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Retail enterprises face fragmented data across POS, ERP, and supply chain; reactive and manual decision-making; poor visibility into demand, pricing, and execution gaps; heavy analyst dependency slowing execution; and no system to convert signals into actions. Result: revenue leakage, operational inefficiencies, and missed growth opportunities.',
        decision: 'Built an AI-first, agent-driven decisioning platform that converts signals → insights → decisions → execution. Focuses on automation over dashboards, uses LLMs + ML + real-time enterprise data, and enables fast enterprise POCs and modular deployments — meeting retail enterprises where they are without a rip-and-replace.',
        learnings: 'Enterprises adopt faster when you move from insights to execution — dashboards create passive consumers, agents create active outcomes. Data normalization is harder than AI modeling in retail; the quality of the signal layer determines everything downstream. POCs are the fastest path to enterprise trust and PMF. Retail decisions need localized, real-time intelligence — global models underperform without store-level context.',
        lastStatus: 'Active · 0→MVP stage. Running enterprise POCs with FMCG and retail clients. Seeking design partners for co-development.',
        outcomes: [
          { num: '10–25%', label: 'campaign conversion uplift' },
          { num: '10–20%', label: 'stockout reduction' },
          { num: '5–15%', label: 'trade ROI improvement' },
          { num: '+50–150bps', label: 'margin lift' },
        ],
      },
    ],
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
    description: 'An agentic AI creative and performance marketing platform that eliminates guesswork from creative production — generating signal-driven ad angles, testing hundreds of variations in parallel, and publishing marketplace-ready listings at scale across Meta, Google, TikTok, Amazon, Shopify, and Flipkart.',
    roleNarrative: 'My role was to drive product thinking and execution across the platform, shaping it from a creative tool into a performance-driven system. I worked on translating real customer and market problems into scalable workflows, while actively contributing to sales through demos, client conversations, and positioning the product to drive adoption and business outcomes. A key contribution was reframing the product narrative by shifting the conversation from creative quality to measurable performance outcomes like ROAS and CPA, which proved decisive in enterprise deals. I also helped define the roadmap for AngleLab and ListingLab, working directly with customers to validate use cases and move the platform toward a full performance marketing intelligence layer.',
    caseStudies: [{
        title: 'GreenGainz',
        result: 'Reduced CPA by 47% and achieved ~3.5x ROAS for GreenGainz by using AI-driven creative testing to identify and scale proof-based ad angles, focusing on comparisons, testimonials, and real user outcomes over brand-led storytelling.',
        href: 'https://www.phot.ai/case-studies/anglelab/greengainz',
      },
      {
        title: 'Home Crayons',
        result: 'Helped HomeCrayons achieve 4.41x ROAS by using AI-driven creative testing to identify and scale emotion-first ad angles, shifting focus from product features to customer-centric storytelling and improving conversions.',
        href: 'https://www.phot.ai/case-studies/anglelab/homecrayons',
      },
      {
        title: 'Chumbak',
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
        name: 'Phot.AI - AI Creative & Performance Studio',
        businessTags: ['B2B', 'B2C', 'SaaS'],
        headline: 'An agentic AI creative and performance marketing platform — AngleLab generates 8+ signal-driven ad angles in 60 seconds, ListingLab ships marketplace-ready listings at scale, and VideoLab produces video ads on demand. Built to eliminate creative guesswork and systematically lift ROAS and cut CPA for D2C brands and performance marketing teams across Meta, Google, TikTok, Amazon, and Shopify.',
        tags: [
          { label: '1→N', cls: 'ptag-journey' },
          { label: 'B2B · B2C', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'Gen AI', cls: 'ptag-ai' },
        ],
        artifacts: [],
        businessImpact: [],
        keyFeatures: [
          'AngleLab — 8+ signal-driven ad angles generated in under 60 seconds across Meta, Google, TikTok, and YouTube',
          'ListingLab — 8 marketplace-ready product images in ~12 minutes for Amazon, Shopify, Walmart, and Flipkart',
          'VideoLab — video ads and creative content produced at scale',
          '7 signal sources — brand intelligence, product data, performance metrics, and competitive gaps drive every creative',
          'Parallel angle testing — tests messaging, hooks, and creative execution simultaneously across segments',
          'Hybrid SaaS + managed execution — self-serve platform or fully managed creative production',
          '100K+ SKUs optimized and 2M+ product images generated across the platform',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Performance marketing teams lose ROAS to creative fatigue — 87% of ad angles fail without systematic testing, CTR drops 47% after two weeks, and manual listing creation takes 5+ hours per SKU. The root cause is guesswork: creatives are built on intuition rather than signals, making it impossible to identify and scale what actually converts before budget is burned.',
        decision: 'Built AngleLab and ListingLab as signal-driven, agentic creative systems. AngleLab uses 7 data sources — brand intelligence, product data, competitor gaps, and live performance signals — to generate and test 8+ ad variations in under 60 seconds, replacing slow sequential testing with parallel angle discovery. ListingLab automates end-to-end marketplace listing creation from a single image to fully compliant, SEO-optimized, multi-marketplace listings in minutes. My core contribution was repositioning the platform from a creative tool into a performance marketing engine — shifting the conversation from creative quality to measurable ROAS and CPA, which proved decisive in enterprise deals.',
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
        logo: '/automation-anywhere-logo.png',
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
        logo: '/cornerstone-logo.png',
        result: 'Cornerstone OnDemand, a global leader in talent management software, achieved 98% self-service resolution, improved CSAT by 5%, and increased same-day resolutions by 9% using AI-driven knowledge and search automation.',
        href: 'https://www.searchunify.com/resource-center/success-story/how-cornerstone-ondemand-achieved-a-98-self-service-resolution-rate-with-searchunify/',
      },
      {
        title: 'EBSCO',
        logo: '/ebsco-logo.png',
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
        name: 'Agentic Suite - Enterprise AI Agent Platform',
        businessTags: ['B2B', 'PaaS', 'Enterprise'],
        headline: 'Agentic Suite is an agentic AI platform that combines LLMs, workflows, and enterprise integrations to build and scale autonomous, goal-driven agents.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'PaaS', cls: 'ptag-type' },
          { label: 'Agentic AI', cls: 'ptag-ai' },
        ],
        artifacts: [],
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
        name: 'SUVA - AI Support Agent',
        businessTags: ['B2B', 'SaaS', 'Enterprise'],
        headline: 'SUVA is an enterprise AI assistant that delivers hyper-personalized, context-aware self-service experiences across channels.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'Agentic AI', cls: 'ptag-ai' },
        ],
        artifacts: [],
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
        name: 'Agent Helper - Real-Time AI Co-Pilot for Support Agents',
        businessTags: ['B2B', 'SaaS'],
        headline: "Agent Helper is an AI-powered support co-pilot that provides real-time context, automated responses, and intelligent recommendations to help agents resolve cases faster.",
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'Gen AI', cls: 'ptag-ai' },
        ],
        artifacts: [],
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
      { title: 'JioMart', result: 'Enabled JioMart voice search for Hindi and English users, processing 10M+ API calls and achieving 4.6 CSAT with improved engagement.', href: 'https://reverieinc.com/customer-success-stories/jio-mart/' },
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
        name: 'Cuberoot - Conversational Voice Agent Platform',
        website: 'https://reverieinc.com/products/cuberoot/',
        businessTags: ['B2B', 'SaaS'],
        headline: 'Cuberoot is an AI-powered voice agent platform that enables enterprises to build, deploy, and scale human-like, multilingual voice interactions across lead generation, collections, customer support and more across 22+ indic languages',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
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
    categories: ['enterprise', 'consulting'],
    year: '2022',
    active: false,
    employmentType: 'Consulting',
    name: 'OfficeBanao (Backed by Lightspeed VC)',
   logo: '/officebanao-logo.png',
    brandColor: '#121942',
    website: '#',
    role: 'Founding Member',
    description: 'A tech-enabled SaaS platform that streamlines the end-to-end office creation lifecycle, from design and procurement to execution, bringing transparency, efficiency, and scalability to a traditionally fragmented interiors ecosystem.',
    roleNarrative: 'I joined OfficeBanao as a founding member and Product Head, working closely with CXOs as the second hire to build the product portfolio from the ground up. I led everything from defining vision, strategy, and roadmap to setting up the team, tools, and execution frameworks, driving end-to-end product development. This journey took the product from inception to early maturity, onboarding the first successful customers and contributing to the initial fundraise. I later transitioned into a part-time consulting role to take the product to completion while moving to Reverie to deepen my focus on AI. Early on, navigating the operational complexity of a marketplace business and coordinating between enterprise clients and a fragmented vendor ecosystem gave me a deep understanding of how supply-side quality becomes the primary product variable in marketplace models, and how operationally intensive businesses need tight product-ops feedback loops from day one.',
    caseStudies: [],
    ratings: [
      { source: 'TechCrunch', logo: 'https://techcrunch.com/favicon.ico', badge: 'OfficeBanao raises $6M+ from Lightspeed VC', href: 'https://techcrunch.com/2023/04/10/officebanao-funding-lightspeed/', sourceColor: '#34a853' },
    ],
    businessImpact: [
      { num: '$2.2M', label: 'first-year sales', direction: 'up' },
      { num: '$6M+', label: 'Lightspeed funding secured', direction: 'up' },
      { num: '200+', label: 'Sq. ft. covered', direction: 'up' },
      { num: '20L+', label: 'Sq. ft. managed', direction: 'up' },
      { num: '40+', label: 'Cities pan India', direction: 'up' },
    ],
    products: [
      {
        id: 'ob-procurement-crm',
        name: 'OB Procurement - AI-Powered Supply Risk CRM',
        businessTags: ['B2B', 'SaaS'],
        headline: 'AI-based procurement platform for office interior projects that replaces WhatsApp threads and spreadsheets with intelligent material sourcing, automated RFQs, and real-time order visibility.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [
          { type: 'youtube', url: 'https://www.youtube.com/watch?v=OqiFVECkBG4&t=1s', label: 'Product Demo', color: '#e6f1fb' },
        ],
        businessImpact: [],
        keyFeatures: [
          'AI-assisted BOM generation from project scope and design specifications',
          'Automated RFQ dispatch and vendor quote comparison',
          'Supply risk flagging that identifies shortage risks 3 to 4 weeks ahead',
          'Material substitution recommendations when primary suppliers are unavailable',
          'End-to-end order tracking with delivery milestone alerts and delay escalations',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Interior project procurement was entirely reactive. Project managers manually estimated BOMs, sourced materials through personal vendor contacts, and tracked orders over WhatsApp. With material prices swinging 15 to 20% year on year and supply chains frequently disrupted, late decisions and last-minute substitutions cascaded into project delays and budget overruns.',
        decision: 'Built an AI-driven CRM that automated BOM creation from project specs, predicted supply risks early, and centralized all vendor communication and order tracking in one place. Shifting procurement from reactive to predictive gave teams the lead time to lock in pricing before commodity spikes and close sourcing gaps weeks before they hit the site.',
        learnings: 'In operationally intensive businesses, AI delivers its highest value when it works ahead of execution rather than during it. The teams who benefited most were not the ones with the deepest vendor relationships but the ones who had the fewest, because the CRM gave them instant access to a structured supply network they could not have built on their own.',
        lastStatus: 'Launched and operational. Contributed to a 29% reduction in procurement delays across projects.',
        outcomes: [
          { num: '29%', label: 'reduction in procurement delays' },
          { num: '11%+', label: 'uplift in project conversion rate' },
        ],
      },
      {
        id: 'ob-project-planning',
        name: 'OB Planner - AI Cost & Timeline Estimator',
        businessTags: ['B2B', 'SaaS'],
        headline: 'AI-based project planning tool that generates accurate cost estimates, auto-schedules material procurement, and surfaces budget and timeline risks before a single rupee is spent on site.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [],
        businessImpact: [],
        keyFeatures: [
          'AI cost estimation calibrated to project scope, location, and material grade',
          'Automated material scheduling aligned with trade-by-trade execution milestones',
          'Dependency mapping across contractors, suppliers, and site access windows',
          'Budget variance tracking with reforecasting as scope or prices change',
          'Scenario simulation for trade-offs between cost, timeline, and material specification',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Office interior project managers estimated costs and timelines from experience and gut instinct, with no tooling to model dependencies between procurement, labor, and site access. Labor costs inflating 10 to 15% annually and persistent material price volatility compounded that guesswork into systematic overruns. The industry averaged 15 to 25% budget variance with no reliable early warning system.',
        decision: 'Built a machine learning planning layer that used historical project data to generate calibrated cost and timeline estimates, auto-schedule material orders relative to execution milestones, and simulate risk scenarios before groundbreaking. The core insight was that the most valuable moment to intervene is pre-execution. Catching a procurement dependency gap in planning costs nothing. Catching it on site costs weeks.',
        learnings: 'Accuracy matters more than sophistication in tools people actually adopt. Teams trusted this product because the estimates were measurably better than their own, not because the AI was impressive. The biggest unlock was material scheduling. Starting procurement 3 to 4 weeks earlier than traditional timelines produced on-time delivery improvements that no amount of on-site coordination could have achieved.',
        lastStatus: 'Launched and operational. Contributed to a 19% reduction in project delivery time.',
        outcomes: [
          { num: '19%', label: 'reduction in delivery time' },
          { num: '±8%', label: 'budget variance vs industry average of ±20%' },
        ],
      },
      {
        id: 'ob-qa-app',
        name: 'OB QA - Mobile Site Quality Tracker',
        businessTags: ['B2B', 'Mobile'],
        headline: 'Mobile-first quality assurance app for on-ground site teams that replaces informal checklists with standardized SOPs, milestone sign-offs, and real-time KPI visibility across all active projects.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'Consumer App', cls: 'ptag-type' },
        ],
        artifacts: [],
        businessImpact: [],
        keyFeatures: [
          'Phase-wise SOPs and digital checklists for each stage of fit-out execution',
          'Photo and video evidence capture with geolocation stamps for milestone sign-off',
          'Real-time KPI dashboard for project managers across all active sites',
          'Defect flagging and escalation workflows with assigned accountability',
          'CSAT collection at handover with feedback loops into process improvement',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Quality on interior fit-out sites was invisible until it was too late. Site supervisors relied on paper checklists or informal processes, defects were discovered post-installation, and project managers had no real-time window into execution status across multiple sites. Accountability for rework was unclear, vendor disputes were common, and there was no structured feedback loop from delivery quality back into project planning.',
        decision: 'Built a mobile-first QA app that digitized execution tracking with structured SOPs, mandatory photo documentation at each milestone, and a live KPI dashboard for project managers. Making quality measurable in real time shifted teams from reactive rework to proactive defect prevention and gave clients a transparent view of execution progress that became a genuine differentiator in the sales process.',
        learnings: 'Execution quality is a data problem before it is a people problem. Site teams already knew what good work looked like. What they lacked was a structured process to surface deviations early and an accountability loop to act on them. The fastest adoption came from field supervisors rather than managers, because the app reduced their own documentation burden while giving them cover against disputed rework claims.',
        lastStatus: 'Launched and operational. Contributed to CSAT improvement of 24% and delivery time reduction of 19%.',
        outcomes: [
          { num: 'CSAT +24%', label: 'improvement in customer satisfaction' },
          { num: '19%', label: 'faster delivery with fewer rework cycles' },
        ],
      },
      {
        id: 'ob-store',
        name: 'OB Store - B2B Office Materials Marketplace',
        businessTags: ['B2B', 'eCommerce'],
        headline: 'B2B eCommerce marketplace for office fit-out materials that brings catalog transparency, standardized pricing, and bulk procurement to a historically fragmented and opaque supplier ecosystem.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B', cls: 'ptag-market' },
          { label: 'Marketplace', cls: 'ptag-type' },
        ],
        artifacts: [],
        businessImpact: [],
        keyFeatures: [
          'Curated multi-vendor catalogue with standardized SKUs and transparent pricing',
          'Bulk procurement discounts surfaced at point of selection',
          'Enterprise approval workflows and budget controls built into checkout',
          'Real-time inventory and lead-time visibility across supplier network',
          'Integrated with OB Procurement CRM for end-to-end order tracking',
        ],
        caseStudies: [],
        ratings: [],
        problem: "India's office interior supply chain is highly fragmented and unorganised. Buyers negotiate separately with dozens of suppliers, pricing is opaque, lead times are inconsistent, and there is no centralized channel to compare quality or access bulk discounts. This adds weeks to project timelines and introduces cost unpredictability that undermines every upstream plan.",
        decision: 'Built OB Store as the commerce entry point of the platform with a vetted supplier catalogue, standardized SKUs, transparent pricing, and enterprise procurement workflows. By aggregating supply into a single channel, project teams eliminated the quote-and-negotiate cycle and gained the cost predictability needed to plan projects accurately from day one.',
        learnings: 'Aggregating supply is significantly harder than building the storefront. The real product work was supplier onboarding, catalog standardization, and quality vetting rather than the eCommerce layer itself. Teams in Tier II and III cities adopted fastest because they had the fewest existing supplier relationships and gained the most from having centralized access to a vetted network.',
        lastStatus: 'Launched and operational as part of the OfficeBanao platform across 40+ cities.',
        outcomes: [
          { num: '$2.1M', label: 'business volume in first 6 months' },
          { num: '40+', label: 'cities with active vendor coverage' },
        ],
      },
    ],
  },

  {
    id: 'ingendynamics',
    categories: ['enterprise', 'consumer', 'consulting', 'parttime'],
    year: '2022',
    active: false,
    employmentType: 'Consulting',
    name: 'inGen Dynamics Inc.',
    logo: '/ingen-dynamics-logo.jpeg',
    brandColor: '#5C5D5F',
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
        name: 'Kaiser Haus - AI Smart Home & Surveillance',
        businessTags: ['B2C', 'IoT', 'Smart Home'],
        headline: 'Automated smart home with IoT automation — surveillance, security, and home intelligence for modern living.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'IoT', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
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
        name: 'Aido - AI Robot for Home & Healthcare',
        businessTags: ['B2B', 'B2C', 'Robotics', 'AI'],
        headline: 'An AI robotics and IoT startup focused on building intelligent systems for home automation and healthcare, leveraging machine learning, robotics, and computer vision, backed by 1,500+ Indiegogo backers and US investors.',
        tags: [
          { label: '1→N', cls: 'ptag-journey' },
          { label: 'B2B · B2C', cls: 'ptag-market' },
          { label: 'AI/ML', cls: 'ptag-ai' },
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

  // ── SHELVED IDEAS ─────────────────────────────────────────────────────────
  {
    id: 'zippy',
    categories: ['shelved', 'consumer', 'founder'],
    year: '2023',
    active: false,
    employmentType: 'Self-Initiated',
    name: 'Zippy',
    logo: '/zippy.png',
    brandColor: '#48B5BE',
    website: '#',
    role: 'Co-Founder and CEO',
    description: 'A hyperlocal quick-commerce platform designed to enable 60-minute delivery with real-time price discovery and live bargaining, connecting offline retailers to online demand through an AI-powered O2O marketplace. Built around a core thesis of bridging the massive gap between offline supply and online demand in India.',
    roleNarrative: 'Led Zippy as founder-CEO from concept to product development readiness in roughly 3 months. Defined the vision, business model, and product strategy from scratch. Led deep market research across offline retail and quick commerce gaps, designed end-to-end product flows, user journeys, and platform architecture, and built the core thesis around hyperlocal discovery, live bargaining, and instant delivery. Structured both supply-side seller onboarding and demand-side user experience, planned the city-level rollout with a hub-based ops model, and worked on early product development direction and system design. Pure 0 to 1 thinking across product, business, and market architecture.',
    caseStudies: [],
    ratings: [],
    impactLabel: 'Expected Impact',
    businessImpact: [
      { num: '~94K', label: 'projected orders per month in Year 1', direction: 'up' },
      { num: '$3.2M', label: 'GMV projected in Year 1', direction: 'up' },
      { num: '960+', label: 'sellers planned for early phase onboarding', direction: 'up' },
      { num: '27%', label: 'offline price advantage over online', direction: 'up' },
    ],
    products: [
      {
        id: 'zippy-platform',
        name: 'Zippy App - 60-Min Delivery & Live Bargaining',
        businessTags: ['B2C', 'Marketplace'],
        headline: 'Hyperlocal O2O commerce platform with 60-minute delivery, a live bargaining engine, and AI-powered inventory cataloging built to unlock the offline-to-online shift in Indian retail.',
        tags: [
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'Marketplace', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [
          { type: 'link', url: 'https://drive.google.com/file/d/1ygwuLeAkgcs90d8kCQG3c0-j74uYtZxC/view?usp=sharing', label: 'Product Pitch Deck', color: '#faece7', icon: '📄' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Auto-bargain and live bidding engine for gamified real-time price discovery',
          'EyeQ AI-based cataloging to digitize offline inventory at scale',
          '60-minute fulfillment system with real-time order tracking',
          'Hyperlocal hub model designed for cost-efficient last-mile delivery',
          'Assisted shopping via buyer-seller interaction and conversational commerce',
          'Voice-assisted commerce layer for low-tech seller and buyer segments',
          'Pan-India catalog vision targeting 1M+ offline stores',
        ],
        caseStudies: [],
        ratings: [],
        problem: "India's e-retail penetration sat at only 4.6% while over $100B in offline commerce remained undiscovered digitally. Customers waited 1 to 4 days for delivery despite the same products sitting in stores within 5 kilometres, often at prices 27% cheaper than online. Offline sellers had no viable path to digital demand, no tools to digitize inventory, and no ability to offer competitive pricing online. The result was a structural disconnect between abundant local supply and growing online demand that no existing platform was designed to close.",
        decision: 'Built Zippy around three interlocking ideas. First, 60-minute hyperlocal delivery using a hub-based operations model to unlock the speed advantage of nearby offline stock. Second, a live bargaining and bidding engine that gave consumers real price discovery and sellers a differentiated way to compete beyond static listings. Third, EyeQ, an AI-powered cataloging system that could digitize offline inventory at scale without manual effort, solving the supply-side onboarding problem that had blocked every previous O2O attempt in India.',
        learnings: 'Timing matters as much as the idea itself. Market velocity can outpace execution readiness and capital availability simultaneously. Operations-heavy businesses like quick commerce require deep capital commitment and full-time founding bandwidth from day one. The strongest ideas do not fail on merit. They either evolve with the right partners or get outpaced by capital-backed incumbents who arrived earlier. Founder alignment and full-time commitment are non-negotiable in 0 to 1 bets with high execution intensity.',
        lastStatus: 'Shelved at product development stage in 2022.',
        outcomes: [
          { num: '100x', label: 'faster delivery vs traditional ecommerce' },
          { num: '80%', label: 'lower delivery and warehousing cost model' },
          { num: '10-25%', label: 'built-in margin arbitrage from offline price gap' },
        ],
        whyShelved: 'Zippy was paused at the product development stage after a deliberate strategic assessment rather than a failed execution. The model required deep operational infrastructure including logistics, fulfillment hubs, and supply chain muscle that demanded significant capital before any unit economics could be validated. Co-founder bandwidth constraints meant not all founding members were positioned to commit full-time to a high-intensity build. Simultaneously, the quick-commerce market accelerated sharply with Zepto, Blinkit, and Swiggy Instamart scaling aggressively with institutional capital, narrowing the window for a bootstrapped entrant to establish an unfair advantage. The strategic call was to pause rather than burn limited capital in a hyper-competitive, execution-heavy market without strong backing. Zippy had genuine potential and I believe it would have been a meaningful business had we been in a different place in our lives, found co-founders who were fully aligned and ready to go all in, or secured the right partners to shoulder the operational weight. The idea was never the constraint. The timing, the team configuration, and the mental bandwidth were.',
      },
    ],
  },

  {
    id: 'petme',
    categories: ['shelved', 'consumer', 'founder'],
    year: '2022',
    active: false,
    employmentType: 'Self-Initiated',
    name: 'PetMe',
    logo: '/petme-logo.jpg',
    brandColor: '#D32575',
    website: '#',
    role: 'Co-Founder',
    description: 'A unified digital ecosystem for pet owners envisioned to combine services, commerce, and community under one platform, simplifying and enhancing the entire pet ownership journey from adoption to daily care and beyond.',
    roleNarrative: 'Explored PetMe as a consumer-first marketplace and ecosystem play, taking full ownership of market research across urban pet ownership and spending trends, problem discovery across services, adoption, and fragmented user journeys, and the design of a multi-sided marketplace connecting pet owners, service providers, and sellers. Defined the product vision, feature flows, and platform architecture, and mapped early go-to-market through community-led engagement and retention loops. The focus was on identifying and structuring a high-emotion, high-retention consumer category with strong long-term potential.',
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [
      {
        id: 'petme-platform',
        name: 'PetMe App - All-in-One Pet Ecosystem',
        businessTags: ['B2C', 'Marketplace'],
        headline: 'All-in-one pet ecosystem bringing together adoption, verified services, commerce, community, and lifecycle tracking under a single platform for urban pet owners.',
        tags: [
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'Marketplace', cls: 'ptag-type' },
        ],
        artifacts: [
          { type: 'link', url: 'https://www.instagram.com/petme__official', label: '@petme__official', color: '#fce7f3', icon: '📸' },
        ],
        businessImpact: [],
        keyFeatures: [
          'Pet discovery and adoption platform with structured profiles and history',
          'Verified and rated service marketplace covering vets, grooming, and boarding',
          'Commerce layer for food, accessories, and essentials with repeat purchase flows',
          'Community layer for peer engagement, reviews, and trust-building',
          'Unified pet owner dashboard with lifecycle tracking and care history',
          'Subscription and recurring commerce model for high-frequency essentials',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'The pet ecosystem in India was deeply fragmented with no single discovery layer connecting owners to services, products, and community. Trust in providers like vets, groomers, and boarding facilities was largely word-of-mouth and offline. There was no structured way to manage a pet\'s lifecycle digitally, and the overall experience across adoption, services, and commerce was disconnected, inconsistent, and opaque. The result was an inefficient and trust-deficient ownership journey for a category where emotional stakes are extremely high.',
        decision: 'Designed PetMe around a single positioning thesis: one platform for everything your pet needs. The architecture brought together four interlocking layers. First, adoption and discovery to solve the unstructured and trust-deficient entry point into pet ownership. Second, a verified service marketplace to replace word-of-mouth with rated, accountable providers. Third, a commerce layer to capture the high-frequency repeat spend that makes pet households economically valuable. Fourth, a community and engagement layer to drive organic retention and build the kind of trust moat that transactional platforms cannot replicate.',
        learnings: 'Emotional consumer categories demand a level of empathy and conviction from the founder that goes beyond market sizing. Marketplace success in trust-sensitive verticals depends more on supply quality and vetting than on demand acquisition. Community is not a feature in a category like this. It is the primary growth and retention engine. Consumer platforms with high emotional stakes require patient capital and long-term conviction, and the founder\'s personal relationship with the problem space is as important as the opportunity itself.',
        lastStatus: 'Shelved at concept stage.',
        outcomes: [],
        whyShelved: 'The decision to step back from PetMe came from an early and honest self-assessment. I was not a pet owner or a pet lover, and I could not personally relate to the daily emotional realities of the user I was building for. The idea initially came together around a market opportunity and two co-founders who were genuinely connected to the pet space. But when you are working with co-founders who are 30 plus in age, getting the full-time commitment, the conviction, and the raw hustle that a 0 to 1 consumer build demands is a very different challenge. That energy and intensity is not something you can manufacture. The co-founders were drawn to the space but not at a stage in their lives where they could throw everything at it. Without that founding alignment and without the personal founder-problem fit that a high-emotion category like this demands, building would have meant compromising on the very things that make consumer platforms succeed. The market was real and the opportunity remains. But this needed the right team with the right personal connection to the problem, and that combination was not there.',
      },
    ],
  },

  {
    id: 'discovr',
    categories: ['enterprise', 'fulltime', 'founder'],
    year: '2017–22',
    active: false,
    employmentType: 'Full-time',
    brandColor: '#0B0D27',
    name: 'Discovr.AI (Backed by ONGC, Micromax & Banking HNIs)',
    logo: '/discovr-ai-logo.jpeg',
    website: '#',
    role: 'Co-Founder, Chief Product Officer',
    description: 'A full-stack AI/ML platform built by productizing internal computer vision, document intelligence, predictive analytics, and decision support capabilities into reusable enterprise grade engines. Started with 0 to 1 deployments across government and enterprise clients and evolved into a scalable SaaS platform that reduced AI solution development time from months to weeks. Operates as the B2B vertical of Red Ginger Technologies, backed by Micromax, ONGC, and prominent HNIs.',
    roleNarrative: 'As Co-founder and Chief Product Officer, I led the full product and AI journey from early deployment-led learning to platform productization. The core thesis was to convert internal AI capabilities across computer vision, document intelligence, and predictive analytics into reusable modular engines that any enterprise could deploy without an in-house ML team. We partnered with leading enterprises and government bodies including Reliance Jio, Tata Steel, ONGC, the Indian Army, Cairn Vedanta, Texas Instruments, NITI Aayog, and the Telangana Government, running POCs, MVPs, and live deployments to acquire data, validate problems, and refine models. Building enterprise trust in AI was one of the hardest challenges, particularly with defence and government clients where on-prem deployment, air-gapped environments, and explainability were hard requirements and not optional features. Managing investor relationships with Micromax and ONGC while simultaneously shipping product and closing deployments sharpened my discipline around prioritization and knowing when to double down versus when to evolve the platform.',
    caseStudies: [
      { title: 'ONGC', result: 'Automated pipeline defect detection with predictive maintenance, reducing manual inspection cost by 40%.', href: '#' },
      { title: 'Indian Army', result: 'Air-gapped on-prem surveillance deployment for perimeter security at two installations.', href: '#' },
      { title: 'Tata Steel', result: 'Automated document classification for 5M+ procurement documents with 60% faster processing.', href: '#' },
      { title: 'Telangana Government', result: 'Citizen grievance classification system processing 50K+ submissions per month.', href: '#' },
    ],
    ratings: [],
    businessImpact: [
      { num: '$10M+', label: 'efficiency gains delivered across industrial deployments', level: 'up' },
      { num: '30+', label: 'enterprise and government clients across industries', level: 'up' },
      { num: '5M+', label: 'documents processed for enterprise intelligence clients', level: 'up' },
      { num: 'Months to Weeks', label: 'AI solution development time reduced via platform productization', level: 'up' },
    ],
    products: [
      {
        id: 'discovr-netra',
        name: 'Netra - Computer Vision Engine',
        businessTags: ['B2B', 'B2G'],
        headline: 'Computer vision engine powering real-time surveillance, anomaly detection, and visual intelligence across industries. Deployed across government, defence, manufacturing, and oil and gas.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B · B2G', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [],
        businessImpact: [
          { num: 'Multi-state', label: 'government scale surveillance systems enabled', level: 'up' },
          { num: '40%', label: 'manual monitoring cost reduction for industrial clients', level: 'down' },
          { num: 'Hong Kong', label: 'semiconductor defect detection deployed for manufacturing client', level: 'up' },
          { num: '2 Installations', label: 'Indian Army air-gapped on-prem perimeter surveillance', level: 'up' },
        ],
        keyFeatures: [
          'Criminal profiling and tracking using CCTV feeds for government and police deployments',
          'Fire and smoke detection for industrial safety and hazard prevention',
          'Intruder detection via thermal imaging for defence and perimeter security',
          'Traffic analytics and ANPR systems for smart city deployments',
          'Semiconductor defect detection on conveyor belts for manufacturing clients',
          'On-prem and air-gapped deployment for defence and government environments',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Industries had massive CCTV and sensor data but zero intelligence layer. Monitoring was manual, reactive, and error prone with no scalable way to detect anomalies in real time across distributed camera networks. Custom CV projects took 6 to 18 months and cost ₹50L or more per deployment, making enterprise AI adoption practically infeasible without a platform approach.',
        decision: 'Built a modular CV engine supporting multiple use cases on the same backbone including criminal profiling, fire and smoke detection, thermal intrusion detection, traffic analytics, and industrial defect detection. Chose a multi-use architecture over single-use to maximize reusability across client deployments and reduce time to production. Edge plus real-time inference was a core design requirement given the latency constraints of surveillance and manufacturing use cases.',
        learnings: 'CV platforms win when they are multi-use and not single-use. A single backbone with multiple deployment templates reduced new use case development time from months to weeks. Edge and real-time inference is critical for adoption in surveillance and manufacturing contexts. Enterprise trust in CV systems depends entirely on precision and very low false alert rates because a false alarm in defence or industrial safety has real consequences. On-prem deployment was a non-negotiable requirement for defence and government clients and needed to be designed in from day one.',
        lastStatus: 'Evolved. Integrated into the full Discovr.AI SaaS platform. Multiple enterprise and government deployments remain active.',
        outcomes: [
          { num: '30+', label: 'enterprise and govt clients' },
          { num: '40%', label: 'monitoring cost reduction' },
          { num: '5+', label: 'use case verticals' },
          { num: 'Air-gapped', label: 'defence deployments' },
        ],
      },
      {
        id: 'discovr-caravan',
        name: 'Caravan - Document Intelligence',
        businessTags: ['B2B', 'B2G'],
        headline: 'End to end document intelligence platform digitizing large volumes of unstructured enterprise documents and building a searchable intelligence layer on top. Deployed across energy, manufacturing, and government sectors.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B · B2G', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [
          { type: 'link', url: 'https://startup.ongc.co.in/home', label: 'ONGC Startup', color: '#0B0D27', icon: '🔗' },
        ],
        businessImpact: [
          { num: '5M+', label: 'procurement documents processed for Tata Steel with 60% faster processing', level: 'up' },
          { num: '60%', label: 'reduction in document processing time across enterprise clients', level: 'down' },
          { num: 'Cairn Vedanta', label: 'energy sector document intelligence system deployed', level: 'up' },
          { num: '50K+', label: 'citizen grievance submissions processed monthly for Telangana Government', level: 'up' },
        ],
        keyFeatures: [
          'Document digitization at scale using OCR and layout understanding',
          'Structured data extraction from invoices, contracts, and technical documents',
          'Semantic search layer enabling full-text and entity-based querying',
          'Domain-specific NLP tuning for energy, legal, and procurement verticals',
          'Deployed for Cairn Vedanta and Tata Steel document processing workflows',
          'API and processing layer enabling SaaS monetization by document volume',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Enterprises had huge unstructured document repositories with no easy way to search, extract, or analyze information. Manual document workflows were slow, non-scalable, and error prone. OCR tools existed but produced output requiring significant manual cleanup with no intelligence layer on top. Domain-specific vocabulary in energy, legal, and procurement further broke generic solutions.',
        decision: 'Built an OCR and NLP pipeline combining document digitization, structured data extraction, and a semantic search layer. Designed for real-world use cases including invoice digitization, enterprise document processing for energy sector clients like Cairn Vedanta, and large-scale government document intelligence. Domain-specific model tuning was built into the core architecture to handle language variance across industries. Monetized via API and volume-based processing layers to create a scalable SaaS revenue model.',
        learnings: 'OCR alone is a feature and search plus usability is the product. Structured output drives actual business value and not raw text extraction. Domain-specific model tuning massively improves outcomes for industries with specialized vocabulary. Enterprises adopt document AI fastest when the output integrates directly into existing workflows rather than creating a new interface. Tata Steel and Cairn Vedanta deployments proved that procurement and energy verticals had the highest willingness to pay for document intelligence at scale.',
        lastStatus: 'Evolved. Integrated into Discovr.AI platform. Enterprise document processing deployments continue to run.',
        outcomes: [
          { num: '5M+', label: 'documents processed' },
          { num: '60%', label: 'faster processing' },
          { num: '50K+', label: 'submissions/month' },
          { num: 'Energy + Govt', label: 'key verticals' },
        ],
      },
      {
        id: 'discovr-moksha',
        name: 'Moksha - Predictive Intelligence',
        businessTags: ['B2B', 'B2G'],
        headline: 'AI engine for predictive maintenance and industrial intelligence using time-series and sensor data. Built for manufacturing, oil and gas, and heavy industry deployments.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B · B2G', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [],
        businessImpact: [
          { num: '$10M+', label: 'efficiency gains delivered across industrial deployments', level: 'up' },
          { num: '40%', label: 'reduction in manual inspection cost at ONGC via pipeline defect detection', level: 'down' },
          { num: 'Uptime', label: 'improved operational efficiency across manufacturing clients', level: 'up' },
          { num: 'Multi-sector', label: 'energy optimization, inventory and scheduling efficiency improved', level: 'up' },
        ],
        keyFeatures: [
          'Time-series anomaly detection for industrial sensor and equipment data',
          'Failure prediction models for manufacturing and oil and gas equipment',
          'Maintenance scheduling recommendations integrated with existing operations systems',
          'Real-time alerts and dashboards for operations teams',
          'Deployed for ONGC pipeline defect detection reducing manual inspection cost by 40%',
          'Domain-specific calibration for manufacturing, energy, and industrial environments',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Industries operated on reactive maintenance cycles meaning equipment failed before being fixed. Sensor data existed across production floors but was underutilized and rarely analyzed in real time. Equipment failures caused major downtime losses and the cost of unplanned maintenance was multiples of planned maintenance. ONGC pipelines alone represented significant risk exposure due to the absence of an intelligent monitoring layer.',
        decision: 'Built predictive models for failure prediction, anomaly detection in time-series sensor data, and maintenance scheduling recommendations. Layered the engine with real-time dashboards and alerts to give operations teams visibility before failures occurred. Chose to prioritize interpretability alongside accuracy because industrial operations teams needed to understand and trust predictions before acting on them. Domain-specific calibration was built into deployment methodology for each client environment.',
        learnings: 'Data pipelines matter more than ML models in industrial AI. Clean and reliable sensor data ingestion is the hardest part of the problem and the ML is secondary. Industrial AI requires deep domain calibration to understand what a normal versus anomalous reading means in context. Adoption depends on interpretability and not just accuracy. Operations teams act on predictions only when they understand why the system flagged an issue. ROI storytelling in terms of downtime cost avoided was the most effective way to drive procurement decisions.',
        lastStatus: 'Evolved. Integrated into Discovr.AI platform. ONGC and manufacturing deployments remain active.',
        outcomes: [
          { num: '$10M+', label: 'efficiency gains delivered' },
          { num: '40%', label: 'inspection cost reduction' },
          { num: 'ONGC', label: 'pipeline deployment' },
          { num: 'Real-time', label: 'anomaly detection' },
        ],
      },
      {
        id: 'discovr-nirvana',
        name: 'Nirvana - Decision Intelligence',
        businessTags: ['B2B', 'B2G'],
        headline: 'Central intelligence layer integrating multiple AI systems to deliver actionable insights and unified decision support across enterprise operations.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2B · B2G', cls: 'ptag-market' },
          { label: 'SaaS', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [],
        businessImpact: [
          { num: '$14M+', label: 'efficiency gains delivered across industrial setups', level: 'up' },
          { num: 'Unified', label: 'intelligence layer across CV, document, and predictive AI outputs', level: 'up' },
          { num: 'Energy', label: 'optimization improvements across deployed enterprise environments', level: 'up' },
          { num: 'Inventory', label: 'movement and scheduling efficiency improved for manufacturing clients', level: 'up' },
        ],
        keyFeatures: [
          'Unified data integration layer connecting CV, document, predictive, and third-party enterprise systems',
          'Real-time and historical analytics combined into a single decision surface',
          'Actionable recommendations engine for operations and executive teams',
          'Enterprise-grade access controls and role-based views',
          'Horizontal platform design enabling deployment across the full Discovr.AI product suite',
          'ROI reporting layer translating AI outputs into quantified business impact',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Data was siloed across systems and functions. Insights were delayed, fragmented, and rarely acted upon. Enterprises had invested in multiple point solutions that did not communicate with each other. There was no unified layer to turn data from different sources into a coherent decision support system. Leadership teams were looking at dashboards that described the past but provided no forward-looking recommendations.',
        decision: 'Built a unified analytics and AI platform integrating multiple data sources, combining real-time and historical insights, and delivering actionable recommendations to operations and leadership teams. Designed Nirvana as a horizontal decision layer that could sit on top of Netra, Caravan, and Moksha outputs as well as third-party enterprise systems. ROI reporting was built into the platform from day one to give procurement teams the quantified justification needed to expand deployments.',
        learnings: 'Dashboards do not sell and decisions do. Enterprises do not pay for beautiful data visualization. They pay when a specific recommendation demonstrably saved or earned money. Integration across the full data lifecycle is the hardest engineering challenge in enterprise AI. ROI storytelling at the executive level in the language of cost avoided and efficiency gained is the single most effective procurement accelerator. Building Nirvana as the intelligence layer across all four engines gave us a platform story that individual products could not tell on their own.',
        lastStatus: 'Evolved. Served as the unifying intelligence layer across the full Discovr.AI platform suite.',
        outcomes: [
          { num: '$14M+', label: 'efficiency gains' },
          { num: '4 engines', label: 'unified under one layer' },
          { num: 'Energy + Mfg', label: 'key verticals' },
          { num: 'Executive', label: 'decision support' },
        ],
      },
    ],
  },

  {
    id: 'onelabs',
    categories: ['consumer', 'fulltime', 'founder'],
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
    ratings: [
      {
        source: 'YourStory',
        logo: 'https://images.yourstory.com/cs/images/yourstory_logo.png',
        badge: 'Micromax invested in inOne',
        label: 'Micromax invests in AI startup One Labs, creator of super-app inOne',
        href: 'https://yourstory.com/2018/03/micromax-invests-ai-startup-one-labs-creator-super-app-inone',
        sourceColor: '#e8612c',
      },
      {
        source: 'Economic Times',
        logo: 'https://economictimes.indiatimes.com/favicon.ico',
        badge: 'Angel Round — Yana AI',
        label: 'AI-powered app GetYana raises undisclosed sum in Angel round',
        href: 'https://economictimes.indiatimes.com/small-biz/startups/ai-powered-mobile-app-getyana-raises-undisclosed-sum-in-angel-round/articleshow/51503550.cms',
        sourceColor: '#003580',
      },
      {
        source: 'Inc42',
        logo: 'https://inc42.com/favicon.ico',
        badge: 'Seed Funding — Yana AI',
        label: 'Yana AI raises seed funding',
        href: 'https://inc42.com/flash-feed/yana-ai-raises-seed-funding/',
        sourceColor: '#1a1a2e',
      },
    ],
    products: [
      {
        id: 'onelabs-foodbox',
        name: 'FoodBox - All-in-One Food App with Best Deals & Coupons',
        businessTags: ['B2C', 'eCommerce'],
        headline: 'an all-in-one food app designed for price-sensitive users, transforming the journey from dish-driven discovery to coupon-driven choices of the day. It enables users to discover the best deals, decide what to eat, and book orders natively on the platform without needing to download multiple apps.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'Consumer App', cls: 'ptag-type' },
        ],
        artifacts: [],
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
        name: 'inOne - Super App for Everything',
        businessTags: ['B2C', 'eCommerce'],
        headline: 'Food aggregator and productivity super-app — 50+ vendor integrations.',
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'Consumer App', cls: 'ptag-type' },
        ],
        artifacts: [
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
        name: 'Yana - India\'s Vernacular Voice Assistant',
        businessTags: ['B2C', 'Consumer App'],
        headline: "a vernacular AI assistant designed as India's answer to Siri and Alexa, going beyond conversational and in-built mobile actions to enable real-world transactions like groceries, cabs, and services through voice and native integrations, powered by in-house ML-based intent recognition and classification engines.",
        tags: [
          { label: '0→1', cls: 'ptag-journey' },
          { label: 'B2C', cls: 'ptag-market' },
          { label: 'Consumer App', cls: 'ptag-type' },
          { label: 'AI/ML', cls: 'ptag-ai' },
        ],
        artifacts: [
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
  // ── D2C / SELF-INITIATED ──────────────────────────────────────────────────
  {
    id: 'khuraq',
    categories: ['d2c', 'consumer', 'founder'],
    year: '2021',
    active: false,
    employmentType: 'Self-Initiated',
    name: 'Khuraq Healthcare',
    logo: '/Khuraq-logo.png',
    brandColor: '#383838',
    website: 'https://mykhuraq.com',
    role: 'Co-Founder & CEO',
    description: 'A Gurugram-based premium nutraceutical brand built to make daily supplementation more convenient for Indian consumers through modern vegetarian gummy formats. Incorporated in August 2021 with a long term ambition of building one of India\'s most trusted nutraceutical brands and eventually expanding into a broader own label organic and wellness marketplace.',
    roleNarrative: 'Built and scaled Khuraq as a founder led D2C nutraceutical business from product thesis to early traction. Defined the category thesis, product strategy, and long term brand ambition. Selected the initial product line across ACV, Biotin, and Melatonin gummies. Built the early GTM and performance marketing motion and managed marketplace expansion across Amazon, Flipkart, and Meesho. Ran customer engagement loops through free fitness plans, community nudges, and post purchase retention efforts. Started operations in house and later worked with an agency to improve distribution and scale execution. Conducted deep competitor, unit economics, and repeat behavior analysis before deciding to pause.',
    caseStudies: [],
    ratings: [],
    businessImpact: [
      { num: '80+', label: 'orders per day at peak demand', level: 'up' },
      { num: '~5%', label: 'return rate across fulfilled orders', level: 'down' },
      { num: '3', label: 'marketplace channels across Amazon, Flipkart and Meesho', level: 'up' },
      { num: 'Investor', label: 'soft interest received before strategic pause', level: 'up' },
    ],
    products: [
      {
        id: 'khuraq-com',
        name: 'Khuraq - Premium D2C Nutraceutical Brand',
        businessTags: ['D2C'],
        headline: 'Modern vegetarian gummy supplements for everyday Indian wellness. ACV, Biotin, and Melatonin built for habit and convenience.',
        tags: [
          { label: 'D2C', cls: 'ptag-type' },
        ],
        artifacts: [
          { type: 'link', url: 'https://www.instagram.com/khuraq.store', label: 'khuraq.store', color: '#383838', icon: '📸' },
        ],
        businessImpact: [
          { num: '~86%', label: 'gross margin on product and packaging alone', level: 'up' },
          { num: '~50%', label: 'contribution margin before CAC and after logistics and platform fees', level: 'up' },
          { num: '~34%', label: 'first order contribution margin negative after full CAC allocation', level: 'down' },
          { num: '15–27%', label: 'repeat rate across SKUs with melatonin at the higher end', level: 'up' },
        ],
        keyFeatures: [
          '100% vegetarian gummy supplements across ACV, Biotin, and Melatonin formats',
          'Functional use cases covering weight support, hair support, and sleep',
          'Marketplace presence across Amazon, Flipkart, and Meesho',
          'D2C brand positioning led by performance marketing',
          'Free fitness plans and community nudges to deepen post purchase engagement',
          'Founder led operations scaled with agency support for broader distribution',
        ],
        caseStudies: [],
        ratings: [],
        problem: 'Indian consumers were increasingly health aware but traditional supplement formats felt medicinal, inconvenient, or unengaging. Gummies offered a more approachable lifestyle friendly format. The deeper problem, which only became visible after operating in the category, was that most consumers liked the idea of wellness more than the discipline of wellness. People bought off ads and aspiration but did not always build habits or restock unless results were visible quickly. Indian mass consumers were more price conscious, routine resistant, and skeptical than top down market reports suggested. The real challenge was not just making supplements easier to take. It was building a repeat led wellness business in a market where aspiration is high but habit strength is structurally weak.',
        decision: 'We decided to build Khuraq as a modern premium nutraceutical brand anchored in 100% vegetarian gummy formats across easy to consume everyday health categories. The product line was scoped around functional use cases including weight support, hair support, and sleep. Distribution was designed as a D2C plus marketplace combination to capture both brand owned and discovery led demand. The long term ambition was not to become another supplement seller but to build India\'s best nutraceutical company and eventually evolve into a broader trust led marketplace for organic and nutraceutical products with in house labels and stronger consumer ownership over time.',
        learnings: 'Category size is not the same as business quality. A large and growing market can still produce poor repeat economics if consumer behavior is shallow. Aspiration buys the first order but only noticeable results buy the second. Great creative triggers curiosity but only visible outcomes create retention. Melatonin stood out because it delivered a more immediate consumer experience, which made it a better candidate for habit formation and trust building. India is more behaviorally complex than surface level trend reports suggest. Consumers may express interest in wellness but many do not change routines or restock without a strong functional or emotional trigger. Gummies are a format advantage but not a product moat. They improve compliance and approachability but by themselves they do not solve repeat. A profitable wellness business needs stronger product architecture with hero products, faster trust signals, and better retention mechanics. Sometimes pausing is the smart founder move. We had traction and soft investor interest but chose discipline over momentum theater.',
        lastStatus: 'Paused. Strategically paused after identifying weak repeat economics, high CAC pressure, and the need for stronger hero SKUs for profitable scale.',
        whyShelved: 'We paused Khuraq not because the category lacked opportunity but because the initial product line was not strong enough to support durable and profitable scale. Outside melatonin, most gummies did not create noticeable short term changes for users, which made it much harder to build conviction, restocking behavior, and word of mouth momentum. The unit economics told a clear story. Product and packaging cost was approximately ₹82 per unit against a selling price of ₹599 to ₹799, giving a gross margin of roughly 86%. However once logistics cost of ₹70 to ₹120 and platform fees plus ad costs of around ₹150 were added, contribution margin before CAC fell to roughly 50%. After allocating CAC of ₹500 to ₹700 per order, first order contribution margin turned deeply negative at around minus 34%. Repeat rates were 27% for melatonin and 15% for other products, which was not strong enough to recover CAC at the current economics. The category was also capital intensive and even well funded players in adjacent wellness categories were struggling to build strong unit outcomes. Rather than force scale into a model that was not yet working at the unit level, we chose to pause, reassess, and consider a stronger future re-entry with a differentiated portfolio, sharper hero SKUs, and a more premium trust led strategy.',
        outcomes: [
          { num: '80+', label: 'orders per day at peak' },
          { num: '~86%', label: 'gross margin on product' },
          { num: '~50%', label: 'pre-CAC contribution margin' },
          { num: '~5%', label: 'return rate' },
        ],
      },
    ],
  },

  // ── EARLIER CAREER ────────────────────────────────────────────────────────
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
    caseStudies: [],
    ratings: [],
    businessImpact: [],
    products: [],
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
    products: [],
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

];

// ── FILTER CONFIG ─────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'fulltime', label: 'Full-time' },
  { key: 'enterprise', label: 'B2B' },
  { key: 'consumer', label: 'B2C' },
  { key: 'd2c', label: 'D2C' },
  { key: 'building', label: 'Recent' },
  { key: 'founder', label: 'Founder Stints' },
  { key: 'consulting', label: 'Consulting' },
  { key: 'shelved', label: 'Shelved Ideas' },
];

// ── EMPLOYMENT TYPE BADGE COLORS ──────────────────────────────────────────────

const EMPLOYMENT_COLORS = {
  'Full-time': { bg: 'rgba(0,122,255,0.08)', color: '#0066cc', border: 'rgba(0,102,204,0.2)' },
  'Self-Initiated': { bg: 'rgba(52,199,89,0.08)', color: '#1a7f37', border: 'rgba(52,199,89,0.2)' },
  'Consulting': { bg: 'rgba(255,149,0,0.08)', color: '#b36200', border: 'rgba(255,149,0,0.2)' },
  'Education': { bg: 'rgba(13,71,161,0.08)', color: '#1565c0', border: 'rgba(13,71,161,0.2)' },
};

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────

function ProductCard({ product, companyName, onMediaClick, brandColor, productIndex, impactLabel }) {
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
                style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 800, color: bc, letterSpacing: '-0.02em', textDecoration: 'none', transition: 'var(--transition-colors)' }}>
                {product.name}
              </a>
            ) : (
              <span style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 800, color: bc, letterSpacing: '-0.02em', transition: 'var(--transition-colors)' }}>
                {product.name}
              </span>
            )}
          </div>
          <p style={{ fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.55, marginBottom: 10, transition: 'var(--transition-colors)' }}>
            {product.headline}
          </p>
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
                  { key: 'problem',    label: 'Problem',         has: !!product.problem },
                  { key: 'decision',   label: 'Decision',        has: !!product.decision },
                  { key: 'features',   label: 'Key Features',    has: product.keyFeatures?.length > 0 },
                  { key: 'impact',     label: impactLabel || 'Business Impact', has: (product.businessImpact?.length > 0) || (product.outcomes?.length > 0) },
                  { key: 'learnings',  label: 'My Learnings',    has: !!product.learnings },
                  { key: 'shelved',    label: 'Why Paused',      has: !!product.whyShelved },
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
                    <div style={{ padding: '16px 20px', minHeight: 72 }}>
                      {currentTab === 'problem' && (
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>{product.problem}</p>
                      )}
                      {currentTab === 'decision' && (
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>{product.decision}</p>
                      )}
                      {currentTab === 'learnings' && (
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>{product.learnings}</p>
                      )}
                      {currentTab === 'shelved' && (
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>{product.whyShelved}</p>
                      )}
                      {currentTab === 'features' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }} className="feat-grid">
                          {product.keyFeatures.map((f, i) => {
                            const title = f.includes(' — ') ? f.split(' — ')[0] : f;
                            return (
                              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ color: bc, fontSize: 15, flexShrink: 0, marginTop: 1, fontWeight: 600 }}>✓</span>
                                <span style={{ fontSize: 15, lineHeight: 1.55, transition: 'var(--transition-colors)' }}>{title}</span>
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
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }} className="feat-grid">
                            {impactItems.map((m, i) => {
                              const isDown = m.direction === 'down';
                              return (
                                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                  <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1, fontWeight: 700, color: isDown ? '#ff3b30' : '#34c759' }}>{isDown ? '↓' : '✓'}</span>
                                  <span style={{ fontSize: 15, lineHeight: 1.55, transition: 'var(--transition-colors)' }}>
                                    <strong style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.num}</strong>
                                    {' '}<span style={{ color: 'var(--color-text-secondary)' }}>{m.label}</span>
                                  </span>
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
                {company.categories?.includes('shelved') && (
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '2px 9px',
                    borderRadius: 'var(--border-radius-pill)',
                    background: '#faeeda',
                    border: '0.5px solid #f5c686',
                    color: '#633806',
                    whiteSpace: 'nowrap',
                  }}>
                    Shelved Idea
                  </span>
                )}
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

          {/* Product tags — deduplicated from all products, shown after description */}
          {(() => {
            const allTags = (company.products || []).flatMap(p => p.tags || []);
            const seen = new Set();
            const unique = allTags.filter(t => {
              if (seen.has(t.label)) return false;
              seen.add(t.label);
              return true;
            });
            if (!unique.length) return null;
            return (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                {unique.map((t, i) => <span key={i} className={`ptag ${t.cls}`}>{t.label}</span>)}
              </div>
            );
          })()}

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

          {/* NON-FEATURED LAYOUT: Products + Recognitions in left column */}
          {!company.featuredLayout && (company.products?.length > 0 || company.ratings?.length > 0) && (
            <>
              <div style={{ height: '0.5px', background: `${bc}40`, margin: '14px 0' }} />
              {/* Desktop */}
              <div className="desc-desktop">
                {company.products?.length > 0 && (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>Products</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {company.products.map((p, i) => (
                        <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--border-radius-pill)', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', transition: 'var(--transition-colors)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {company.ratings?.length > 0 && (
                  <div style={{ marginTop: company.products?.length > 0 ? 12 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>Press & Recognition</div>
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
              {/* Mobile toggle */}
              <div className="desc-mobile">
                {company.products?.length > 0 && (
                  <>
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
                  </>
                )}
                {company.ratings?.length > 0 && (
                  <>
                    <button onClick={e => { e.stopPropagation(); setMobileRecsOpen(v => !v); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: `${bc}07`, border: `0.5px solid ${bc}22`, borderRadius: 8, padding: '7px 10px', cursor: 'pointer', marginTop: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Press & Recognition · {company.ratings.length}</span>
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
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>{company.impactLabel || 'Business Impact'} · {allImpact.length}</span>
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
                {company.impactLabel || 'Business Impact'}
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
                      ? <img src={cs.logo} alt={cs.title || 'Case study client logo'} title={cs.title} onError={e => { e.currentTarget.style.display = 'none'; }} style={{ height: 20, maxWidth: 130, objectFit: 'contain', objectPosition: 'left center', display: 'block' }} />
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
                <div className="section-label" style={{ marginBottom: 4, fontSize: 12 }}>
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
                  impactLabel={company.impactLabel}
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

        /* ── Product tags ── */
        .ptag {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 3px 10px;
          border-radius: 5px;
          line-height: 1.5;
          font-family: var(--font-sans);
          white-space: nowrap;
          transition: var(--transition-colors);
        }
        /* Journey (0→1 / 1→N) — dark pill, stands out */
        .ptag-journey { background: #1c1c2e; color: #e8e8f0; }
        /* Market, Type, AI — unified warm-gray tint */
        .ptag-market, .ptag-type, .ptag-ai {
          background: #f0eff5;
          color: #4a4560;
          border: 0.5px solid #dddbe8;
        }
        [data-theme="dark"] .ptag-journey { background: #e8e8f0; color: #1c1c2e; }
        [data-theme="dark"] .ptag-market,
        [data-theme="dark"] .ptag-type,
        [data-theme="dark"] .ptag-ai {
          background: #1e1b2e;
          color: #9d99b8;
          border-color: #2e2b42;
        }
      `}</style>
    </div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────

export default function Work() {
  const [ref] = useInView();
  const [activeFilters, setActiveFilters] = useState(['fulltime']);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [showAllFulltime, setShowAllFulltime] = useState(false);
  const workScrollRef = useRef(null);

  function toggleFilter(key) {
    setActiveFilters(prev => prev.length === 1 && prev[0] === key ? prev : [key]);
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
        <SectionLabel>Work Portfolio</SectionLabel>
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
