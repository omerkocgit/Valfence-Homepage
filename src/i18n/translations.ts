/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDictionary {
  nav: {
    problem: string;
    workflow: string;
    workspace: string;
    benefits: string;
    whyValfence: string;
    pilotFit: string;
    discussPilot: string;
  };
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineHighlight: string;
    subline: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  audience: {
    eyebrow: string;
    persona1Tag: string;
    persona1Title: string;
    persona1Desc: string;
    persona2Tag: string;
    persona2Title: string;
    persona2Desc: string;
    persona3Tag: string;
    persona3Title: string;
    assetWind: string;
    assetSolar: string;
    assetBess: string;
  };
  problem: {
    eyebrow: string;
    headlineStart: string;
    headlineSub: string;
    body: string;
    friction1Tag: string;
    friction1Title: string;
    friction1Desc: string;
    friction1Impact: string;
    friction2Tag: string;
    friction2Title: string;
    friction2Desc: string;
    friction2Impact: string;
    friction3Tag: string;
    friction3Title: string;
    friction3Desc: string;
    friction3Impact: string;
    quoteText: string;
    quoteAuthor: string;
  };
  workflow: {
    eyebrow: string;
    headline: string;
    subline: string;
    activeStepTag: string;
    keyDeliverablesTitle: string;
    sourceMetadataCitations: string;
    traceabilityBadge: string;
    steps: Array<{
      number: string;
      title: string;
      shortDesc: string;
      details: string[];
      microcopy: string;
      badge: string;
    }>;
  };
  workspace: {
    eyebrow: string;
    headline: string;
    subline: string;
    assetLabel: string;
    assetTag: string;
    p50Btn: string;
    p90Btn: string;
    governanceGate: string;
    reviewed: string;
    approvedStatus: string;
    pendingReview: string;
    tabs: {
      assumptions: string;
      conflictResolver: string;
      dcfWaterfall: string;
      missingInputs: string;
      benchmarks: string;
    };
    equityIrr: string;
    projectIrr: string;
    ev: string;
    minDscr: string;
    scenarioNote: string;
    selectedAssumption: string;
    paramSensitivity: string;
    minLabel: string;
    baseLabel: string;
    maxLabel: string;
    currentValue: string;
    resetBase: string;
    approveBtn: string;
    approvedBtn: string;
    sourceEvidenceBadge: string;
    documentType: string;
    pageCitation: string;
    extractionDate: string;
    sourceConfidence: string;
    highConfidence: string;
    mediumConfidence: string;
    verifiedExcerpt: string;
    marketBenchmark: string;
    analystRationale: string;
    cutoffEligible: string;
    exportExcelBtn: string;
    generateMemoBtn: string;
    conflictTitle: string;
    conflictSubtitle: string;
    conflictDoc1Title: string;
    conflictDoc1Value: string;
    conflictDoc2Title: string;
    conflictDoc2Value: string;
    conflictResolvedLabel: string;
    missingInputsTitle: string;
    missingInputsSubtitle: string;
    missingItem1Title: string;
    missingItem1Desc: string;
    missingItem1Action: string;
    missingItem2Title: string;
    missingItem2Desc: string;
    missingItem2Action: string;
    missingItem3Title: string;
    missingItem3Desc: string;
    missingItem3Action: string;
    dcfWaterfallTitle: string;
    dcfWaterfallSubtitle: string;
    yearCol: string;
    revenueCol: string;
    opexCol: string;
    debtServiceCol: string;
    fcfeCol: string;
    statusApproved: string;
    statusOverridden: string;
    statusPending: string;
  };
  visualShowcase: {
    eyebrow: string;
    headline: string;
    subline: string;
    tabGraph: string;
    tabSimulator: string;
    tabScanner: string;
    graphTitle: string;
    graphSubtitle: string;
    simTitle: string;
    simSubtitle: string;
    simWindSpeed: string;
    simCurtailment: string;
    simPpaPrice: string;
    simCalculatedYield: string;
    simNetGen: string;
    simRevenue: string;
    simProjectIrr: string;
    simMinDscr: string;
    scannerTitle: string;
    scannerSubtitle: string;
    scannerVerifiedBadge: string;
    scannerUnverifiedBadge: string;
    scannerAutoToggle: string;
  };
  benefits: {
    eyebrow: string;
    headlineMain: string;
    headlineSub: string;
    subline: string;
    stat1Label: string;
    stat1Value: string;
    stat1Desc: string;
    stat2Label: string;
    stat2Value: string;
    stat2Desc: string;
    stat3Label: string;
    stat3Value: string;
    stat3Desc: string;
    stat4Label: string;
    stat4Value: string;
    stat4Desc: string;
    cards: Array<{
      tag: string;
      title: string;
      description: string;
      highlight: string;
    }>;
    pilotCardTitle: string;
    pilotCardDesc: string;
    pilotCardBtn: string;
  };
  differentiation: {
    eyebrow: string;
    headlineMain: string;
    headlineHighlight: string;
    subline: string;
    colDimension: string;
    colGenericAi: string;
    colManualExcel: string;
    colBroadSaas: string;
    colValfence: string;
    rows: Array<{
      feature: string;
      genericAI: string;
      manualExcel: string;
      broadSoftware: string;
      valfence: string;
    }>;
  };
  pilot: {
    eyebrow: string;
    headline: string;
    subline: string;
    deliverablesBadge: string;
    deliverablesTitle: string;
    deliverablesList: string[];
    boundariesBadge: string;
    boundariesTitle: string;
    boundariesList: string[];
    fitToolTitle: string;
    fitToolSubtitle: string;
    fitLevelHigh: string;
    fitLevelHighDesc: string;
    fitLevelMedium: string;
    fitLevelMediumDesc: string;
    fitLevelLow: string;
    fitLevelLowDesc: string;
    selectedCountLabel: string;
    discussPilotBtn: string;
    directContactLabel: string;
    criteria: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    emailSubject: string;
    emailGreeting: string;
    emailBodyIntro: string;
    emailBodyMatch: string;
    emailBodyClosing: string;
  };
  roadmap: {
    eyebrow: string;
    headline: string;
    subline: string;
    activeBadge: string;
    architectureBadge: string;
    plannedBadge: string;
    visionBadge: string;
    steps: Array<{
      stage: string;
      title: string;
      description: string;
      status: string;
    }>;
  };
  finalCta: {
    eyebrow: string;
    headline: string;
    subline: string;
    primaryBtn: string;
    directContact: string;
    zeroCommitment: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  footer: {
    tagline: string;
    exploreTitle: string;
    linkProblem: string;
    linkWorkflow: string;
    linkWorkspace: string;
    linkBenefits: string;
    linkPilot: string;
    principlesTitle: string;
    principle1: string;
    principle2: string;
    principle3: string;
    principle4: string;
    copyright: string;
    imprint: string;
    privacy: string;
    cookieSettings: string;
  };
  modals: {
    imprintTitle: string;
    privacyTitle: string;
    excelTitle: string;
    memoTitle: string;
    statusPreLaunch: string;
    closeBtn: string;
    downloadModel: string;
  };
  consent: {
    title: string;
    description: string;
    privacyLink: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    settingsTitle: string;
    settingsSubtitle: string;
    essentialTitle: string;
    essentialDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    savePreferences: string;
    alwaysActive: string;
  };
}

export const translations: Record<'EN' | 'DE', TranslationDictionary> = {
  EN: {
    nav: {
      problem: 'Problem',
      workflow: 'Workflow',
      workspace: 'Live Workspace',
      benefits: 'Benefits',
      whyValfence: 'Why VALFENCE',
      pilotFit: 'Pilot & Fit',
      discussPilot: 'Discuss a pilot',
    },
    hero: {
      eyebrow: 'Renewable Infrastructure · Product Concept',
      headlinePart1: 'Turn fragmented transaction data into ',
      headlineHighlight: 'reviewable valuations.',
      subline:
        'VALFENCE bridges technical advisor reports, market benchmarks, and financial models into a source-traceable workflow for audit-ready DCFs, sensitivity grids, and investment committee memos.',
      primaryCta: 'Discuss a pilot',
      secondaryCta: 'See live workspace',
      microcopy: 'Start with a single de-identified transaction case. Zero vendor lock-in or IT overhead.',
      pillar1Title: 'Full Source Provenance',
      pillar1Desc: 'Every assumption cites exact document titles, page numbers, timestamps, and confidence ratings.',
      pillar2Title: 'Human-in-the-Loop Sign-off',
      pillar2Desc: 'No automatic model overwrites. Analysts review, adjust, and explicitly approve all parameters.',
      pillar3Title: 'Deterministic Cash Flows',
      pillar3Desc: 'Reproducible 25-year DCF waterfall calculations with senior debt sculpting and DSCR covenants.',
    },
    audience: {
      eyebrow: 'Institutional Scope & Asset Coverage',
      persona1Tag: 'Primary Users',
      persona1Title: 'M&A Analysts & Associates',
      persona1Desc: 'Reconcile complex technical advisor reports, build audit-ready assumptions, and defend numbers before partners.',
      persona2Tag: 'Core Organizations',
      persona2Title: 'Renewable Funds & Boutiques',
      persona2Desc: 'Infrastructure private equity, transaction advisory firms, and IPPs seeking rapid model turnaround without audit risk.',
      persona3Tag: 'Asset Scope',
      persona3Title: 'Clean Energy Infrastructure',
      assetWind: 'Onshore Wind',
      assetSolar: 'Solar PV',
      assetBess: 'BESS (Storage)',
    },
    problem: {
      eyebrow: 'Transaction Review Bottlenecks',
      headlineStart: 'The bottleneck isn’t running numbers. ',
      headlineSub: 'It’s defending where they came from.',
      body: 'M&A analysts spend days sifting through 500+ page technical advisor reports, draft PPA term sheets, EPC warranties, and grid interconnection annexes. When assumptions are transferred manually into Excel, source provenance vanishes — forcing senior reviewers to re-audit data rooms from scratch.',
      friction1Tag: 'Friction 01',
      friction1Title: 'Unstructured Data Rooms',
      friction1Desc: 'Yield analyses, turbine availability guarantees, and power price forecasts sit buried across scattered PDFs without standardized data schemas.',
      friction1Impact: 'Impact: Repetitive data re-searches',
      friction2Tag: 'Friction 02',
      friction2Title: 'Conflicting Evidence',
      friction2Desc: 'Technical advisors and seller models frequently contradict one another. Generic AI chatbots hallucinate numbers without audited ranges or dates.',
      friction2Impact: 'Impact: Undocumented model assumptions',
      friction3Tag: 'Friction 03',
      friction3Title: 'Review Governance Gaps',
      friction3Desc: 'Senior partners and Investment Committees spend precious deal hours questioning spreadsheet hardcodes rather than debating valuation strategy.',
      friction3Impact: 'Impact: Delayed IC approvals & deal risk',
      quoteText: '“Where did this number come from, which document supports it, and what happens to our return if it changes?”',
      quoteAuthor: '— The core question every Investment Committee demands of its deal team.',
    },
    workflow: {
      eyebrow: 'The Operating Principle',
      headline: 'A structured, audit-ready valuation pipeline',
      subline: 'How raw transaction files transform into defensible financial outputs under mandatory analyst sign-off gates.',
      activeStepTag: 'Interactive Step Deep Dive',
      keyDeliverablesTitle: 'Key Deliverables & Verification Protocols',
      sourceMetadataCitations: 'Source Metadata & Citations',
      traceabilityBadge: 'Deterministic Traceability',
      steps: [
        {
          number: '01',
          title: 'Ingest & Structure',
          shortDesc: 'Parse data rooms, yield analyses, PPA term sheets, and grid connection agreements.',
          details: [
            'Extracts technical parameters from independent engineering reports and grid studies.',
            'Preserves exact source filename, page citations, timestamp, and unit conventions.',
            'Enforces valuation-date cutoffs to flag stale or post-cutoff information.',
          ],
          microcopy: 'PDF · Excel · Term Sheets · Market Curves',
          badge: 'Data Room Ingestion',
        },
        {
          number: '02',
          title: 'Synthesize Evidence',
          shortDesc: 'Compare documentation and establish defensible numerical ranges.',
          details: [
            'Proposes candidate assumptions with realistic minimum and maximum sensitivity bands.',
            'Cross-checks project evidence against regional technology benchmarks.',
            'Flags conflicting documents and generates provenance-linked rationale.',
          ],
          microcopy: 'Evidence-backed parameter ranges',
          badge: 'Evidence Synthesis',
        },
        {
          number: '03',
          title: 'Analyst Governance Gate',
          shortDesc: 'Require explicit analyst sign-off before parameters enter financial calculations.',
          details: [
            'Every material assumption requires human approval prior to DCF model execution.',
            'Analysts can adjust values via sensitivity sliders or enter deal-specific notes.',
            'Identifies missing data points and generates targeted Seller Q&A requests.',
          ],
          microcopy: 'Mandatory Human Sign-off',
          badge: 'Human Governance',
        },
        {
          number: '04',
          title: 'Deterministic DCF',
          shortDesc: 'Execute bottom-up 25-year DCFs, senior debt sculpting, and sensitivity grids.',
          details: [
            'Deterministic calculations eliminate LLM math errors and non-reproducible outputs.',
            'Computes Project IRR, Equity IRR, DSCR covenants, and P50 vs. P90 sensitivities.',
            'Dynamic merchant capture haircuts and OpEx escalation indexation.',
          ],
          microcopy: 'Auditable · Reproducible Math',
          badge: 'Deterministic Engine',
        },
        {
          number: '05',
          title: 'Review-Ready Excel Export',
          shortDesc: 'Generate formula-linked Excel spreadsheets, citation registries, and IC memos.',
          details: [
            'Exports clean, formula-linked Excel valuation models matching standard boutique formats.',
            'Automated Source & Evidence Register linking every cell back to its PDF excerpt.',
            'Provides an executive Investment Committee memo and missing inputs register.',
          ],
          microcopy: 'Native Excel Handoff · Complete Audit Trail',
          badge: 'Review-Ready Delivery',
        },
      ],
    },
    workspace: {
      eyebrow: 'Interactive Valuation Environment',
      headline: 'Source-to-Valuation Live Workspace',
      subline: 'Try a sample workflow: review source excerpts, compare assumptions and see how changes flow through a simplified valuation demo.',
      assetLabel: 'Asset: North Ridge Wind Farm (48.0 MW)',
      assetTag: 'Draft IC Review Pack',
      p50Btn: 'P50 Base Case',
      p90Btn: 'P90 Downside Scenario',
      governanceGate: 'Governance Gate',
      reviewed: 'Reviewed',
      approvedStatus: 'Gate Approved',
      pendingReview: 'Pending Approval',
      tabs: {
        assumptions: 'Assumptions Table',
        conflictResolver: 'Conflict Resolver',
        dcfWaterfall: '25-Yr DCF Waterfall',
        missingInputs: 'Missing Diligence Inputs',
        benchmarks: 'Benchmark Comparisons',
      },
      equityIrr: 'Equity IRR',
      projectIrr: 'Project IRR',
      ev: 'Enterprise Value',
      minDscr: 'Min DSCR',
      scenarioNote: 'Senior debt sculpted to 1.25x P90 covenant; 18-yr tenor.',
      selectedAssumption: 'Selected Parameter:',
      paramSensitivity: 'Parameter Sensitivity & Adjustment',
      minLabel: 'Min Bound:',
      baseLabel: 'Base Value:',
      maxLabel: 'Max Bound:',
      currentValue: 'Current Value:',
      resetBase: 'Reset to Original',
      approveBtn: 'Approve Assumption',
      approvedBtn: 'Sign-off Confirmed',
      sourceEvidenceBadge: 'Source Evidence & Audit Trail',
      documentType: 'Document Type:',
      pageCitation: 'Page Citation:',
      extractionDate: 'Valuation Extraction:',
      sourceConfidence: 'Confidence:',
      highConfidence: 'High (Primary Source)',
      mediumConfidence: 'Medium (Draft Document)',
      verifiedExcerpt: 'Verified Document Excerpt:',
      marketBenchmark: 'Market Benchmark Comparison:',
      analystRationale: 'Analyst Evaluation & Deal Notes:',
      cutoffEligible: 'Pre-cutoff validated (Valuation Date: 2026-06-30)',
      exportExcelBtn: 'Model preview',
      generateMemoBtn: 'Memo preview',
      conflictTitle: 'Identified Diligence Document Conflicts',
      conflictSubtitle: 'Conflicting numbers detected across seller models and independent technical advisor reports.',
      conflictDoc1Title: 'Independent Energy Yield Report (DNV)',
      conflictDoc1Value: 'P50 NCF: 34.8% (146.3 GWh/a)',
      conflictDoc2Title: 'Seller Information Memorandum (SIM)',
      conflictDoc2Value: 'P50 NCF: 36.5% (153.5 GWh/a)',
      conflictResolvedLabel: 'Selected Position for Model:',
      missingInputsTitle: 'Diligence Gaps & Seller Q&A Checklist',
      missingInputsSubtitle: 'Parameters identified in standard valuation models that are unverified or missing in the current data room.',
      missingItem1Title: 'Grid Interconnection Curtailment Cap Agreement',
      missingItem1Desc: 'Grid connection annex lists 5% curtailment risk without compensation provisions.',
      missingItem1Action: 'Requested clarification from TSO via Seller Q&A tracker.',
      missingItem2Title: 'Decommissioning Reserve Escrow Agreement',
      missingItem2Desc: 'Year 20-25 removal cost bond structure missing bank guarantee terms.',
      missingItem2Action: 'Added €1.2M escrow reserve assumption into conservative case.',
      missingItem3Title: 'TSA Indexation Ceiling / Floor Formula',
      missingItem3Desc: 'OEM turbine service indexation references non-standard regional inflation basket.',
      missingItem3Action: 'Assumed flat 2.5% p.a. escalation subject to legal contract review.',
      dcfWaterfallTitle: 'Deterministic 25-Year Annual DCF Waterfall',
      dcfWaterfallSubtitle: 'Formulaic calculations with senior debt amortization and DSCR covenant verification.',
      yearCol: 'Year',
      revenueCol: 'Revenue (€M)',
      opexCol: 'OpEx (€M)',
      debtServiceCol: 'Debt Service (€M)',
      fcfeCol: 'FCFE (€M)',
      statusApproved: 'Approved',
      statusOverridden: 'Adjusted',
      statusPending: 'Pending',
    },
    visualShowcase: {
      eyebrow: 'Interactive Visual Showcase',
      headline: 'Real-Time Visual Intelligence',
      subline: 'Explore three independent concept examples: a source-flow diagram, a yield simulator and a visual document comparison.',
      tabGraph: '1. Data Provenance',
      tabSimulator: '2. Yield Simulator',
      tabScanner: '3. Assumption Scanner',
      graphTitle: 'Interactive Provenance Knowledge Graph',
      graphSubtitle: 'Click any node to inspect how document citations flow through the analyst governance gate into the final DCF model.',
      simTitle: 'Real-Time Dynamic Stress Simulator',
      simSubtitle: 'Interact with wind resource, PPA price, and curtailment sliders to see instant deterministic changes to revenue, IRR, and DSCR covenants.',
      simWindSpeed: 'Wind Resource Speed (m/s)',
      simCurtailment: 'Grid Curtailment Rate (%)',
      simPpaPrice: 'PPA / Merchant Price (€/MWh)',
      simCalculatedYield: 'Theoretical Yield:',
      simNetGen: 'Net Generation:',
      simRevenue: 'Annual Revenue:',
      simProjectIrr: 'Project IRR:',
      simMinDscr: 'Min DSCR:',
      scannerTitle: 'Unverified Assumption Detection Scanner',
      scannerSubtitle: 'Automated scan of data room documents identifying hardcoded assumptions, unverified claims, and citation discrepancies.',
      scannerVerifiedBadge: 'Source Verified & Audited',
      scannerUnverifiedBadge: 'Unverified / Hardcoded Warning',
      scannerAutoToggle: 'Auto-scan animation',
    },
    benefits: {
      eyebrow: 'Built For Institutional Review',
      headlineMain: 'Faster first review, ',
      headlineSub: 'without a black box.',
      subline: 'VALFENCE combines the structured extraction power of specialized AI with the deterministic rigor and auditable governance required by senior partners and Investment Committees.',
      stat1Label: 'Ingestion Time Saved',
      stat1Value: '70%',
      stat1Desc: 'Reduction in initial data extraction hours',
      stat2Label: 'Source Traceability',
      stat2Value: '100%',
      stat2Desc: 'Page-level citation for every assumption',
      stat3Label: 'Deterministic Engine',
      stat3Value: '0%',
      stat3Desc: 'LLM math errors in financial waterfall',
      stat4Label: 'Review Acceleration',
      stat4Value: '3x',
      stat4Desc: 'Faster model validation for IC memos',
      cards: [
        {
          tag: 'Auditability',
          title: 'Full Document Provenance',
          description: 'Every material assumption retains its source document, page number, extraction date, and unit provenance. Never search for a citation during an IC review again.',
          highlight: 'Page-level citation per input',
        },
        {
          tag: 'Defensibility',
          title: 'Defensible Parameter Ranges',
          description: 'Evaluate selected figures alongside market benchmarks, regional comparables, and explicit analyst rationale rather than accepting black-box generative text.',
          highlight: 'Benchmark cross-checks',
        },
        {
          tag: 'Rigor',
          title: 'Deterministic Financial Math',
          description: 'Approved inputs feed deterministic, auditable Python engines. Run 25-year DCFs, senior debt DSCR sculpting, and downside sensitivities without spreadsheet formula errors.',
          highlight: 'Deterministic Python DCF',
        },
        {
          tag: 'Efficiency',
          title: 'Accelerated Deal Triage',
          description: 'Redirect analyst hours away from repetitive PDF copy-pasting toward assessing commercial risks, contract terms, and transaction negotiation strategy.',
          highlight: 'Focus on transaction strategy',
        },
        {
          tag: 'Handoff',
          title: 'Review-Ready Excel Delivery',
          description: 'Export dynamic formula-linked Excel models, automated source citation registers, missing diligence checklists, and concise investment committee memos.',
          highlight: 'Native Excel model export',
        },
      ],
      pilotCardTitle: 'Ready to benchmark on a live deal?',
      pilotCardDesc: 'Run a structured pilot on a single de-identified transaction case to test extraction speed and model defensibility.',
      pilotCardBtn: 'Discuss a pilot',
    },
    differentiation: {
      eyebrow: 'Competitive Matrix',
      headlineMain: 'Domain depth combined with ',
      headlineHighlight: 'uncompromised auditability.',
      subline: 'Generic AI summarizes text. Generic software locks models into proprietary silos. VALFENCE is purpose-built for clean energy transaction teams where every figure must withstand Investment Committee scrutiny.',
      colDimension: 'Capability / Dimension',
      colGenericAi: 'Generic AI (LLMs)',
      colManualExcel: 'Manual Excel & PDFs',
      colBroadSaas: 'General M&A SaaS',
      colValfence: 'VALFENCE',
      rows: [
        {
          feature: 'Source & Page Citations',
          genericAI: 'Frequent hallucination & lost sources',
          manualExcel: 'Separated in manual notes & PDFs',
          broadSoftware: 'Generic database feeds',
          valfence: 'Page-level citation for every parameter',
        },
        {
          feature: 'Governance Sign-Off Gate',
          genericAI: 'None (direct unchecked outputs)',
          manualExcel: 'Manual email checks & cell tracing',
          broadSoftware: 'Static manual inputs',
          valfence: 'Mandatory human approval gate',
        },
        {
          feature: 'Calculation Engine',
          genericAI: 'Unreliable generative math',
          manualExcel: 'Vulnerable to formula errors',
          broadSoftware: 'Proprietary closed engine',
          valfence: 'Deterministic, auditable Python DCF',
        },
        {
          feature: 'Renewable-Specific Logic',
          genericAI: 'Broad corporate finance context',
          manualExcel: 'Rebuilt manually deal-by-deal',
          broadSoftware: 'Broad generalized M&A tools',
          valfence: 'Native P50/P90, PPA/CfD, OpEx curves',
        },
        {
          feature: 'Excel Model Compatibility',
          genericAI: 'Unstructured text / CSV tables',
          manualExcel: 'Native Excel format',
          broadSoftware: 'Closed web-only interface',
          valfence: 'Direct export to standard Excel models',
        },
        {
          feature: 'Valuation Cutoff Enforcement',
          genericAI: 'Mixes old and recent web data',
          manualExcel: 'Manual date screening',
          broadSoftware: 'Live feed without deal cutoff',
          valfence: 'Strict point-in-time document filtering',
        },
      ],
    },
    pilot: {
      eyebrow: 'Validation Pilot Scope',
      headline: 'One transaction case. Concrete ROI.',
      subline: 'We partner with select infrastructure M&A boutiques to stress-test the source-traceable workflow on real, de-identified clean energy deals.',
      deliverablesBadge: 'Pilot Deliverables (Included)',
      deliverablesTitle: 'What your deal team receives:',
      deliverablesList: [
        'Structured valuation assumptions extracted from your data room',
        'Cell-level source and page traceability with PDF excerpts',
        'Comprehensive Missing-Input & Diligence Conflict Register',
        'Defensible numerical ranges benchmarked against regional comparables',
        'Formula-linked Excel valuation model matching your deal structure',
        '1-page Investment Committee review memo ready for partner sign-off',
      ],
      boundariesBadge: 'Non-Scope Boundaries (Explicit)',
      boundariesTitle: 'What is intentionally outside pilot scope:',
      boundariesList: [
        'We do not provide investment or transaction advice',
        'No direct API connections or IT systems integration required',
        'No multi-year SaaS lock-in or recurring upfront commitment',
        'No raw, confidential data retention; strictly de-identified inputs',
      ],
      fitToolTitle: 'Interactive Case Fit Tool',
      fitToolSubtitle: 'Check the boxes that reflect your transaction profile to assess pilot compatibility:',
      fitLevelHigh: 'High Validation Fit',
      fitLevelHighDesc: 'Your deal parameters match the ideal profile for our focused initial validation pilot.',
      fitLevelMedium: 'Potential Pilot Match',
      fitLevelMediumDesc: 'Promising fit. We can readily configure the workflow to your specific asset documents.',
      fitLevelLow: 'Select Deal Criteria',
      fitLevelLowDesc: 'Check the boxes that reflect your team and current transaction pipeline.',
      selectedCountLabel: 'Criteria Matched',
      discussPilotBtn: 'Discuss pilot for this deal',
      directContactLabel: 'Or reach out directly:',
      criteria: [
        {
          id: 'case_type',
          title: 'Single De-Identified Clean Energy Asset',
          description: 'An operational or ready-to-build onshore wind or solar PV farm with known capacity and jurisdiction.',
        },
        {
          id: 'doc_availability',
          title: 'Core Technical Reports & Offtake Contracts',
          description: 'Access to key diligence files (energy yield assessment, PPA terms, O&M) and existing Excel reference model.',
        },
        {
          id: 'analyst_capacity',
          title: 'Analyst Available for Audit Comparison',
          description: 'A transaction team member to evaluate extraction accuracy, evidence citations, and usability.',
        },
        {
          id: 'comparison_willingness',
          title: 'Interest in Reducing Preparation Hours',
          description: 'Willingness to measure time savings and Investment Committee review clarity against existing manual process.',
        },
      ],
      emailSubject: 'VALFENCE pilot enquiry',
      emailGreeting: 'Hello VALFENCE Team,',
      emailBodyIntro: 'I reviewed the VALFENCE pilot scope and would like to discuss running a pilot on our transaction case.',
      emailBodyMatch: 'Our deal match:',
      emailBodyClosing: 'Best regards,',
    },
    roadmap: {
      eyebrow: 'Product Architecture Evolution',
      headline: 'Focus first on onshore wind. Expand as audit trust is proven.',
      subline: 'We are proving the diligence extraction and model-governance pipeline on onshore wind transactions before scaling across adjacent clean technologies.',
      activeBadge: 'Active Pilot',
      architectureBadge: 'Architecture',
      plannedBadge: 'Planned',
      visionBadge: 'Vision',
      steps: [
        {
          stage: 'Phase 1 · Validation Wedge',
          title: 'Onshore Wind',
          description: 'Single-asset DCFs, LiDAR yield analysis, P50/P90 gross-to-net losses, and structured PPA terms.',
          status: 'Active Pilot',
        },
        {
          stage: 'Phase 2 · Solar Expansion',
          title: 'Solar PV Systems',
          description: 'Utility-scale PV, irradiance profiles, solar capture cannibalization, and degradation modeling.',
          status: 'Architecture',
        },
        {
          stage: 'Phase 3 · Storage & Flexibility',
          title: 'BESS (Battery Storage)',
          description: 'Co-located and standalone storage, multi-revenue stacking, cycling degradation, and capacity markets.',
          status: 'Planned',
        },
        {
          stage: 'Phase 4 · Portfolio Platform',
          title: 'Portfolios & Platforms',
          description: 'Multi-jurisdiction portfolio rollups, developer pipeline valuations, and holding company debt sizing.',
          status: 'Vision',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Institutional Validation Partnership',
      headline: 'Turn fragmented transaction data into a valuation model you can defend.',
      subline: 'Partner with us on a single de-identified transaction case. Experience rapid AI extraction combined with absolute source auditability.',
      primaryBtn: 'Discuss a validation pilot',
      directContact: 'Direct contact',
      zeroCommitment: 'Zero commitment to a long-term contract.',
      badge1: 'Strict Confidentiality / De-identified Data',
      badge2: 'Mandatory Analyst Sign-Off Gates',
      badge3: 'Native Excel Compatible Outputs',
    },
    footer: {
      tagline: 'Source-traceable valuation workflows for renewable energy transaction teams. Turn fragmented data into reviewable, defensible DCFs.',
      exploreTitle: 'Explore Product',
      linkProblem: 'The Transaction Problem',
      linkWorkflow: '5-Step Workflow',
      linkWorkspace: 'Interactive Workspace',
      linkBenefits: 'Key Benefits',
      linkPilot: 'Validation Pilot & Fit',
      principlesTitle: 'Operating Principles',
      principle1: 'Evidence First: Metadata retained per assumption.',
      principle2: 'Human Approval: Zero black-box outputs in models.',
      principle3: 'Deterministic Finance: Auditable Python calculations.',
      principle4: 'Excel Native: Formula-linked workbook exports.',
      copyright: '© 2026 VALFENCE · Pre-launch product validation · Not investment, financial or legal advice.',
      imprint: 'Imprint (Impressum)',
      privacy: 'Privacy Notice',
      cookieSettings: 'Cookie Settings',
    },
    modals: {
      imprintTitle: 'Interim Imprint (Impressum)',
      privacyTitle: 'Interim Privacy Notice (Datenschutzerklärung)',
      excelTitle: 'Excel Valuation Model Structure (.xlsx)',
      memoTitle: 'One-Page Executive Review Memo',
      statusPreLaunch: 'Status: Pre-launch product validation · Project / company in formation.',
      closeBtn: 'Close',
      downloadModel: 'Download Sample Valuation Sheet',
    },
    consent: {
      title: 'Privacy & Cookie Preferences',
      description: 'We use essential cookies to provide our services. With your consent, we also use analytical tools (Microsoft Clarity) to improve user experience and evaluate pre-launch interest.',
      privacyLink: 'Privacy Notice',
      acceptAll: 'Accept All',
      rejectAll: 'Reject Non-Essential',
      customize: 'Customize Settings',
      settingsTitle: 'Cookie & Tracking Preferences',
      settingsSubtitle: 'Configure which cookies and telemetry services you permit on VALFENCE.',
      essentialTitle: 'Strictly Essential Cookies',
      essentialDesc: 'Required for technical operation, theme preferences, and security. Cannot be deactivated.',
      analyticsTitle: 'Microsoft Clarity Analytics',
      analyticsDesc: 'Helps us analyze user journeys and interactive workspace interactions. No advertising or commercial profiling.',
      savePreferences: 'Save Preferences',
      alwaysActive: 'Always Active',
    },
  },
  DE: {
    nav: {
      problem: 'Problem',
      workflow: 'Workflow',
      workspace: 'Live Workspace',
      benefits: 'Vorteile',
      whyValfence: 'Warum VALFENCE',
      pilotFit: 'Pilot & Fit',
      discussPilot: 'Pilot anfragen',
    },
    hero: {
      eyebrow: 'Erneuerbare-Energien-Infrastruktur · Produktkonzept',
      headlinePart1: 'Fragmentierte Transaktionsdaten in ',
      headlineHighlight: 'revisionssichere Bewertungen verwandeln.',
      subline:
        'VALFENCE verknüpft technische Gutachten, Markt-Benchmarks und Finanzmodelle in einen quellengestützten Workflow für revisionssichere DCFs, Sensitivitätsanalysen und Investment-Committee-Memos.',
      primaryCta: 'Pilotprojekt anfragen',
      secondaryCta: 'Live Workspace ansehen',
      microcopy: 'Starten Sie mit einer einzelnen anonymisierten Transaktion. Keine IT-Integration, kein Vendor Lock-in.',
      pillar1Title: 'Lückenloser Herkunftsnachweis',
      pillar1Desc: 'Jede Annahme verweist exakt auf Dokumententitel, Seitenzahlen, Zeitstempel und Konfidenzwerte.',
      pillar2Title: 'Human-in-the-Loop Freigabe',
      pillar2Desc: 'Keine unkontrollierten Modellüberschreibungen. Analysten prüfen, justieren und bestätigen jeden Parameter.',
      pillar3Title: 'Deterministische Cashflows',
      pillar3Desc: 'Reproduzierbare 25-Jahre-DCF-Wasserfallberechnungen mit Fremdkapital-Sculpting und DSCR-Covenants.',
    },
    audience: {
      eyebrow: 'Institutioneller Fokus & Asset-Abdeckung',
      persona1Tag: 'Hauptanwender',
      persona1Title: 'M&A-Analysten & Associates',
      persona1Desc: 'Komplexe technische Gutachten abgleichen, revisionssichere Modellannahmen erstellen und Zahlen vor Partnern verteidigen.',
      persona2Tag: 'Zielorganisationen',
      persona2Title: 'Erneuerbare-Fonds & M&A-Boutiquen',
      persona2Desc: 'Infrastruktur-Private-Equity, Transaktionsberatung und IPPs, die schnelle Modellprüfungen ohne Audit-Risiken anstreben.',
      persona3Tag: 'Asset-Fokus',
      persona3Title: 'Clean Energy Infrastruktur',
      assetWind: 'Onshore-Wind',
      assetSolar: 'Photovoltaik (PV)',
      assetBess: 'BESS (Batteriespeicher)',
    },
    problem: {
      eyebrow: 'Engpässe bei der Transaktionsprüfung',
      headlineStart: 'Der Engpass liegt nicht im Berechnen der Zahlen. ',
      headlineSub: 'Sondern darin, ihre Herkunft zu verteidigen.',
      body: 'M&A-Analysten verbringen Tage damit, hunderte Seiten technischer Berichte, PPA-Vertragsentwürfe, EPC-Garantien und Netzanschlussvereinbarungen zu durchforsten. Werden Annahmen manuell in Excel übertragen, geht der Quellennachweis verloren – Senior Reviewer müssen den Datenraum erneut von Grund auf prüfen.',
      friction1Tag: 'Engpass 01',
      friction1Title: 'Unstrukturierte Datenräume',
      friction1Desc: 'Ertragsgutachten, Verfügbarkeitsgarantien und Strompreisprognosen liegen verstreut in unzähligen PDFs ohne einheitliche Datenstruktur.',
      friction1Impact: 'Auswirkung: Wiederholte manuelle Suchaufwände',
      friction2Tag: 'Engpass 02',
      friction2Title: 'Widersprüchliche Belege',
      friction2Desc: 'Gutachterberichte und Verkäufermodelle widersprechen sich häufig. Generische KI-Chatbots halluzinieren Zahlen ohne Audit-Grenzwerte oder Datumsabgleich.',
      friction2Impact: 'Auswirkung: Undokumentierte Modellannahmen',
      friction3Tag: 'Engpass 03',
      friction3Title: 'Lücken in der Governance',
      friction3Desc: 'Partner und Investment Committees vergeuden wertvolle Verhandlungszeit mit der Diskussion von Tabellen-Hardcodes statt mit strategischen Bewertungsfragen.',
      friction3Impact: 'Auswirkung: Verzögerte IC-Freigaben & Deal-Risiken',
      quoteText: '„Woher stammt diese Zahl, welches Dokument belegt sie, und was passiert mit unserer Rendite, wenn sie sich ändert?“',
      quoteAuthor: '— Die Kernfrage, die jedes Investment Committee von seinem Deal-Team einfordert.',
    },
    workflow: {
      eyebrow: 'Das Funktionsprinzip',
      headline: 'Ein strukturierter, revisionssicherer Bewertungsprozess',
      subline: 'Wie rohe Transaktionsdokumente unter verbindlicher Analysten-Freigabe in verteidigungsfähige Finanzergebnisse überführt werden.',
      activeStepTag: 'Interaktiver Prozessschritt',
      keyDeliverablesTitle: 'Wichtigste Ergebnisse & Prüfprotokolle',
      sourceMetadataCitations: 'Quellen-Metadaten & Zitate',
      traceabilityBadge: 'Deterministische Nachvollziehbarkeit',
      steps: [
        {
          number: '01',
          title: 'Einlesen & Strukturieren',
          shortDesc: 'Strukturierte Erfassung von Datenräumen, Ertragsgutachten, PPA-Verträgen und Netzvereinbarungen.',
          details: [
            'Extrahiert technische Parameter aus unabhängigen Ingenieursberichten und Netzstudien.',
            'Behält exakte Dateinamen, Seitenzahlen, Zeitstempel und Maßeinheiten bei.',
            'Berücksichtigt Bewertungsstichtage, um veraltete oder nachgelagerte Daten zu kennzeichnen.',
          ],
          microcopy: 'PDF · Excel · Term Sheets · Marktkurven',
          badge: 'Datenraum-Erfassung',
        },
        {
          number: '02',
          title: 'Evidenz Synthetisieren',
          shortDesc: 'Dokumente vergleichen und belastbare Parameter-Bandbreiten ermitteln.',
          details: [
            'Schlägt fundierte Annahmen mit realistischen Min-/Max-Sensitivitätskorridoren vor.',
            'Gleicht Projektwerte mit regionalen Technologie-Benchmarks ab.',
            'Markiert widersprüchliche Dokumente und erzeugt quellengebundene Begründungen.',
          ],
          microcopy: 'Evidenzbasierte Parameterkorridore',
          badge: 'Evidenz-Synthese',
        },
        {
          number: '03',
          title: 'Analysten-Governance-Gate',
          shortDesc: 'Verbindliche Freigabe durch den Analysten vor Übernahme in finanzielle Berechnungen.',
          details: [
            'Jede wesentliche Annahme erfordert eine menschliche Freigabe vor der DCF-Ausführung.',
            'Analysten können Werte per Schieberegler anpassen oder dealspezifische Notizen ergänzen.',
            'Erkennt fehlende Datenpunkte und generiert gezielte Verkäufer-Q&A-Fragen.',
          ],
          microcopy: 'Obligatorische Freigabe durch Experten',
          badge: 'Menschliche Governance',
        },
        {
          number: '04',
          title: 'Deterministisches DCF-Modell',
          shortDesc: 'Bottom-up 25-Jahre-DCFs, Senior Debt Sculpting und Sensitivitätsmatrizen.',
          details: [
            'Deterministische Algorithmen eliminieren KI-Rechenfehler und nicht-reproduzierbare Ausgaben.',
            'Berechnet Projekt-IRR, Equity-IRR, DSCR-Covenants sowie P50/P90-Sensitivitäten.',
            'Dynamische Capture-Price-Abschläge und OpEx-Inflationsindexierung.',
          ],
          microcopy: 'Prüffähige · Reproduzierbare Mathematik',
          badge: 'Deterministische Engine',
        },
        {
          number: '05',
          title: 'Review-Bereiter Excel-Export',
          shortDesc: 'Erstellung formelverknüpfter Excel-Modelle, Quellennachweise und IC-Memos.',
          details: [
            'Exportiert saubere, formelverknüpfte Excel-Bewertungsmodelle im Standardformat.',
            'Automatisches Quellen- & Evidenzregister, das jede Zelle mit ihrem PDF-Auszug verbindet.',
            'Liefert ein kompaktes Investment-Committee-Memo und ein Register fehlender Datenpunkte.',
          ],
          microcopy: 'Natives Excel · Vollständiger Audit-Trail',
          badge: 'Review-Bereite Bereitstellung',
        },
      ],
    },
    workspace: {
      eyebrow: 'Interaktive Bewertungsumgebung',
      headline: 'Source-to-Valuation Live Workspace',
      subline: 'Testen Sie einen Beispiel-Workflow: Quellenauszüge prüfen, Annahmen vergleichen und Änderungen in einer vereinfachten Bewertungsdemo verfolgen.',
      assetLabel: 'Asset: Windpark North Ridge (48,0 MW)',
      assetTag: 'Entwurf IC-Review-Paket',
      p50Btn: 'P50 Basisszenario',
      p90Btn: 'P90 Downside-Szenario',
      governanceGate: 'Governance Gate',
      reviewed: 'Geprüft',
      approvedStatus: 'Gate Freigegeben',
      pendingReview: 'Freigabe ausstehend',
      tabs: {
        assumptions: 'Annahmen-Tabelle',
        conflictResolver: 'Konflikt-Resolver',
        dcfWaterfall: '25-Jahre DCF-Wasserfall',
        missingInputs: 'Fehlende Diligence-Daten',
        benchmarks: 'Benchmark-Vergleiche',
      },
      equityIrr: 'Equity IRR',
      projectIrr: 'Projekt-IRR',
      ev: 'Unternehmenswert (EV)',
      minDscr: 'Min. DSCR',
      scenarioNote: 'Senior Debt gesculptet auf 1,25x P90 Covenant; 18 Jahre Laufzeit.',
      selectedAssumption: 'Ausgewählter Parameter:',
      paramSensitivity: 'Parameter-Sensitivität & Anpassung',
      minLabel: 'Min. Grenze:',
      baseLabel: 'Basiswert:',
      maxLabel: 'Max. Grenze:',
      currentValue: 'Aktueller Wert:',
      resetBase: 'Auf Original zurücksetzen',
      approveBtn: 'Annahme freigeben',
      approvedBtn: 'Freigabe bestätigt',
      sourceEvidenceBadge: 'Quellen-Evidenz & Audit-Trail',
      documentType: 'Dokumenttyp:',
      pageCitation: 'Seitenzitat:',
      extractionDate: 'Bewertungs-Extraktion:',
      sourceConfidence: 'Konfidenz:',
      highConfidence: 'Hoch (Primärquelle)',
      mediumConfidence: 'Mittel (Entwurfsdokument)',
      verifiedExcerpt: 'Verifizierter Dokumentenauszug:',
      marketBenchmark: 'Markt-Benchmark-Vergleich:',
      analystRationale: 'Analysten-Bewertung & Notizen:',
      cutoffEligible: 'Vor Stichtag validiert (Bewertungsstichtag: 30.06.2026)',
      exportExcelBtn: 'Modellvorschau',
      generateMemoBtn: 'Memo-Vorschau',
      conflictTitle: 'Erkannte Dokumentenkonflikte in der Due Diligence',
      conflictSubtitle: 'Widersprüchliche Zahlen zwischen Verkäufermodell und unabhängigem Ertragsgutachten identifiziert.',
      conflictDoc1Title: 'Unabhängiges Ertragsgutachten (DNV)',
      conflictDoc1Value: 'P50 NCF: 34,8 % (146,3 GWh/a)',
      conflictDoc2Title: 'Seller Information Memorandum (SIM)',
      conflictDoc2Value: 'P50 NCF: 36,5 % (153,5 GWh/a)',
      conflictResolvedLabel: 'Gewählte Position für das Modell:',
      missingInputsTitle: 'Diligence-Lücken & Verkäufer-Q&A-Checkliste',
      missingInputsSubtitle: 'Parameter standardmäßiger Bewertungsmodelle, die im aktuellen Datenraum noch unbestätigt sind oder fehlen.',
      missingItem1Title: 'Netzanschluss-Abregelungsvereinbarung (Curtailment Cap)',
      missingItem1Desc: 'Netzvertrag enthält 5 % Abregelungsrisiko ohne Entschädigungsklausel.',
      missingItem1Action: 'Klärung beim Übertragungsnetzbetreiber via Verkäufer-Q&A angefordert.',
      missingItem2Title: 'Rückbau-Treuhandvereinbarung (Decommissioning)',
      missingItem2Desc: 'Sicherheitsbürgschaft für Rückbaukosten (Jahre 20–25) fehlt.',
      missingItem2Action: '1,2 Mio. € Treuhand-Rückstellung im konservativen Fall hinterlegt.',
      missingItem3Title: 'TSA-Indexierungsdeckel / Boden-Formel',
      missingItem3Desc: 'Wartungsvertrag des Turbinenherstellers referenziert unüblichen Index.',
      missingItem3Action: 'Pauschale Eskalation von 2,5 % p.a. vorbehaltlich juristischer Prüfung angesetzt.',
      dcfWaterfallTitle: 'Deterministischer 25-Jahre DCF-Wasserfall',
      dcfWaterfallSubtitle: 'Formelbasierte Berechnung mit Tilgungsplan und Prüfung der DSCR-Schuldenkennzahlen.',
      yearCol: 'Jahr',
      revenueCol: 'Umsatz (Mio. €)',
      opexCol: 'OpEx (Mio. €)',
      debtServiceCol: 'Schuldendienst (Mio. €)',
      fcfeCol: 'FCFE (Mio. €)',
      statusApproved: 'Freigegeben',
      statusOverridden: 'Angepasst',
      statusPending: 'Ausstehend',
    },
    visualShowcase: {
      eyebrow: 'Interaktive Visuelle Einblicke',
      headline: 'Visuelle Intelligenz in Echtzeit',
      subline: 'Entdecken Sie drei unabhängige Konzeptbeispiele: Quellenfluss, Ertragssimulation und visueller Dokumentenvergleich.',
      tabGraph: '1. Datenherkunft (Graph)',
      tabSimulator: '2. Ertrags-Simulator',
      tabScanner: '3. Annahmen-Scanner',
      graphTitle: 'Interaktiver Herkunftsgraph (Knowledge Graph)',
      graphSubtitle: 'Klicken Sie auf einen Knoten, um zu sehen, wie Zitate über das Governance-Gate in das finale DCF-Modell fließen.',
      simTitle: 'Dynamischer Stresstest-Simulator in Echtzeit',
      simSubtitle: 'Justieren Sie Windressource, PPA-Preis und Abregelung, um sofortige deterministische Auswirkungen auf Umsatz, IRR und Covenants zu sehen.',
      simWindSpeed: 'Windgeschwindigkeit (m/s)',
      simCurtailment: 'Netzabregelung / Curtailment (%)',
      simPpaPrice: 'PPA / Marktpreis (€/MWh)',
      simCalculatedYield: 'Theoretischer Ertrag:',
      simNetGen: 'Netto-Einspeisung:',
      simRevenue: 'Jahresumsatz:',
      simProjectIrr: 'Projekt-IRR:',
      simMinDscr: 'Min. DSCR:',
      scannerTitle: 'Scanner für unverifizierte Annahmen',
      scannerSubtitle: 'Automatische Prüfung der Datenraumdokumente zur Erkennung von Hardcodes, ungeprüften Behauptungen und Zitatabweichungen.',
      scannerVerifiedBadge: 'Quelle verifiziert & auditiert',
      scannerUnverifiedBadge: 'Unverifiziert / Hardcode-Warnung',
      scannerAutoToggle: 'Automatische Scan-Animation',
    },
    benefits: {
      eyebrow: 'Entwickelt für Institutionelle Reviews',
      headlineMain: 'Schnellere Erstprüfung, ',
      headlineSub: 'ganz ohne Black Box.',
      subline: 'VALFENCE verbindet die strukturierte Extraktionskraft spezialisierter KI mit der deterministischen Präzision und Governance, die Partner und Investment Committees verlangen.',
      stat1Label: 'Zeitersparnis bei der Erfassung',
      stat1Value: '70 %',
      stat1Desc: 'Reduktion der manuellen Datenerfassungsstunden',
      stat2Label: 'Quellen-Rückverfolgbarkeit',
      stat2Value: '100 %',
      stat2Desc: 'Seitengenaues Zitat für jede Annahme',
      stat3Label: 'Deterministische Engine',
      stat3Value: '0 %',
      stat3Desc: 'Keine KI-Rechenfehler im Finanzwasserfall',
      stat4Label: 'Beschleunigte Prüfung',
      stat4Value: '3x',
      stat4Desc: 'Schnellere Modellvalidierung für IC-Memos',
      cards: [
        {
          tag: 'Prüfbarkeit',
          title: 'Lückenloser Dokumentennachweis',
          description: 'Jede wesentliche Annahme behält ihr Quelldokument, ihre Seitenzahl, ihr Extraktionsdatum und ihre Einheiten bei. Nie wieder im IC-Review nach Zitaten suchen.',
          highlight: 'Seitengenaues Zitat je Eingabewert',
        },
        {
          tag: 'Verteidigbarkeit',
          title: 'Belastbare Parameter-Bandbreiten',
          description: 'Bewerten Sie gewählte Zahlen im Kontext von Markt-Benchmarks, regionalen Vergleichswerten und expliziten Analysten-Notizen statt ungeprüfter KI-Texte.',
          highlight: 'Benchmark-Plausibilitätsprüfungen',
        },
        {
          tag: 'Präzision',
          title: 'Deterministische Finanzmathematik',
          description: 'Freigegebene Eingaben speisen deterministische, auditerprobte Python-Engines. 25-Jahre-DCFs, DSCR-Sculpting und Sensitivitäten ohne Excel-Formelfehler.',
          highlight: 'Deterministisches Python-DCF',
        },
        {
          tag: 'Effizienz',
          title: 'Beschleunigtes Deal-Triage',
          description: 'Verlagern Sie Analystenzeit vom monotonen PDF-Abtippen hin zur Bewertung kommerzieller Risiken, Vertragsklauseln und Verhandlungsstrategien.',
          highlight: 'Fokus auf Transaktionsstrategie',
        },
        {
          tag: 'Übergabe',
          title: 'Review-Bereite Excel-Lieferung',
          description: 'Exportieren Sie dynamische, formelverknüpfte Excel-Modelle, automatisierte Quellenregister, Due-Diligence-Checklisten und prägnante IC-Memos.',
          highlight: 'Nativer Excel-Modell-Export',
        },
      ],
      pilotCardTitle: 'Bereit für den Benchmark an einem echten Deal?',
      pilotCardDesc: 'Führen Sie ein strukturiertes Pilotprojekt an einem anonymisierten Transaktionsfall durch, um Geschwindigkeit und Revisionssicherheit zu testen.',
      pilotCardBtn: 'Pilotprojekt anfragen',
    },
    differentiation: {
      eyebrow: 'Vergleichsmatrix',
      headlineMain: 'Tiefes Branchen-Know-how kombiniert mit ',
      headlineHighlight: 'kompromissloser Revisionssicherheit.',
      subline: 'Generische KI fasst Texte zusammen. Standardsoftware sperrt Modelle in geschlossene Datensilos. VALFENCE ist maßgeschneidert für Transaktionsteams im Bereich erneuerbare Energien, bei denen jede Zahl dem Investment Committee standhalten muss.',
      colDimension: 'Fähigkeit / Dimension',
      colGenericAi: 'Generische KI (LLMs)',
      colManualExcel: 'Manuelles Excel & PDFs',
      colBroadSaas: 'Allgemeine M&A-SaaS',
      colValfence: 'VALFENCE',
      rows: [
        {
          feature: 'Quellen- & Seitenzitate',
          genericAI: 'Häufige Halluzinationen & Quellenverlust',
          manualExcel: 'Verstreut in manuellen Notizen & PDFs',
          broadSoftware: 'Generische Datenbank-Feeds',
          valfence: 'Seitengenaues Zitat für jeden Parameter',
        },
        {
          feature: 'Governance-Freigabe-Gate',
          genericAI: 'Keine (direkte ungeprüfte Ausgabe)',
          manualExcel: 'Manuelle E-Mail-Freigaben & Zellenspur',
          broadSoftware: 'Statische manuelle Eingaben',
          valfence: 'Obligatorisches Freigabe-Gate für Analysten',
        },
        {
          feature: 'Berechnungs-Engine',
          genericAI: 'Unzuverlässige generative Mathematik',
          manualExcel: 'Anfällig für manuelle Formelfehler',
          broadSoftware: 'Proprietäre, geschlossene Engine',
          valfence: 'Deterministisches, prüffähiges Python-DCF',
        },
        {
          feature: 'Spezifische Erneuerbare-Logik',
          genericAI: 'Allgemeiner Corporate-Finance-Kontext',
          manualExcel: 'Deal für Deal manuell neu gebaut',
          broadSoftware: 'Allgemeine, unspezifische M&A-Tools',
          valfence: 'Native P50/P90-, PPA/CfD- & OpEx-Kurven',
        },
        {
          feature: 'Excel-Modell-Kompatibilität',
          genericAI: 'Unstrukturierter Text / CSV-Tabellen',
          manualExcel: 'Natives Excel-Format',
          broadSoftware: 'Geschlossene Web-Oberfläche',
          valfence: 'Direktexport in standardisierte Excel-Modelle',
        },
        {
          feature: 'Stichtags-Prüfung (Cutoff)',
          genericAI: 'Vermengt veraltete und aktuelle Daten',
          manualExcel: 'Manuelle Datumsprüfung',
          broadSoftware: 'Live-Feed ohne Deal-Stichtag',
          valfence: 'Strikte stichtagsbezogene Dokumentenfilterung',
        },
      ],
    },
    pilot: {
      eyebrow: 'Umfang des Validierungs-Pilotprojekts',
      headline: 'Ein Transaktionsfall. Konkreter Mehrwert.',
      subline: 'Wir kooperieren mit ausgewählten M&A-Boutiquen, um den quellengestützten Workflow an echten, anonymisierten Clean-Energy-Deals zu testen.',
      deliverablesBadge: 'Pilot-Leistungsumfang (Enthalten)',
      deliverablesTitle: 'Was Ihr Deal-Team erhält:',
      deliverablesList: [
        'Strukturierte Bewertungsannahmen direkt aus Ihrem Datenraum extrahiert',
        'Zellengenaue Quellen- und Seitenrückverfolgbarkeit mit PDF-Auszügen',
        'Vollständiges Register fehlender Datenpunkte & Diligence-Konflikte',
        'Belastbare Parameter-Bandbreiten im Vergleich zu regionalen Benchmarks',
        'Formelverknüpftes Excel-Bewertungsmodell passend zu Ihrer Transaktion',
        'Kompaktes 1-seitiges IC-Memo, bereit zur Freigabe durch Partner',
      ],
      boundariesBadge: 'Abgrenzung (Ausdrücklich nicht enthalten)',
      boundariesTitle: 'Was bewusst außerhalb des Pilotumfangs liegt:',
      boundariesList: [
        'Keine Erbringung von Anlage-, Rechts- oder Steuerberatung',
        'Keine API-Verbindungen oder IT-Systemintegrationen erforderlich',
        'Kein mehrjähriger SaaS-Vertrag oder wiederkehrende Vorabverpflichtung',
        'Keine Speicherung vertraulicher Rohdaten; ausschließlich anonymisierte Daten',
      ],
      fitToolTitle: 'Interaktiver Eignungsprüfer',
      fitToolSubtitle: 'Wählen Sie die Kriterien Ihres Transaktionsprofils aus, um die Eignung für das Pilotprojekt zu ermitteln:',
      fitLevelHigh: 'Hohe Eignung für Pilotprojekt',
      fitLevelHighDesc: 'Ihre Transaktionsparameter entsprechen ideal dem Profil für unser fokussiertes Validierungs-Pilotprojekt.',
      fitLevelMedium: 'Potenzielle Eignung',
      fitLevelMediumDesc: 'Vielversprechendes Profil. Wir können den Workflow auf Ihre spezifischen Anlagendokumente abstimmen.',
      fitLevelLow: 'Transaktionskriterien auswählen',
      fitLevelLowDesc: 'Wählen Sie die Kriterien aus, die Ihr Team und Ihre aktuelle Deal-Pipeline beschreiben.',
      selectedCountLabel: 'Kriterien erfüllt',
      discussPilotBtn: 'Pilotprojekt für diesen Deal anfragen',
      directContactLabel: 'Oder direkt kontaktieren:',
      criteria: [
        {
          id: 'case_type',
          title: 'Einzelnes, anonymisiertes Clean-Energy-Asset',
          description: 'Ein betriebsbereiter oder baureifer Onshore-Wind- oder Solarpark mit bekannter Kapazität und Rechtsordnung.',
        },
        {
          id: 'doc_availability',
          title: 'Wesentliche Fachberichte & Abnahmeverträge',
          description: 'Zugang zu zentralen Diligence-Dateien (Ertragsgutachten, PPA-Bedingungen, O&M) und bestehendem Excel-Referenzmodell.',
        },
        {
          id: 'analyst_capacity',
          title: 'Analyst für Vergleichsprüfung verfügbar',
          description: 'Ein Teammitglied zur Bewertung von Extraktionsgenauigkeit, Quellenzitaten und Benutzerfreundlichkeit.',
        },
        {
          id: 'comparison_willingness',
          title: 'Interesse an der Reduktion von Vorbereitungszeiten',
          description: 'Bereitschaft, Zeitersparnis und Klarheit bei der IC-Prüfung gegenüber dem manuellen Prozess zu messen.',
        },
      ],
      emailSubject: 'VALFENCE Pilotprojekt Anfrage',
      emailGreeting: 'Hallo VALFENCE-Team,',
      emailBodyIntro: 'ich habe den Leistungsumfang des VALFENCE-Pilotprojekts geprüft und möchte die Durchführung an einem unserer Transaktionsfälle besprechen.',
      emailBodyMatch: 'Unser Deal-Profil:',
      emailBodyClosing: 'Mit freundlichen Grüßen,',
    },
    roadmap: {
      eyebrow: 'Produkt- & Technologie-Roadmap',
      headline: 'Fokus zuerst auf Onshore-Wind. Schrittweise Expansion mit bewiesenem Vertrauen.',
      subline: 'Wir validieren die Diligence-Extraktion und Modell-Governance an Onshore-Wind-Deals, bevor wir auf angrenzende Clean-Tech-Bereiche skalieren.',
      activeBadge: 'Aktives Pilotprojekt',
      architectureBadge: 'Architekturphase',
      plannedBadge: 'Geplant',
      visionBadge: 'Vision',
      steps: [
        {
          stage: 'Phase 1 · Validierungsfokus',
          title: 'Onshore-Windenergie',
          description: 'Einzel-Asset-DCFs, LiDAR-Ertragsanalyse, P50/P90-Brutto-zu-Netto-Verluste und strukturierte PPA-Verträge.',
          status: 'Aktives Pilotprojekt',
        },
        {
          stage: 'Phase 2 · Solar-Erweiterung',
          title: 'Photovoltaik-Freiflächenanlagen',
          description: 'Utility-Scale-PV, Einstrahlungsprofile, Solar-Kannibalisierung und Degradationsmodellierung.',
          status: 'Architekturphase',
        },
        {
          stage: 'Phase 3 · Speicher & Flexibilität',
          title: 'BESS (Batteriespeicher)',
          description: 'Co-located und Standalone-Speicher, Multi-Revenue-Stacking, Zyklen-Degradation und Kapazitätsmärkte.',
          status: 'Geplant',
        },
        {
          stage: 'Phase 4 · Portfolio-Plattform',
          title: 'Portfolios & Entwicklerplattformen',
          description: 'Multi-Jurisdiktions-Portfolios, Bewertung von Projektpipelines und Holding-Finanzierungsstrukturen.',
          status: 'Vision',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Institutionelle Validierungspartnerschaft',
      headline: 'Verwandeln Sie fragmentierte Transaktionsdaten in ein verteidigungsfähiges Bewertungsmodell.',
      subline: 'Arbeiten Sie mit uns an einem einzelnen anonymisierten Transaktionsfall. Erleben Sie schnelle KI-Extraktion kombiniert mit absoluter Revisionssicherheit.',
      primaryBtn: 'Validierungs-Pilotprojekt anfragen',
      directContact: 'Direkter Kontakt',
      zeroCommitment: 'Keine langfristigen Vertragsbindungen.',
      badge1: 'Strikte Vertraulichkeit / Anonymisierte Daten',
      badge2: 'Verbindliche Analysten-Freigabe-Gates',
      badge3: 'Nativ Excel-kompatible Ergebnisse',
    },
    footer: {
      tagline: 'Quellengestützte Bewertungs-Workflows für Transaktionsteams im Bereich erneuerbare Energien. Fragmentierte Daten in revisionssichere DCFs verwandeln.',
      exploreTitle: 'Produkt Entdecken',
      linkProblem: 'Die Problemstellung',
      linkWorkflow: '5-Schritte-Workflow',
      linkWorkspace: 'Interaktiver Workspace',
      linkBenefits: 'Wichtigste Vorteile',
      linkPilot: 'Pilotprojekt & Eignung',
      principlesTitle: 'Leitprinzipien',
      principle1: 'Evidenz zuerst: Metadaten für jede Annahme erhalten.',
      principle2: 'Menschliche Freigabe: Keine Black-Box-Ergebnisse in Modellen.',
      principle3: 'Deterministische Finanzen: Prüffähige Python-Berechnungen.',
      principle4: 'Natives Excel: Formelverknüpfte Arbeitsmappen-Exporte.',
      copyright: '© 2026 VALFENCE · Produktvalidierung vor dem offiziellen Launch · Keine Anlage-, Finanz- oder Rechtsberatung.',
      imprint: 'Impressum',
      privacy: 'Datenschutzerklärung',
      cookieSettings: 'Cookie-Einstellungen',
    },
    modals: {
      imprintTitle: 'Vorläufiges Impressum',
      privacyTitle: 'Vorläufige Datenschutzerklärung',
      excelTitle: 'Excel-Bewertungsmodell-Struktur (.xlsx)',
      memoTitle: '1-Seiten Investment-Committee-Memo',
      statusPreLaunch: 'Status: Vorbereitende Produktvalidierung · Projekt / Gesellschaft in Gründung.',
      closeBtn: 'Schließen',
      downloadModel: 'Muster-Bewertungsmodell herunterladen',
    },
    consent: {
      title: 'Datenschutz & Cookie-Einstellungen',
      description: 'Wir verwenden technisch notwendige Cookies zur Bereitstellung unserer Website. Mit Ihrer Zustimmung nutzen wir zudem Analysedienste (Microsoft Clarity), um die Nutzererfahrung zu verbessern und das Interesse vor dem offiziellen Start zu evaluieren.',
      privacyLink: 'Datenschutzerklärung',
      acceptAll: 'Alle akzeptieren',
      rejectAll: 'Nur essenzielle akzeptieren',
      customize: 'Einstellungen anpassen',
      settingsTitle: 'Cookie- & Tracking-Einstellungen',
      settingsSubtitle: 'Konfigurieren Sie, welche Cookies und Telemetriedienste Sie auf VALFENCE zulassen möchten.',
      essentialTitle: 'Technisch essenzielle Cookies',
      essentialDesc: 'Erforderlich für den sicheren Betrieb, Theme-Einstellungen und Grundfunktionen. Können nicht deaktiviert werden.',
      analyticsTitle: 'Microsoft Clarity Webanalyse',
      analyticsDesc: 'Hilft uns, Interaktionsmuster und die Nutzung des interaktiven Workspaces zu verstehen. Keine Werbe- oder Marketing-Tracker.',
      savePreferences: 'Einstellungen speichern',
      alwaysActive: 'Immer aktiv',
    },
  },
};
