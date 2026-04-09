import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import SectionLabel from '../components/SectionLabel';
import Lightbox from '../components/Lightbox';

const easeStd = [0.25, 0.1, 0.25, 1];
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: easeStd } };

// ── DATA ──────────────────────────────────────────────────────────────────────

const COMPANIES = [
  {
    id: 'pmgpt',
    categories: ['enterprise', 'building', 'fulltime'],
    year: '2025–',
    active: true,
    employmentType: 'Passion Project',
    name: 'pmGPT',
    logo: null,
    brandColor: '#7c3aed',
    website: 'https://pmgpt.ai',
    role: 'Founder',
    description: 'An AI-native operating system for product teams, orchestrating the entire lifecycle from research and PRDs to sprint execution through agentic workflows. It leverages integrations, RAG, and MCPs to turn fragmented tools and data into a unified, intelligent execution layer.',
    roleNarrative: 'My role here is building this end to end as a passion project, initially to explore vibe coding with Claude Code on real product problems I was facing as a product leader. What started as an experiment has evolved into a well-structured system, where I independently own everything from product design and agent definition to system architecture and hands-on development.',
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
    roleNarrative: 'My role here was to drive product thinking and execution across the platform, shaping it from a creative tool into a performance-driven system. I worked on translating real customer and market problems into scalable workflows, while also actively contributing to sales through demos, client conversations, and positioning the product to drive adoption and business outcomes.',
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
    roleNarrative: 'My role at SearchUnify was officially Senior Product Manager, but in practice I operated as the product lead for the company\'s AI transformation, reporting directly to the CTO. I was responsible for driving the journey from enterprise search to 360° customer support automation and further into the Agentic AI Suite, while also shaping how agentic capabilities could extend into other business functions. My scope covered product strategy, conceptualization, execution, cross-functional alignment, customer and sales conversations, leadership communication, and team management — effectively functioning at a Head of Product level for the AI portfolio.',
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
        logo: '/software-reviews-logo.jpeg',
        badge: 'Champion',
        label: 'in Enterprise Search Data Quadrant Report: 2024, 2025, 2026',
        href: 'https://www.searchunify.com/press-release/searchunify-named-champion-in-softwarereviews-enterprise-search-data-quadrant-for-the-third-consecutive-year/',
        sourceColor: '#2d7d3a',
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
    roleNarrative: 'My role at Reverie was officially Senior Product Manager, but I operated and held the market designation of Head of Voice Products, reporting to the CTO. I was brought in to productize in-house AI technologies, leading the journey from market research and problem discovery to defining the vision, product strategy, and a 2-year roadmap, and executing the platform from scratch. I was entrusted with managing a 5-member product team along with a 39-member cross-functional team across engineering, data science, and design, focused on building a no-code/low-code multilingual voice AI platform. I also partnered closely with sales, customer success, and marketing to drive adoption and market positioning.',
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
    employmentType: 'Full-time',
    name: 'OfficeBanao (Backed by Lightspeed VC)',
   logo: '/officebanao-logo.png',
    brandColor: '#1565c0',
    website: '#',
    role: 'Founding Member',
    description: 'A tech-enabled SaaS platform that streamlines the end-to-end office creation lifecycle, from design and procurement to execution, bringing transparency, efficiency, and scalability to a traditionally fragmented interiors ecosystem.',
    roleNarrative:'My role here started as a founding member and Product Head, working closely with CXOs as the second hire to build the product portfolio from the ground up. I led everything from defining vision, strategy, and roadmap to setting up the team, tools, and execution frameworks, driving end-to-end product development. This journey took the product from inception to early maturity, including onboarding successful customers and contributing to the initial fundraise. I later transitioned into a part-time consulting role to take the product to completion while moving to Reverie to deepen my focus on AI.',
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
    roleNarrative:'My role here was to contribute through weekend engagements, working closely with the founder to guide product direction across AI robotics and IoT use cases. I mentored and reviewed PMs, helped unblock critical challenges, and supported both product and engineering teams in aligning on vision, execution, and real-world deployments, while gaining hands-on exposure to robotics systems.',
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
    brandColor: '#f57c00',
    name: 'Discovr.AI (Backed by ONGC, Micromax & Banking HNIs)',
    logo: '/discovr-ai-logo.jpeg',
    website: '#',
    role: 'Co-Founder, Chief Product Officer',
    description: 'A no-code AI platform that empowers enterprises to build and scale intelligent systems across computer vision, conversational AI, OCR, and predictive use cases using pre-built ML models and fine-tuned algorithms, enabling real-time insights, automated decision-making, and faster time to value. It operates as the B2B vertical of Red Ginger Technologies, backed by Micromax, ONGC, and prominent HNIs.',
    roleNarrative:'As Co-founder and Chief Product Officer, my role was centered on product thinking and development, defining GTM, ICPs, and prioritization while building AI systems grounded in real-world use cases. We partnered with leading enterprises and government bodies including Reliance Jio, Tata Steel, ONGC, Indian Army, Cairn vedanata, Texas instruments, NITI Aayog, Telangana Government and more, running multiple POCs, MVPs, and live deployments to acquire data, validate problems, and refine ML models. Over ~3 years, this iterative approach helped us evolve from project-led execution to a mature, scalable SaaS platform.',
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
    brandColor: '#e53935',
    website: '#',
    role: 'Co-Founder, Chief Product & Technology Officer',
    description: "A consumer internet product company building and launching mobile and aggregator super apps across ecommerce and concierge services, scaling to 20M+ downloads across 6+ countries. As the B2C vertical of Red Ginger Technologies, backed by Micromax, ONGC, and prominent HNIs, it is driven by the ambition to become the Bytedance of India.",
    roleNarrative: "As Co-founder and Chief Product & Technology Officer, my role was to own the end-to-end journey of building and scaling the company's product ecosystem, driving product vision, technology architecture, and growth strategy. I led everything from identifying opportunities and defining what to build, to executing across product, engineering, and growth, ensuring scalable systems, rapid experimentation, and sustainable monetization.",
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
    roleNarrative: 'My role here was a mix of consulting, DevOps, and hands-on development, working on risk management systems for global financial clients. I built and supported data pipelines ingesting and processing data from institutions like JP Morgan and Barclays, ensuring timely, output-driven workflows for portfolio managers at PIMCO across US and Asia market cycles.',
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
    roleNarrative: 'My role here was as a Software Development Engineer, where I started working under guidance and quickly ramped up to owning key parts of the product. Within 6 months, I was leading 3 modules, building new source connectors, managing server access, implementing custom features, resolving critical bugs, and working directly with clients to deliver solutions.',
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
    logo: null,
    brandColor: '#0d47a1',
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
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'consumer', label: 'Consumer' },
  { key: 'building', label: 'Building Now' },
  { key: 'consulting', label: 'Consulting & Part-time' },
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

function ProductCard({ product, companyName, onMediaClick }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
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
            {product.website ? (
              <a href={product.website} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', textDecoration: 'none', borderBottom: '2px solid var(--color-accent)', paddingBottom: 1, transition: 'var(--transition-colors)' }}>
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
            <div style={{
              borderTop: '0.5px solid var(--color-border-tertiary)',
              //background: 'var(--color-background-secondary)',
              transition: 'var(--transition-colors)',
            }}>

              {/* PROBLEM + DECISION — first */}
              <ProductSection label={null}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="pd-grid">
                  <div>
                    <div className="section-label" style={{ marginBottom: 6 }}>The Problem</div>
                    <p style={{ fontSize: 13, lineHeight: 1.65, transition: 'var(--transition-colors)' }}>
                      {product.problem}
                    </p>
                  </div>
                  <div>
                    <div className="section-label" style={{ marginBottom: 6 }}>The Decision</div>
                    <p style={{ fontSize: 13, lineHeight: 1.65, transition: 'var(--transition-colors)' }}>
                      {product.decision}
                    </p>
                  </div>
                </div>
              </ProductSection>

              {/* ARTIFACTS */}
              {product.artifacts.length > 0 && (
                <ProductSection label="Artifacts">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {product.artifacts.map((a, i) => (
                      <MediaThumb key={i} item={a} company={companyName} onClick={onMediaClick} />
                    ))}
                  </div>
                </ProductSection>
              )}

              {/* KEY FEATURES — title only (before " — ") + green check */}
              {product.keyFeatures.length > 0 && (
                <ProductSection label="Key Features">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }} className="feat-grid">
                    {product.keyFeatures.map((f, i) => {
                      const title = f.includes(' — ') ? f.split(' — ')[0] : f;
                      return (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: '#34c759', fontSize: 13, flexShrink: 0, marginTop: 1, fontWeight: 600 }}>✓</span>
                          <span style={{ fontSize: 13, lineHeight: 1.55, transition: 'var(--transition-colors)' }}>{title}</span>
                        </div>
                      );
                    })}
                  </div>
                </ProductSection>
              )}

              {/* BUSINESS IMPACT — with directional arrows */}
              {product.businessImpact && product.businessImpact.length > 0 && (
                <ProductSection label="Business Impact">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="impact-grid">
                    {product.businessImpact.map((m, i) => {
                      const isUp = m.direction !== 'down';
                      return (
                        <div key={i} style={{
                          background: 'var(--color-background-primary)',
                          border: '0.5px solid var(--color-border-tertiary)',
                          borderRadius: 'var(--border-radius-md)',
                          padding: '12px 14px',
                          transition: 'var(--transition-colors)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                            <div style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 22,
                              fontWeight: 700,
                              color: 'var(--color-text-primary)',
                              letterSpacing: '-0.02em',
                              lineHeight: 1,
                              transition: 'var(--transition-colors)',
                            }}>
                              {m.num}
                            </div>
                            <span style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: isUp ? '#34c759' : '#ff3b30',
                              lineHeight: 1,
                            }}>
                              {isUp ? '↑' : '↓'}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', lineHeight: 1.4, transition: 'var(--transition-colors)' }}>
                            {m.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ProductSection>
              )}

              {/* OUTCOMES strip */}
              {product.outcomes.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.outcomes.length}, 1fr)`, gap: 2, padding: '0 16px 16px' }} className="outcome-row">
                  {product.outcomes.map((o, i) => (
                    <div key={i} style={{
                      background: 'var(--color-background-primary)',
                      padding: '10px 8px',
                      textAlign: 'center',
                      borderRadius: i === 0 ? '6px 0 0 6px' : i === product.outcomes.length - 1 ? '0 6px 6px 0' : 0,
                      transition: 'var(--transition-colors)',
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>
                        {o.num}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)', marginTop: 2, lineHeight: 1.3, transition: 'var(--transition-colors)' }}>
                        {o.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PRODUCT SECTION WRAPPER ───────────────────────────────────────────────────

function ProductSection({ label, children }) {
  return (
    <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--color-border-tertiary)', transition: 'var(--transition-colors)' }}>
      {label && <div className="section-label" style={{ marginBottom: 10 }}>{label}</div>}
      {children}
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
  const [open, setOpen] = useState(true);
  const [csIdx, setCsIdx] = useState(0);
  const [narrativeExpanded, setNarrativeExpanded] = useState(false);
  const empColors = EMPLOYMENT_COLORS[company.employmentType] || EMPLOYMENT_COLORS['Full-time'];
  const allImpact = company.businessImpact?.length
    ? company.businessImpact
    : company.products.flatMap(p => p.businessImpact || []);

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
      transition: 'var(--transition-colors)',
    }}>

      {/* ── CARD BODY: 2-column grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: company.featuredLayout ? '1fr 290px' : '1fr 260px' }} className="company-grid">

        {/* ══ LEFT COLUMN ══ */}
        <div
          style={{ padding: '20px 22px', borderRight: '0.5px solid var(--color-border-tertiary)', cursor: 'pointer', transition: 'var(--transition-colors)' }}
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
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                {company.website && company.website !== '#' ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: company.brandColor || 'var(--color-text-primary)', letterSpacing: '-0.02em', textDecoration: 'none', borderBottom: `2px solid ${company.brandColor || 'var(--color-accent)'}`, paddingBottom: 1, transition: 'color 300ms ease, border-color 300ms ease' }}>
                    {company.name}
                  </a>
                ) : (
                  <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: company.brandColor || 'var(--color-text-primary)', letterSpacing: '-0.02em', transition: 'var(--transition-colors)' }}>
                    {company.name}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>
                  {company.role}
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

              {/* Company description */}
              <p style={{ fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.7, fontWeight: 400, transition: 'var(--transition-colors)' }}>
                {company.description}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '14px 0', transition: 'var(--transition-colors)' }} />

          {/* Role narrative — with ellipsis + More for featured layout */}
          {company.roleNarrative && (
            <div>
              <p style={{
                fontSize: 15, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', lineHeight: 1.75, fontStyle: 'italic',
                transition: 'var(--transition-colors)',
                ...(company.featuredLayout && !narrativeExpanded ? {
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                } : {}),
              }}>
                {company.roleNarrative}
              </p>
              {company.featuredLayout && (
                <button
                  onClick={e => { e.stopPropagation(); setNarrativeExpanded(v => !v); }}
                  style={{
                    marginTop: 6, fontSize: 11, fontWeight: 600, color: 'var(--color-accent)',
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'var(--transition-colors)',
                  }}
                >
                  {narrativeExpanded ? 'Show less ↑' : 'Read more ↓'}
                </button>
              )}
            </div>
          )}

          {/* NON-FEATURED LAYOUT: Products in left column */}
          {!company.featuredLayout && company.products?.length > 0 && (
            <>
              <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '14px 0', transition: 'var(--transition-colors)' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>
                  Products
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {company.products.map((p, i) => (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', borderRadius: 'var(--border-radius-pill)',
                      background: 'var(--color-background-secondary)',
                      border: '0.5px solid var(--color-border-tertiary)',
                      transition: 'var(--transition-colors)',
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* FEATURED LAYOUT: Products + Recognitions in left column */}
          {company.featuredLayout && (
            <>
              <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '14px 0', transition: 'var(--transition-colors)' }} />

              {/* Products */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 10, transition: 'var(--transition-colors)' }}>
                  Products
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {company.products.map((p, i) => (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', borderRadius: 'var(--border-radius-pill)',
                      background: 'var(--color-background-secondary)',
                      border: '0.5px solid var(--color-border-tertiary)',
                      transition: 'var(--transition-colors)',
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'var(--transition-colors)' }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recognitions — horizontal cards like SearchUnify website */}
              {company.ratings?.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>
                    Recognitions
                  </div>
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="rec-scroll">
                    {company.ratings.map((r, i) => (
                      <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        style={{
                          flexShrink: 0,
                          width: 148,
                          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                          padding: '12px 12px 10px',
                          borderRadius: 'var(--border-radius-md)',
                          background: 'var(--color-background-primary)',
                          border: '0.5px solid var(--color-border-tertiary)',
                          boxShadow: 'var(--shadow-xs)',
                          textDecoration: 'none',
                          gap: 10,
                          transition: 'box-shadow 150ms ease, transform 150ms ease, var(--transition-colors)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        {/* Top: badge + label */}
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: 4, lineHeight: 1.2, transition: 'var(--transition-colors)' }}>{r.badge}</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', lineHeight: 1.45, transition: 'var(--transition-colors)' }}>{r.label}</div>
                        </div>
                        {/* Bottom: logo */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {r.logo
                            ? <img src={r.logo} alt={r.source} onError={e => { e.currentTarget.style.display = 'none'; }} style={{ height: 22, maxWidth: 90, objectFit: 'contain', objectPosition: 'left center', display: 'block' }} />
                            : <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: r.sourceColor || 'var(--color-accent)' }}>{r.source}</span>
                          }
                          <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>↗</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ RIGHT COLUMN — Case Studies + Business Impact (all cards) ══ */}
        <div className="company-right-col" style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 18, borderLeft: '0.5px solid var(--color-border-tertiary)', transition: 'var(--transition-colors)' }}>

          {/* ── Case Studies carousel (all cards that have them) ── */}
          {company.caseStudies?.length > 0 && (() => {
            const cs = company.caseStudies[csIdx];
            const total = company.caseStudies.length;
            return (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>
                  Case Studies
                </div>
                <div style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', transition: 'var(--transition-colors)' }}>
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
                  <p style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 10, transition: 'var(--transition-colors)' }}>{cs.result}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {company.caseStudies.map((_, i) => (
                        <span key={i} onClick={e => { e.stopPropagation(); setCsIdx(i); }}
                          style={{ width: csIdx === i ? 14 : 5, height: 5, borderRadius: 3, background: csIdx === i ? 'var(--color-accent)' : 'var(--color-border-tertiary)', cursor: 'pointer', transition: 'all 250ms ease' }} />
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

          {/* ── Business Impact (all cards that have it) ── */}
          {allImpact.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 8, transition: 'var(--transition-colors)' }}>
                Business Impact
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {allImpact.map((m, i) => {
                  const isUp = m.direction !== 'down';
                  return (
                    <div key={i} style={{
                      padding: '9px 10px 8px', borderRadius: 'var(--border-radius-md)',
                      background: isUp ? 'rgba(52,199,89,0.07)' : 'rgba(255,59,48,0.07)',
                      border: `0.5px solid ${isUp ? 'rgba(52,199,89,0.2)' : 'rgba(255,59,48,0.2)'}`,
                      transition: 'var(--transition-colors)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, color: isUp ? '#1a9e42' : '#d93025' }}>{isUp ? '↑' : '↓'}</span>
                        <span style={{ fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.03em', lineHeight: 1, transition: 'var(--transition-colors)' }}>{m.num}</span>
                      </div>
                      <div style={{ fontSize: 11, lineHeight: 1.3, color: 'var(--color-text-secondary)', transition: 'var(--transition-colors)' }}>{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── EXPAND TOGGLE — full-width footer bar ── */}
      <div
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
      </div>

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
              borderTop: '0.5px solid var(--color-border-tertiary)',
              background: 'var(--color-background-secondary)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              transition: 'var(--transition-colors)',
            }}>
              {company.products.length > 1 && (
                <div className="section-label" style={{ marginBottom: 4 }}>
                  Products · {company.products.length} shipped
                </div>
              )}
              {company.products.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  companyName={company.name}
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

  function toggleFilter(key) {
    setActiveFilters(prev => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev;
        return prev.filter(k => k !== key);
      }
      return [...prev, key];
    });
  }

  const visible = COMPANIES.filter(c =>
    c.categories.some(cat => activeFilters.includes(cat))
  );

  return (
    <section
      id="work"
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--color-background-secondary)', transition: 'var(--transition-colors)' }}
    >
      <div className="container">
        <SectionLabel>Work · Products</SectionLabel>
        <motion.h2
          className="section-heading"
          style={{ marginBottom: 8 }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={fadeUp.transition}
        >
          Products I've built. <em>Results they've delivered.</em>
        </motion.h2>
        <motion.p
          style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 32, transition: 'var(--transition-colors)' }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          Expand a company to see the products · expand a product for full details
        </motion.p>

        {/* Filter pills */}
        <motion.div
          className="work-filter-row"
          style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}
          initial={fadeUp.initial}
          animate={inView ? fadeUp.animate : fadeUp.initial}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
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
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 40 }} className="timeline-outer">
          {/* Background line — faint fallback for top/bottom ends */}
          <div style={{
            position: 'absolute', left: 6, top: 8, bottom: 8,
            width: 8, background: 'var(--color-border-tertiary)',
            opacity: 0.25,
            transition: 'var(--transition-colors)',
          }} />

          <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
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
                  {/* Colored line — current company's color, runs from bottom of this dot to top of next dot */}
                  {i < visible.length - 1 && (
                    <div
                      className="timeline-colored-line"
                      style={{
                        position: 'absolute',
                        left: -34,
                        top: 24,      /* bottom of the 20px dot (4 top + 20 height) */
                        width: 8,
                        bottom: -32,  /* top of next dot (28px gap + 4px dot-top offset) */
                        background: company.brandColor || 'var(--color-border-tertiary)',
                        opacity: 0.55,
                        borderRadius: 4,
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Timeline dot + year — above colored line */}
                  <div className="timeline-dot-wrapper" style={{ position: 'absolute', left: -50, top: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      border: '2px solid var(--color-background-primary)',
                      background: company.active ? '#34c759' : company.brandColor || 'var(--color-text-primary)',
                      boxShadow: company.active ? '0 0 0 3px rgba(52,199,89,0.2)' : `0 0 0 3px ${company.brandColor ? company.brandColor + '33' : 'transparent'}`,
                      flexShrink: 0, transition: 'var(--transition-colors)',
                    }} />
                    <span style={{
                      fontSize: 10, color: 'var(--color-text-tertiary)',
                      whiteSpace: 'nowrap', fontWeight: 500, marginTop: 3,
                      transition: 'var(--transition-colors)',
                    }}>
                      {company.year}
                    </span>
                  </div>

                  <CompanyCard company={company} onMediaClick={setLightboxItem} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      <style>{`
        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .pd-grid { grid-template-columns: 1fr !important; }
          .outcome-row { grid-template-columns: repeat(2, 1fr) !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .timeline-outer { padding-left: 32px !important; }
          .timeline-dot-wrapper { left: -38px !important; }
          .timeline-colored-line { left: -26px !important; }
          .work-filter-row { gap: 6px !important; }
          .work-filter-row button { padding: 6px 12px !important; font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .timeline-outer { padding-left: 28px !important; }
          .timeline-dot-wrapper { left: -34px !important; }
          .timeline-colored-line { left: -22px !important; }
        }
      `}</style>
    </section>
  );
}
