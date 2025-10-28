/**
 * Wonik IPS Semiconductor Equipment UX Writing Guidelines
 *
 * Core Principles:
 * 1. Accuracy (정확성)
 * 2. Safety (안전성)
 * 3. Immediate Comprehensibility (즉시 이해 가능성)
 * 4. Consistency (일관성)
 * 5. Hierarchical Information Structure (계층적 정보 구조)
 */

// Component types for semiconductor equipment UI
export type ComponentType =
  | 'button'           // 버튼
  | 'alert'            // 알림
  | 'input'            // 입력 필드
  | 'status'           // 상태 표시
  | 'parameter'        // 파라미터
  | 'action'           // 동작
  | 'measurement';     // 측정값

// Safety levels for alerts and warnings
export type SafetyLevel =
  | 'critical'   // 🚨 Critical emergency
  | 'danger'     // 🔴 High risk
  | 'warning'    // ⚠️ Caution required
  | 'blocked';   // 🚫 Action blocked

// Unit types for measurements
export const UNITS = {
  temperature: '°C',
  pressure: 'Torr',
  flow: 'sccm',
  power: 'W',
  voltage: 'V',
  current: 'A',
  time: 's',
  rpm: 'RPM',
} as const;

// Safety icons mapping
export const SAFETY_ICONS = {
  critical: '🚨',
  danger: '🔴',
  warning: '⚠️',
  blocked: '🚫',
} as const;

// Status icons and text combinations
export const STATUS_INDICATORS = {
  running: { icon: '🟢', text: '실행 중' },
  stopped: { icon: '⚪', text: '정지' },
  error: { icon: '🔴', text: '오류' },
  warning: { icon: '🟡', text: '경고' },
  ready: { icon: '🟢', text: '준비' },
  processing: { icon: '🔵', text: '처리 중' },
  complete: { icon: '✅', text: '완료' },
} as const;

// Prohibited expressions that must be avoided
export const PROHIBITED_EXPRESSIONS = [
  '적절한',
  '적당한',
  '조금',
  '약간',
  '잠시',
  '나중에',
  '가능하면',
  '대략',
  '정도',
  '쯤',
] as const;

// Validation categories
export type ValidationCategory =
  | 'accuracy'      // 정확성
  | 'clarity'       // 명확성
  | 'safety'        // 안전성
  | 'usability';    // 사용성

// Validation result
export interface ValidationResult {
  category: ValidationCategory;
  passed: boolean;
  score: number;
  issues: ValidationIssue[];
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  messageKo: string;
  suggestion?: string;
  suggestionKo?: string;
  line?: number;
}

// Text generation request
export interface TextGenerationRequest {
  componentType: ComponentType;
  context: string;
  safetyLevel?: SafetyLevel;
  includeUnit?: keyof typeof UNITS;
  value?: number | string;
}

// Text generation result
export interface TextGenerationResult {
  text: string;
  textKo: string;
  explanation: string;
  explanationKo: string;
  appliedRules: string[];
}

/**
 * Generate UX text following IPS guidelines
 */
export function generateIPSText(request: TextGenerationRequest): TextGenerationResult {
  const { componentType, context, safetyLevel, includeUnit, value } = request;

  let text = '';
  let textKo = '';
  let explanation = '';
  let explanationKo = '';
  const appliedRules: string[] = [];

  // Apply safety icon if safety level is specified
  if (safetyLevel) {
    const icon = SAFETY_ICONS[safetyLevel];
    text = `${icon} `;
    textKo = `${icon} `;
    appliedRules.push('Safety icon applied');
  }

  // Helper function to detect keywords in context
  const hasKeyword = (keywords: string[]) =>
    keywords.some(keyword => context.toLowerCase().includes(keyword));

  // Generate text based on component type
  switch (componentType) {
    case 'button':
      if (hasKeyword(['start', '시작', 'begin', '개시'])) {
        text += 'Start';
        textKo += '시작';
        explanation = 'Clear action verb for starting operation';
        explanationKo = '동작 시작을 명확히 표현';
      } else if (hasKeyword(['stop', '정지', 'halt'])) {
        text += 'Stop';
        textKo += '정지';
        explanation = 'Clear action verb for stopping operation';
        explanationKo = '동작 정지를 명확히 표현';
      } else if (hasKeyword(['emergency', '긴급', '비상'])) {
        text += 'Emergency Stop';
        textKo += '긴급 정지';
        explanation = 'Emergency action button with clear urgency';
        explanationKo = '긴급 동작 버튼으로 명확한 긴급성 표현';
      } else if (hasKeyword(['reset', '리셋', '재설정', '초기화'])) {
        text += 'Reset';
        textKo += '초기화';
        explanation = 'Reset action button';
        explanationKo = '초기화 동작 버튼';
      } else if (hasKeyword(['confirm', '확인', 'ok'])) {
        text += 'Confirm';
        textKo += '확인';
        explanation = 'Confirmation action button';
        explanationKo = '확인 동작 버튼';
      } else if (hasKeyword(['cancel', '취소'])) {
        text += 'Cancel';
        textKo += '취소';
        explanation = 'Cancel action button';
        explanationKo = '취소 동작 버튼';
      } else {
        // Generic button text based on context
        text += 'Execute';
        textKo += '실행';
        explanation = 'Generic action button based on context';
        explanationKo = '상황에 따른 일반 동작 버튼';
      }
      appliedRules.push('Principle: Immediate Comprehensibility');
      break;

    case 'parameter':
    case 'measurement':
      if (value !== undefined && includeUnit) {
        const unit = UNITS[includeUnit];
        text = `${value}${unit}`;
        textKo = `${value}${unit}`;
        explanation = `Precise value with standard unit (${unit})`;
        explanationKo = `정확한 단위 표기 (${unit})`;
        appliedRules.push('Principle: Accuracy', 'FR-002: Unit specification');
      } else {
        // Extract parameter name from context
        let paramName = 'Value';
        let paramNameKo = '값';

        if (hasKeyword(['temperature', '온도', 'temp'])) {
          paramName = 'Temperature';
          paramNameKo = '온도';
          if (!includeUnit && !value) {
            text = includeUnit ? `${paramName} (${UNITS[includeUnit]})` : `${paramName} (°C)`;
            textKo = includeUnit ? `${paramNameKo} (${UNITS[includeUnit]})` : `${paramNameKo} (°C)`;
          }
        } else if (hasKeyword(['pressure', '압력'])) {
          paramName = 'Pressure';
          paramNameKo = '압력';
          if (!includeUnit && !value) {
            text = includeUnit ? `${paramName} (${UNITS[includeUnit]})` : `${paramName} (Torr)`;
            textKo = includeUnit ? `${paramNameKo} (${UNITS[includeUnit]})` : `${paramNameKo} (Torr)`;
          }
        } else if (hasKeyword(['flow', '유량', 'rate'])) {
          paramName = 'Flow Rate';
          paramNameKo = '유량';
          if (!includeUnit && !value) {
            text = includeUnit ? `${paramName} (${UNITS[includeUnit]})` : `${paramName} (sccm)`;
            textKo = includeUnit ? `${paramNameKo} (${UNITS[includeUnit]})` : `${paramNameKo} (sccm)`;
          }
        } else if (hasKeyword(['power', '전력', '파워'])) {
          paramName = 'Power';
          paramNameKo = '전력';
          if (!includeUnit && !value) {
            text = includeUnit ? `${paramName} (${UNITS[includeUnit]})` : `${paramName} (W)`;
            textKo = includeUnit ? `${paramNameKo} (${UNITS[includeUnit]})` : `${paramNameKo} (W)`;
          }
        } else if (hasKeyword(['voltage', '전압'])) {
          paramName = 'Voltage';
          paramNameKo = '전압';
          if (!includeUnit && !value) {
            text = includeUnit ? `${paramName} (${UNITS[includeUnit]})` : `${paramName} (V)`;
            textKo = includeUnit ? `${paramNameKo} (${UNITS[includeUnit]})` : `${paramNameKo} (V)`;
          }
        }

        if (!text) {
          text = `${paramName}`;
          textKo = `${paramNameKo}`;
        }

        explanation = `Parameter label with standard unit notation`;
        explanationKo = `표준 단위 표기법을 적용한 파라미터 라벨`;
        appliedRules.push('Principle: Accuracy');
      }
      break;

    case 'alert':
      // Determine alert prefix based on safety level
      if (safetyLevel === 'critical') {
        text += 'IMMEDIATE ACTION: ';
        textKo += '즉시 대응: ';
        appliedRules.push('FR-004: Safety emphasis', 'Principle: Safety');
      } else if (safetyLevel === 'danger') {
        text += 'DANGER: ';
        textKo += '위험: ';
        appliedRules.push('Principle: Safety');
      } else if (safetyLevel === 'warning') {
        text += 'WARNING: ';
        textKo += '경고: ';
        appliedRules.push('Principle: Safety');
      } else if (safetyLevel === 'blocked') {
        text += 'BLOCKED: ';
        textKo += '차단: ';
        appliedRules.push('Principle: Safety');
      }

      // Generate alert message based on context
      if (hasKeyword(['temperature', '온도']) && hasKeyword(['high', 'exceed', '높', '초과', 'over'])) {
        const alertText = value && includeUnit ?
          `Temperature exceeds limit (${value}${UNITS[includeUnit]})` :
          'Chamber temperature too high';
        const alertTextKo = value && includeUnit ?
          `온도 한계 초과 (${value}${UNITS[includeUnit]})` :
          '챔버 온도 과다';
        text += alertText;
        textKo += alertTextKo;
        explanation = 'Safety alert with specific issue and value';
        explanationKo = '구체적인 문제와 값을 포함한 안전 경고';
      } else if (hasKeyword(['pressure', '압력']) && hasKeyword(['high', 'exceed', '높', '초과', 'over'])) {
        const alertText = value && includeUnit ?
          `Pressure exceeds limit (${value}${UNITS[includeUnit]})` :
          'Chamber pressure too high';
        const alertTextKo = value && includeUnit ?
          `압력 한계 초과 (${value}${UNITS[includeUnit]})` :
          '챔버 압력 과다';
        text += alertText;
        textKo += alertTextKo;
        explanation = 'Safety alert with specific issue and value';
        explanationKo = '구체적인 문제와 값을 포함한 안전 경고';
      } else if (hasKeyword(['error', '오류', 'fault', '장애'])) {
        text += 'System error detected';
        textKo += '시스템 오류 감지';
        explanation = 'Error alert message';
        explanationKo = '오류 알림 메시지';
      } else if (hasKeyword(['door', '도어', 'open', '열림'])) {
        text += 'Door open - Interlock active';
        textKo += '도어 열림 - 인터락 활성';
        explanation = 'Safety interlock alert';
        explanationKo = '안전 인터락 경고';
      } else {
        // Generic alert based on context
        text += 'Check system status';
        textKo += '시스템 상태 확인';
        explanation = 'Generic alert message based on context';
        explanationKo = '상황에 따른 일반 경고 메시지';
      }
      appliedRules.push('Principle: Immediate Comprehensibility');
      break;

    case 'status':
      if (hasKeyword(['running', '실행', 'active', '작동'])) {
        text = '🟢 Running';
        textKo = '🟢 실행 중';
        explanation = 'Active process status';
        explanationKo = '활성 프로세스 상태';
      } else if (hasKeyword(['stopped', '정지', 'idle', '대기'])) {
        text = '⚪ Stopped';
        textKo = '⚪ 정지';
        explanation = 'Stopped status';
        explanationKo = '정지 상태';
      } else if (hasKeyword(['error', '오류', 'fault', '장애'])) {
        text = '🔴 Error';
        textKo = '🔴 오류';
        explanation = 'Error status';
        explanationKo = '오류 상태';
      } else if (hasKeyword(['warning', '경고', 'caution', '주의'])) {
        text = '🟡 Warning';
        textKo = '🟡 경고';
        explanation = 'Warning status';
        explanationKo = '경고 상태';
      } else if (hasKeyword(['ready', '준비', 'standby'])) {
        text = '🟢 Ready';
        textKo = '🟢 준비';
        explanation = 'Ready status';
        explanationKo = '준비 상태';
      } else if (hasKeyword(['processing', '처리', 'in progress', '진행'])) {
        text = '🔵 Processing';
        textKo = '🔵 처리 중';
        explanation = 'Processing status';
        explanationKo = '처리 중 상태';
      } else if (hasKeyword(['complete', '완료', 'finished', 'done'])) {
        text = '✅ Complete';
        textKo = '✅ 완료';
        explanation = 'Complete status';
        explanationKo = '완료 상태';
      } else {
        text = 'Status';
        textKo = '상태';
        explanation = 'Generic status indicator';
        explanationKo = '일반 상태 표시';
      }
      appliedRules.push('FR-008: Standard status indicators', 'Principle: Immediate Comprehensibility');
      break;

    case 'input':
      if (hasKeyword(['temperature', '온도'])) {
        text = includeUnit ? `Temperature (${UNITS[includeUnit]})` : 'Temperature (°C)';
        textKo = includeUnit ? `온도 (${UNITS[includeUnit]})` : '온도 (°C)';
        explanation = 'Input field label with unit';
        explanationKo = '단위가 포함된 입력 필드 라벨';
      } else if (hasKeyword(['pressure', '압력'])) {
        text = includeUnit ? `Pressure (${UNITS[includeUnit]})` : 'Pressure (Torr)';
        textKo = includeUnit ? `압력 (${UNITS[includeUnit]})` : '압력 (Torr)';
        explanation = 'Input field label with unit';
        explanationKo = '단위가 포함된 입력 필드 라벨';
      } else if (hasKeyword(['flow', '유량'])) {
        text = includeUnit ? `Flow Rate (${UNITS[includeUnit]})` : 'Flow Rate (sccm)';
        textKo = includeUnit ? `유량 (${UNITS[includeUnit]})` : '유량 (sccm)';
        explanation = 'Input field label with unit';
        explanationKo = '단위가 포함된 입력 필드 라벨';
      } else {
        text = 'Input Value';
        textKo = '입력 값';
        explanation = 'Generic input field label';
        explanationKo = '일반 입력 필드 라벨';
      }
      appliedRules.push('Principle: Accuracy', 'FR-002: Unit specification');
      break;

    case 'action':
      if (hasKeyword(['adjust', '조절', 'control', '제어'])) {
        text = 'Adjust';
        textKo = '조절';
        explanation = 'Adjustment action';
        explanationKo = '조절 동작';
      } else if (hasKeyword(['monitor', '모니터', 'watch', '감시'])) {
        text = 'Monitor';
        textKo = '모니터';
        explanation = 'Monitoring action';
        explanationKo = '모니터링 동작';
      } else if (hasKeyword(['check', '확인', 'verify', '검증'])) {
        text = 'Check';
        textKo = '확인';
        explanation = 'Verification action';
        explanationKo = '확인 동작';
      } else {
        text = 'Execute';
        textKo = '실행';
        explanation = 'Generic action';
        explanationKo = '일반 동작';
      }
      appliedRules.push('Principle: Immediate Comprehensibility');
      break;
  }

  // Ensure we always have some text
  if (!text.trim()) {
    text = 'System';
    textKo = '시스템';
    explanation = 'Default text generated';
    explanationKo = '기본 텍스트 생성됨';
  }

  return {
    text: text.trim(),
    textKo: textKo.trim(),
    explanation: explanation || 'Generated following IPS guidelines',
    explanationKo: explanationKo || 'IPS 가이드라인에 따라 생성됨',
    appliedRules: appliedRules.length > 0 ? appliedRules : ['Principle: Immediate Comprehensibility'],
  };
}

/**
 * Validate text against IPS guidelines
 */
export function validateIPSText(text: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // 1. Accuracy validation
  const accuracyValidation = validateAccuracy(text);
  results.push(accuracyValidation);

  // 2. Clarity validation
  const clarityValidation = validateClarity(text);
  results.push(clarityValidation);

  // 3. Safety validation
  const safetyValidation = validateSafety(text);
  results.push(safetyValidation);

  // 4. Usability validation
  const usabilityValidation = validateUsability(text);
  results.push(usabilityValidation);

  return results;
}

/**
 * Validate accuracy - check for precise values and units
 */
function validateAccuracy(text: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  let score = 100;

  // Check for numeric values without units
  const numberPattern = /\b\d+\.?\d*\b/g;
  const numbers = text.match(numberPattern);

  if (numbers) {
    numbers.forEach(num => {
      const hasUnit = Object.values(UNITS).some(unit =>
        text.includes(`${num}${unit}`) || text.includes(`${num} ${unit}`)
      );

      if (!hasUnit && !text.includes('%') && !text.includes('개')) {
        issues.push({
          type: 'warning',
          message: `Number "${num}" found without unit specification`,
          messageKo: `숫자 "${num}"에 단위가 명시되지 않음`,
          suggestion: `Add appropriate unit (e.g., ${num}°C, ${num}Torr)`,
          suggestionKo: `적절한 단위 추가 필요 (예: ${num}°C, ${num}Torr)`,
        });
        score -= 15;
      }
    });
  }

  return {
    category: 'accuracy',
    passed: score >= 70,
    score: Math.max(0, score),
    issues,
  };
}

/**
 * Validate clarity - check for prohibited vague expressions
 */
function validateClarity(text: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  let score = 100;

  // Check for prohibited expressions
  PROHIBITED_EXPRESSIONS.forEach(expr => {
    if (text.includes(expr)) {
      issues.push({
        type: 'error',
        message: `Prohibited vague expression detected: "${expr}"`,
        messageKo: `금지된 모호한 표현 감지: "${expr}"`,
        suggestion: 'Use specific values, ranges, or concrete terms',
        suggestionKo: '구체적인 값, 범위, 또는 명확한 용어 사용',
      });
      score -= 20;
    }
  });

  // Check for vague modifiers
  const vagueModifiers = ['maybe', 'perhaps', 'possibly', '아마', '어쩌면', '대충'];
  vagueModifiers.forEach(modifier => {
    if (text.toLowerCase().includes(modifier)) {
      issues.push({
        type: 'warning',
        message: `Vague modifier detected: "${modifier}"`,
        messageKo: `모호한 수식어 감지: "${modifier}"`,
        suggestion: 'Remove vague modifiers and be definitive',
        suggestionKo: '모호한 수식어를 제거하고 명확하게 표현',
      });
      score -= 10;
    }
  });

  return {
    category: 'clarity',
    passed: score >= 70,
    score: Math.max(0, score),
    issues,
  };
}

/**
 * Validate safety - check for proper safety indicators
 */
function validateSafety(text: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  let score = 100;

  // Keywords that indicate safety-related content
  const safetyKeywords = [
    'danger', 'warning', 'caution', 'risk', 'hazard', 'emergency',
    '위험', '경고', '주의', '비상', '긴급',
    'error', 'fault', 'failure', '오류', '장애', '고장',
    'pressure', 'temperature', 'voltage', 'current',
    '압력', '온도', '전압', '전류', 'leak', '누출'
  ];

  const isSafetyRelated = safetyKeywords.some(keyword =>
    text.toLowerCase().includes(keyword)
  );

  if (isSafetyRelated) {
    // Check for safety icons
    const hasSafetyIcon = Object.values(SAFETY_ICONS).some(icon =>
      text.includes(icon)
    );

    if (!hasSafetyIcon) {
      issues.push({
        type: 'error',
        message: 'Safety-related text missing warning icon',
        messageKo: '안전 관련 텍스트에 경고 아이콘 누락',
        suggestion: 'Add appropriate safety icon (⚠️, 🔴, 🚨, 🚫)',
        suggestionKo: '적절한 안전 아이콘 추가 (⚠️, 🔴, 🚨, 🚫)',
      });
      score -= 30;
    }

    // Check for specific action instructions
    const hasActionInstruction = /즉시|immediately|stop|정지|contact|연락/i.test(text);
    if (!hasActionInstruction) {
      issues.push({
        type: 'warning',
        message: 'Safety alert should include specific action instruction',
        messageKo: '안전 경고에 구체적인 대응 방법 포함 필요',
        suggestion: 'Add clear action (e.g., "즉시 정지", "즉시 연락")',
        suggestionKo: '명확한 대응 방법 추가 (예: "즉시 정지", "즉시 연락")',
      });
      score -= 15;
    }
  }

  return {
    category: 'safety',
    passed: score >= 70,
    score: Math.max(0, score),
    issues,
  };
}

/**
 * Validate usability - check for consistency and readability
 */
function validateUsability(text: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  let score = 100;

  // Check text length for buttons/labels
  if (text.length > 100) {
    issues.push({
      type: 'info',
      message: 'Text may be too long for UI component',
      messageKo: 'UI 컴포넌트에 비해 텍스트가 길 수 있음',
      suggestion: 'Consider breaking into multiple lines or shortening',
      suggestionKo: '여러 줄로 나누거나 간결하게 수정 고려',
    });
    score -= 5;
  }

  // Check for mixed languages without proper separation
  const hasKorean = /[가-힣]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  if (hasKorean && hasEnglish) {
    // This is acceptable if they are properly formatted
    // Just info, not a penalty
    issues.push({
      type: 'info',
      message: 'Text contains both Korean and English',
      messageKo: '텍스트에 한글과 영문이 혼용됨',
      suggestion: 'Ensure proper spacing and formatting for bilingual text',
      suggestionKo: '이중 언어 텍스트의 적절한 간격과 형식 확인',
    });
  }

  // Check for consistent terminology
  // Example: "start" should always be "시작", not "개시" or "착수"
  const inconsistentTerms = [
    { term: 'start', variations: ['개시', '착수', '출발'] },
    { term: 'stop', variations: ['중단', '멈춤', '중지'] },
  ];

  inconsistentTerms.forEach(({ term, variations }) => {
    variations.forEach(variation => {
      if (text.includes(variation)) {
        issues.push({
          type: 'warning',
          message: `Inconsistent terminology: "${variation}"`,
          messageKo: `일관성 없는 용어: "${variation}"`,
          suggestion: `Use standard term for "${term}"`,
          suggestionKo: `"${term}"에 대한 표준 용어 사용`,
        });
        score -= 10;
      }
    });
  });

  return {
    category: 'usability',
    passed: score >= 70,
    score: Math.max(0, score),
    issues,
  };
}

/**
 * Get component templates for semiconductor equipment
 */
export interface ComponentTemplate {
  id: string;
  name: string;
  nameKo: string;
  componentType: ComponentType;
  description: string;
  descriptionKo: string;
  examples: Array<{
    text: string;
    textKo: string;
    context: string;
    contextKo: string;
  }>;
  guidelines: string[];
  guidelinesKo: string[];
}

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    id: 'action-button',
    name: 'Action Button',
    nameKo: '동작 버튼',
    componentType: 'button',
    description: 'Buttons that trigger equipment operations',
    descriptionKo: '설비 동작을 실행하는 버튼',
    examples: [
      {
        text: 'Start',
        textKo: '시작',
        context: 'Begin chamber process',
        contextKo: '챔버 프로세스 시작',
      },
      {
        text: 'Stop',
        textKo: '정지',
        context: 'Stop current operation',
        contextKo: '현재 동작 정지',
      },
      {
        text: 'Emergency Stop',
        textKo: '긴급 정지',
        context: 'Emergency shutdown',
        contextKo: '비상 정지',
      },
    ],
    guidelines: [
      'Use clear action verbs',
      'Keep text concise (1-2 words)',
      'Avoid ambiguous terms',
    ],
    guidelinesKo: [
      '명확한 동작 동사 사용',
      '텍스트를 간결하게 유지 (1-2 단어)',
      '모호한 용어 사용 금지',
    ],
  },
  {
    id: 'parameter-input',
    name: 'Parameter Input',
    nameKo: '파라미터 입력',
    componentType: 'input',
    description: 'Input fields for process parameters',
    descriptionKo: '공정 파라미터 입력 필드',
    examples: [
      {
        text: 'Temperature (°C)',
        textKo: '온도 (°C)',
        context: 'Chamber temperature setting',
        contextKo: '챔버 온도 설정',
      },
      {
        text: 'Pressure (Torr)',
        textKo: '압력 (Torr)',
        context: 'Vacuum pressure setting',
        contextKo: '진공 압력 설정',
      },
      {
        text: 'Gas Flow (sccm)',
        textKo: '가스 유량 (sccm)',
        context: 'Gas flow rate',
        contextKo: '가스 유량',
      },
    ],
    guidelines: [
      'Always include unit in label',
      'Use standard semiconductor industry units',
      'Show valid range or limits',
    ],
    guidelinesKo: [
      '라벨에 항상 단위 포함',
      '표준 반도체 산업 단위 사용',
      '유효 범위 또는 한계 표시',
    ],
  },
  {
    id: 'safety-alert',
    name: 'Safety Alert',
    nameKo: '안전 경고',
    componentType: 'alert',
    description: 'Critical safety warnings and alerts',
    descriptionKo: '중요 안전 경고 및 알림',
    examples: [
      {
        text: '🚨 IMMEDIATE ACTION: Chamber overpressure (15 Torr)',
        textKo: '🚨 즉시 대응: 챔버 과압 (15 Torr)',
        context: 'Critical pressure alert',
        contextKo: '긴급 압력 경고',
      },
      {
        text: '⚠️ WARNING: Temperature exceeds limit (450°C)',
        textKo: '⚠️ 경고: 온도 한계 초과 (450°C)',
        context: 'Temperature warning',
        contextKo: '온도 경고',
      },
      {
        text: '🚫 BLOCKED: Interlock active - Door open',
        textKo: '🚫 차단: 인터락 활성 - 도어 열림',
        context: 'Safety interlock',
        contextKo: '안전 인터락',
      },
    ],
    guidelines: [
      'Always start with appropriate safety icon',
      'Include specific value and unit',
      'Provide clear action or cause',
      'Use hierarchical urgency levels',
    ],
    guidelinesKo: [
      '항상 적절한 안전 아이콘으로 시작',
      '구체적인 값과 단위 포함',
      '명확한 대응 방법 또는 원인 제시',
      '계층적 긴급도 수준 사용',
    ],
  },
  {
    id: 'status-indicator',
    name: 'Status Indicator',
    nameKo: '상태 표시',
    componentType: 'status',
    description: 'Equipment and process status displays',
    descriptionKo: '설비 및 공정 상태 표시',
    examples: [
      {
        text: '🟢 Running',
        textKo: '🟢 실행 중',
        context: 'Process in progress',
        contextKo: '공정 진행 중',
      },
      {
        text: '🔴 Error',
        textKo: '🔴 오류',
        context: 'System error state',
        contextKo: '시스템 오류 상태',
      },
      {
        text: '✅ Complete',
        textKo: '✅ 완료',
        context: 'Process finished',
        contextKo: '공정 완료',
      },
    ],
    guidelines: [
      'Use standard status emoji consistently',
      'Keep status text brief',
      'Ensure immediate visual recognition',
    ],
    guidelinesKo: [
      '표준 상태 이모지를 일관되게 사용',
      '상태 텍스트를 간결하게 유지',
      '즉각적인 시각적 인식 보장',
    ],
  },
];
