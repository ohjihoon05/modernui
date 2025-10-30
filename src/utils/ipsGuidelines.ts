/**
 * Wonik IPS Semiconductor Equipment UX Writing Guidelines
 *
 * Core Principles:
 * 1. Accuracy (정확성)
 * 2. Safety (안전성)
 * 3. Immediate Comprehensibility (즉시 이해 가능성)
 * 4. Consistency (일관성)
 * 5. Hierarchical Information Structure (계층적 정보 구조)
 *
 * This file now uses OpenWebUI AI to generate guideline text instead of hardcoded responses.
 */

import { generateIPSTextWithAI } from './openwebuiClient';

// Component types for semiconductor equipment UI
export type ComponentType =
  | 'button'           // 버튼
  | 'alert'            // 알림
  | 'input'            // 입력 필드
  | 'status'           // 상태 표시
  | 'parameter'        // 파라미터
  | 'action'           // 동작
  | 'measurement';     // 측정값

// Usage types for different contexts
export type UsageType =
  | 'button'           // SW Button - 버튼 텍스트 (짧고 명확)
  | 'popup'            // Popup/Dialog - 팝업 메시지 (중간 길이)
  | 'alert'            // Alert/Troubleshooting - 알람/트러블슈팅 (조치 포함)
  | 'manual'           // Manual/Documentation - 매뉴얼/문서 (상세)
  | 'parameter';       // Parameter/Setting - 파라미터/설정 (기술적)

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
  messageZh: string;
  messageJa: string;
  suggestion?: string;
  suggestionKo?: string;
  suggestionZh?: string;
  suggestionJa?: string;
  line?: number;
}

// Text generation request
export interface TextGenerationRequest {
  componentType?: ComponentType;
  context: string;
  safetyLevel?: SafetyLevel;
  includeUnit?: keyof typeof UNITS;
  value?: number | string;
  usageType?: UsageType;  // Usage context for text generation
}

// Text generation result
export interface TextGenerationResult {
  text: string;
  textKo: string;
  textZh: string;
  textJa: string;
  explanation: string;
  explanationKo: string;
  explanationZh: string;
  explanationJa: string;
  appliedRules: string[];
}

/**
 * Infer component type from context string
 */
export function inferComponentType(context: string): ComponentType {
  const lowerContext = context.toLowerCase();

  // Alert/Warning keywords (highest priority for safety)
  if (
    lowerContext.includes('alert') ||
    lowerContext.includes('alarm') ||
    lowerContext.includes('알림') ||
    lowerContext.includes('경고') ||
    lowerContext.includes('warning') ||
    lowerContext.includes('위험') ||
    lowerContext.includes('danger') ||
    lowerContext.includes('error') ||
    lowerContext.includes('오류') ||
    lowerContext.includes('fault') ||
    lowerContext.includes('장애') ||
    lowerContext.includes('초과') ||
    lowerContext.includes('exceed') ||
    lowerContext.includes('과다') ||
    lowerContext.includes('high') ||
    lowerContext.includes('low') ||
    lowerContext.includes('leak') ||
    lowerContext.includes('누출')
  ) {
    return 'alert';
  }

  // Status keywords
  if (
    lowerContext.includes('status') ||
    lowerContext.includes('상태') ||
    lowerContext.includes('display') ||
    lowerContext.includes('표시') ||
    lowerContext.includes('indicator') ||
    lowerContext.includes('running') ||
    lowerContext.includes('실행') ||
    lowerContext.includes('stopped') ||
    lowerContext.includes('정지') ||
    lowerContext.includes('complete') ||
    lowerContext.includes('완료') ||
    lowerContext.includes('ready') ||
    lowerContext.includes('준비')
  ) {
    return 'status';
  }

  // Input field keywords
  if (
    lowerContext.includes('input') ||
    lowerContext.includes('입력') ||
    lowerContext.includes('field') ||
    lowerContext.includes('필드') ||
    lowerContext.includes('enter') ||
    lowerContext.includes('입력하') ||
    lowerContext.includes('설정')
  ) {
    return 'input';
  }

  // Parameter/Measurement keywords with units
  if (
    lowerContext.includes('temperature') ||
    lowerContext.includes('온도') ||
    lowerContext.includes('pressure') ||
    lowerContext.includes('압력') ||
    lowerContext.includes('flow') ||
    lowerContext.includes('유량') ||
    lowerContext.includes('power') ||
    lowerContext.includes('전력') ||
    lowerContext.includes('voltage') ||
    lowerContext.includes('전압') ||
    lowerContext.includes('current') ||
    lowerContext.includes('전류')
  ) {
    // If it mentions display, reading, or monitor, it's a measurement
    if (
      lowerContext.includes('display') ||
      lowerContext.includes('reading') ||
      lowerContext.includes('monitor') ||
      lowerContext.includes('표시') ||
      lowerContext.includes('측정') ||
      lowerContext.includes('값')
    ) {
      return 'measurement';
    }
    // Otherwise, it's a parameter (setting)
    return 'parameter';
  }

  // Button keywords
  if (
    lowerContext.includes('button') ||
    lowerContext.includes('버튼') ||
    lowerContext.includes('start') ||
    lowerContext.includes('시작') ||
    lowerContext.includes('stop') ||
    lowerContext.includes('정지') ||
    lowerContext.includes('cancel') ||
    lowerContext.includes('취소') ||
    lowerContext.includes('confirm') ||
    lowerContext.includes('확인') ||
    lowerContext.includes('reset') ||
    lowerContext.includes('초기화') ||
    lowerContext.includes('emergency') ||
    lowerContext.includes('긴급') ||
    lowerContext.includes('비상')
  ) {
    return 'button';
  }

  // Action keywords
  if (
    lowerContext.includes('action') ||
    lowerContext.includes('동작') ||
    lowerContext.includes('execute') ||
    lowerContext.includes('실행') ||
    lowerContext.includes('control') ||
    lowerContext.includes('제어') ||
    lowerContext.includes('adjust') ||
    lowerContext.includes('조절')
  ) {
    return 'action';
  }

  // Default to button for general cases
  return 'button';
}

/**
 * Infer safety level from context string
 */
export function inferSafetyLevel(context: string): SafetyLevel | undefined {
  const lowerContext = context.toLowerCase();

  // Critical emergency
  if (
    lowerContext.includes('critical') ||
    lowerContext.includes('emergency') ||
    lowerContext.includes('긴급') ||
    lowerContext.includes('비상') ||
    lowerContext.includes('즉시')
  ) {
    return 'critical';
  }

  // Danger
  if (
    lowerContext.includes('danger') ||
    lowerContext.includes('위험') ||
    lowerContext.includes('high') && (lowerContext.includes('pressure') || lowerContext.includes('temperature')) ||
    lowerContext.includes('과다') ||
    lowerContext.includes('초과')
  ) {
    return 'danger';
  }

  // Warning
  if (
    lowerContext.includes('warning') ||
    lowerContext.includes('caution') ||
    lowerContext.includes('경고') ||
    lowerContext.includes('주의')
  ) {
    return 'warning';
  }

  // Blocked
  if (
    lowerContext.includes('blocked') ||
    lowerContext.includes('block') ||
    lowerContext.includes('차단') ||
    lowerContext.includes('interlock') ||
    lowerContext.includes('인터락')
  ) {
    return 'blocked';
  }

  return undefined;
}

/**
 * Infer unit type from context string
 */
export function inferUnitType(context: string): keyof typeof UNITS | undefined {
  const lowerContext = context.toLowerCase();

  if (lowerContext.includes('temperature') || lowerContext.includes('온도') || lowerContext.includes('temp')) {
    return 'temperature';
  }
  if (lowerContext.includes('pressure') || lowerContext.includes('압력')) {
    return 'pressure';
  }
  if (lowerContext.includes('flow') || lowerContext.includes('유량')) {
    return 'flow';
  }
  if (lowerContext.includes('power') || lowerContext.includes('전력') || lowerContext.includes('파워')) {
    return 'power';
  }
  if (lowerContext.includes('voltage') || lowerContext.includes('전압')) {
    return 'voltage';
  }
  if (lowerContext.includes('current') || lowerContext.includes('전류')) {
    return 'current';
  }
  if (lowerContext.includes('time') || lowerContext.includes('시간')) {
    return 'time';
  }
  if (lowerContext.includes('rpm') || lowerContext.includes('회전')) {
    return 'rpm';
  }

  return undefined;
}

/**
 * Generate UX text following IPS guidelines using OpenWebUI AI
 *
 * All hardcoded text generation logic has been removed and replaced with AI generation.
 */
export async function generateIPSText(request: TextGenerationRequest): Promise<TextGenerationResult> {
  // Auto-infer missing parameters from context
  const componentType = request.componentType || inferComponentType(request.context);
  const safetyLevel = request.safetyLevel || inferSafetyLevel(request.context);
  const includeUnit = request.includeUnit || inferUnitType(request.context);
  const { context, value, usageType } = request;

  console.log('[generateIPSText] Starting AI generation with:', {
    componentType,
    context,
    safetyLevel,
    includeUnit,
    value,
    usageType
  });

  try {
    // Call OpenWebUI API to generate text
    const result = await generateIPSTextWithAI({
      componentType,
      context,
      safetyLevel,
      includeUnit,
      value,
      usageType,
    });

    console.log('[generateIPSText] AI generation successful:', result);
    return result;
  } catch (error) {
    console.error('[generateIPSText] AI generation failed:', error);

    // Return error result
    return {
      text: 'ERROR: AI generation failed',
      textKo: 'ERROR: AI 생성 실패',
      textZh: 'ERROR: AI生成失败',
      textJa: 'ERROR: AI生成失敗',
      explanation: `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key configuration in .env file.`,
      explanationKo: `AI 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}. .env 파일에서 API 키 설정을 확인하세요.`,
      explanationZh: `AI生成失败: ${error instanceof Error ? error.message : '未知错误'}。请在.env文件中检查您的API密钥配置。`,
      explanationJa: `AI生成失敗: ${error instanceof Error ? error.message : '不明なエラー'}。.envファイルでAPIキーの設定を確認してください。`,
      appliedRules: ['Error: AI Generation Failed'],
    };
  }
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
          messageZh: `数字"${num}"未指定单位`,
          messageJa: `数値"${num}"に単位が指定されていません`,
          suggestion: `Add appropriate unit (e.g., ${num}°C, ${num}Torr)`,
          suggestionKo: `적절한 단위 추가 필요 (예: ${num}°C, ${num}Torr)`,
          suggestionZh: `请添加适当的单位（例如：${num}°C，${num}Torr）`,
          suggestionJa: `適切な単位を追加してください（例：${num}°C、${num}Torr）`,
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
        messageZh: `检测到禁用的模糊表达："${expr}"`,
        messageJa: `禁止されている曖昧な表現を検出："${expr}"`,
        suggestion: 'Use specific values, ranges, or concrete terms',
        suggestionKo: '구체적인 값, 범위, 또는 명확한 용어 사용',
        suggestionZh: '使用具体的值、范围或明确的术语',
        suggestionJa: '具体的な値、範囲、または明確な用語を使用してください',
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
        messageZh: `检测到模糊修饰词："${modifier}"`,
        messageJa: `曖昧な修飾語を検出："${modifier}"`,
        suggestion: 'Remove vague modifiers and be definitive',
        suggestionKo: '모호한 수식어를 제거하고 명확하게 표현',
        suggestionZh: '删除模糊修饰词并明确表达',
        suggestionJa: '曖昧な修飾語を削除して明確に表現してください',
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
    '압력', '온도', '전압', '전류', 'leak', '누출', 'exceed', '초과'
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
        messageZh: '安全相关文本缺少警告图标',
        messageJa: '安全関連テキストに警告アイコンがありません',
        suggestion: 'Add appropriate safety icon (⚠️, 🔴, 🚨, 🚫)',
        suggestionKo: '적절한 안전 아이콘 추가 (⚠️, 🔴, 🚨, 🚫)',
        suggestionZh: '添加适当的安全图标（⚠️、🔴、🚨、🚫）',
        suggestionJa: '適切な安全アイコンを追加してください（⚠️、🔴、🚨、🚫）',
      });
      score -= 30;
    }

    // Check for specific action verbs (operator-oriented)
    const actionVerbs = [
      'stop', 'vent', 'check', 'close', 'contact', 'verify', 'adjust',
      '정지', '배기', '확인', '닫기', '연락', '검증', '조절', '즉시'
    ];
    const hasActionVerb = actionVerbs.some(verb =>
      text.toLowerCase().includes(verb)
    );

    if (!hasActionVerb) {
      issues.push({
        type: 'error',
        message: 'Safety alert missing action verb - operator needs clear instruction',
        messageKo: '안전 경고에 행동 동사 누락 - 운영자에게 명확한 지시 필요',
        messageZh: '安全警报缺少动作动词 - 操作员需要明确的指示',
        messageJa: '安全警告に行動動詞が欠落 - オペレーターに明確な指示が必要',
        suggestion: 'Add action verb: Stop, Vent, Check, Close, Contact',
        suggestionKo: '행동 동사 추가: 정지, 배기, 확인, 닫기, 연락',
        suggestionZh: '添加动作动词：停止、排气、检查、关闭、联系',
        suggestionJa: '行動動詞を追加：停止、ベント、確認、閉じる、連絡',
      });
      score -= 25;
    }

    // Check for specific values in alerts about limits
    if (text.toLowerCase().includes('exceed') || text.includes('초과') || text.includes('limit')) {
      const hasNumericValue = /\d+/.test(text);
      if (!hasNumericValue) {
        issues.push({
          type: 'warning',
          message: 'Limit exceeded alert should include specific numeric value',
          messageKo: '한계 초과 경고에 구체적인 숫자 값 포함 필요',
          messageZh: '超出限制警报应包含具体数值',
          messageJa: '制限超過警告には具体的な数値を含める必要があります',
          suggestion: 'Add current value and limit (e.g., "Temperature at 480°C (Limit: 450°C)")',
          suggestionKo: '현재 값과 한계 추가 (예: "온도 480°C (한계: 450°C)")',
          suggestionZh: '添加当前值和限制（例如："温度 480°C（限制：450°C）"）',
          suggestionJa: '現在の値と制限を追加（例：「温度 480°C（制限：450°C）」）',
        });
        score -= 15;
      }
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
      messageZh: 'UI组件的文本可能过长',
      messageJa: 'UIコンポーネントに対してテキストが長すぎる可能性があります',
      suggestion: 'Consider breaking into multiple lines or shortening',
      suggestionKo: '여러 줄로 나누거나 간결하게 수정 고려',
      suggestionZh: '考虑分成多行或缩短',
      suggestionJa: '複数行に分割するか短縮を検討してください',
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
      messageZh: '文本同时包含韩文和英文',
      messageJa: 'テキストに韓国語と英語が混在しています',
      suggestion: 'Ensure proper spacing and formatting for bilingual text',
      suggestionKo: '이중 언어 텍스트의 적절한 간격과 형식 확인',
      suggestionZh: '确保双语文本的正确间距和格式',
      suggestionJa: 'バイリンガルテキストの適切な間隔とフォーマットを確認してください',
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
          messageZh: `术语不一致："${variation}"`,
          messageJa: `用語の不一致："${variation}"`,
          suggestion: `Use standard term for "${term}"`,
          suggestionKo: `"${term}"에 대한 표준 용어 사용`,
          suggestionZh: `使用"${term}"的标准术语`,
          suggestionJa: `"${term}"の標準用語を使用してください`,
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
  nameZh: string;
  nameJa: string;
  componentType: ComponentType;
  description: string;
  descriptionKo: string;
  descriptionZh: string;
  descriptionJa: string;
  examples: Array<{
    text: string;
    textKo: string;
    textZh: string;
    textJa: string;
    context: string;
    contextKo: string;
    contextZh: string;
    contextJa: string;
  }>;
  guidelines: string[];
  guidelinesKo: string[];
  guidelinesZh: string[];
  guidelinesJa: string[];
}

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    id: 'action-button',
    name: 'Action Button',
    nameKo: '동작 버튼',
    nameZh: '操作按钮',
    nameJa: '操作ボタン',
    componentType: 'button',
    description: 'Buttons that trigger equipment operations',
    descriptionKo: '설비 동작을 실행하는 버튼',
    descriptionZh: '触发设备操作的按钮',
    descriptionJa: '装置の操作をトリガーするボタン',
    examples: [
      {
        text: 'Start',
        textKo: '시작',
        textZh: '开始',
        textJa: '開始',
        context: 'Begin chamber process',
        contextKo: '챔버 프로세스 시작',
        contextZh: '开始腔室工艺',
        contextJa: 'チャンバープロセス開始',
      },
      {
        text: 'Stop',
        textKo: '정지',
        textZh: '停止',
        textJa: '停止',
        context: 'Stop current operation',
        contextKo: '현재 동작 정지',
        contextZh: '停止当前操作',
        contextJa: '現在の操作を停止',
      },
      {
        text: 'Emergency Stop',
        textKo: '긴급 정지',
        textZh: '紧急停止',
        textJa: '緊急停止',
        context: 'Emergency shutdown',
        contextKo: '비상 정지',
        contextZh: '紧急关机',
        contextJa: '緊急シャットダウン',
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
    guidelinesZh: [
      '使用明确的动作动词',
      '保持文本简洁（1-2个词）',
      '避免模糊术语',
    ],
    guidelinesJa: [
      '明確な動作動詞を使用',
      'テキストを簡潔に保つ（1-2語）',
      '曖昧な用語を避ける',
    ],
  },
  {
    id: 'parameter-input',
    name: 'Parameter Input',
    nameKo: '파라미터 입력',
    nameZh: '参数输入',
    nameJa: 'パラメータ入力',
    componentType: 'input',
    description: 'Input fields for process parameters',
    descriptionKo: '공정 파라미터 입력 필드',
    descriptionZh: '工艺参数输入字段',
    descriptionJa: 'プロセスパラメータの入力フィールド',
    examples: [
      {
        text: 'Set Target Temperature (°C)',
        textKo: '목표 온도 설정 (°C)',
        textZh: '设置目标温度 (°C)',
        textJa: '目標温度を設定 (°C)',
        context: 'Chamber temperature setting',
        contextKo: '챔버 온도 설정',
        contextZh: '腔室温度设置',
        contextJa: 'チャンバー温度設定',
      },
      {
        text: 'Set Target Pressure (Torr)',
        textKo: '목표 압력 설정 (Torr)',
        textZh: '设置目标压力 (Torr)',
        textJa: '目標圧力を設定 (Torr)',
        context: 'Vacuum pressure setting',
        contextKo: '진공 압력 설정',
        contextZh: '真空压力设置',
        contextJa: '真空圧力設定',
      },
      {
        text: 'Set Gas Flow Rate (sccm)',
        textKo: '가스 유량 설정 (sccm)',
        textZh: '设置气体流量 (sccm)',
        textJa: 'ガス流量を設定 (sccm)',
        context: 'Gas flow rate',
        contextKo: '가스 유량',
        contextZh: '气体流速',
        contextJa: 'ガス流量',
      },
    ],
    guidelines: [
      'Start with action verb (Set, Enter, Adjust)',
      'Always include unit in label',
      'Use standard semiconductor industry units',
      'Show valid range or limits in placeholder',
    ],
    guidelinesKo: [
      '동작 동사로 시작 (설정, 입력, 조절)',
      '라벨에 항상 단위 포함',
      '표준 반도체 산업 단위 사용',
      '플레이스홀더에 유효 범위 또는 한계 표시',
    ],
    guidelinesZh: [
      '以动作动词开始（设置、输入、调整）',
      '标签中始终包含单位',
      '使用半导体行业标准单位',
      '在占位符中显示有效范围或限制',
    ],
    guidelinesJa: [
      '動作動詞で開始（設定、入力、調整）',
      'ラベルに常に単位を含める',
      '半導体業界標準の単位を使用',
      'プレースホルダーに有効な範囲または制限を表示',
    ],
  },
  {
    id: 'safety-alert',
    name: 'Safety Alert',
    nameKo: '안전 경고',
    nameZh: '安全警报',
    nameJa: '安全警告',
    componentType: 'alert',
    description: 'Critical safety warnings and alerts',
    descriptionKo: '중요 안전 경고 및 알림',
    descriptionZh: '关键安全警告和警报',
    descriptionJa: '重要な安全警告とアラート',
    examples: [
      {
        text: '🚨 IMMEDIATE ACTION REQUIRED: Vent chamber - Pressure at 15 Torr (Limit exceeded)',
        textKo: '🚨 즉시 조치 필요: 챔버 배기 - 압력 15 Torr (한계 초과)',
        textZh: '🚨 需要立即行动: 排气腔室 - 压力 15 Torr (超出限制)',
        textJa: '🚨 即時対応が必要: チャンバーをベント - 圧力 15 Torr (制限超過)',
        context: 'Critical pressure alert',
        contextKo: '긴급 압력 경고',
        contextZh: '紧急压力警报',
        contextJa: '緊急圧力警告',
      },
      {
        text: '⚠️ WARNING: Stop process - Temperature at 450°C (Limit exceeded)',
        textKo: '⚠️ 경고: 공정 정지 - 온도 450°C (한계 초과)',
        textZh: '⚠️ 警告: 停止工艺 - 温度 450°C (超出限制)',
        textJa: '⚠️ 警告: プロセス停止 - 温度 450°C (制限超過)',
        context: 'Temperature warning',
        contextKo: '온도 경고',
        contextZh: '温度警告',
        contextJa: '温度警告',
      },
      {
        text: '🚫 BLOCKED: Close chamber door - Interlock active, process halted',
        textKo: '🚫 차단됨: 챔버 도어 닫기 - 인터락 작동 중, 공정 중단됨',
        textZh: '🚫 已阻止: 关闭腔室门 - 联锁激活，工艺已停止',
        textJa: '🚫 ブロック済: チャンバードアを閉める - インターロック作動中、プロセス停止',
        context: 'Safety interlock',
        contextKo: '안전 인터락',
        contextZh: '安全联锁',
        contextJa: '安全インターロック',
      },
    ],
    guidelines: [
      'Always start with appropriate safety icon',
      'Include specific action verb (Stop, Vent, Check, Close)',
      'Show current value and exceeded limit',
      'State immediate consequence if applicable',
    ],
    guidelinesKo: [
      '항상 적절한 안전 아이콘으로 시작',
      '구체적인 행동 동사 포함 (정지, 배기, 확인, 닫기)',
      '현재 값과 초과된 한계 표시',
      '해당되는 경우 즉각적인 결과 명시',
    ],
    guidelinesZh: [
      '始终以适当的安全图标开始',
      '包含具体的动作动词（停止、排气、检查、关闭）',
      '显示当前值和超出的限制',
      '说明适用的即时后果',
    ],
    guidelinesJa: [
      '常に適切な安全アイコンで開始',
      '具体的な行動動詞を含める（停止、ベント、確認、閉じる）',
      '現在の値と超過した制限を表示',
      '該当する場合は即座の結果を明記',
    ],
  },
  {
    id: 'status-indicator',
    name: 'Status Indicator',
    nameKo: '상태 표시',
    nameZh: '状态指示器',
    nameJa: '状態インジケータ',
    componentType: 'status',
    description: 'Equipment and process status displays',
    descriptionKo: '설비 및 공정 상태 표시',
    descriptionZh: '设备和工艺状态显示',
    descriptionJa: '装置およびプロセス状態表示',
    examples: [
      {
        text: '🟢 Running',
        textKo: '🟢 실행 중',
        textZh: '🟢 运行中',
        textJa: '🟢 実行中',
        context: 'Process in progress',
        contextKo: '공정 진행 중',
        contextZh: '工艺进行中',
        contextJa: 'プロセス進行中',
      },
      {
        text: '🔴 Error',
        textKo: '🔴 오류',
        textZh: '🔴 错误',
        textJa: '🔴 エラー',
        context: 'System error state',
        contextKo: '시스템 오류 상태',
        contextZh: '系统错误状态',
        contextJa: 'システムエラー状態',
      },
      {
        text: '✅ Complete',
        textKo: '✅ 완료',
        textZh: '✅ 完成',
        textJa: '✅ 完了',
        context: 'Process finished',
        contextKo: '공정 완료',
        contextZh: '工艺完成',
        contextJa: 'プロセス完了',
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
    guidelinesZh: [
      '一致使用标准状态表情符号',
      '保持状态文本简短',
      '确保立即视觉识别',
    ],
    guidelinesJa: [
      '標準状態絵文字を一貫して使用',
      '状態テキストを簡潔に保つ',
      '即座の視覚的認識を確保',
    ],
  },
];
