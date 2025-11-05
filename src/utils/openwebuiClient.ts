/**
 * OpenWebUI API Client
 *
 * This client handles communication with OpenWebUI API for generating
 * IPS guideline text using AI instead of hardcoded responses.
 */

interface OpenWebUIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenWebUIRequest {
  model?: string;
  messages: OpenWebUIMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenWebUIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Get API configuration from environment variables
 */
function getAPIConfig() {
  const apiKey = import.meta.env.VITE_OPENWEBUI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENWEBUI_API_URL || 'https://api.openwebui.com/v1/chat/completions';

  if (!apiKey) {
    throw new Error(
      'OpenWebUI API key not found. Please set VITE_OPENWEBUI_API_KEY in your .env file'
    );
  }

  return { apiKey, apiUrl };
}

/**
 * Call OpenWebUI API to generate text
 */
export async function generateTextWithAI(
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  } = {}
): Promise<string> {
  const { apiKey, apiUrl } = getAPIConfig();

  const request: OpenWebUIRequest = {
    model: options.model || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    temperature: options.temperature ?? 0.3, // Lower temperature for more consistent, guideline-focused responses
    max_tokens: options.maxTokens ?? 500,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenWebUI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: OpenWebUIResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenWebUI API');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('[OpenWebUI] API call failed:', error);
    throw error;
  }
}

/**
 * Generate IPS guideline text using AI
 *
 * This function creates a specialized prompt for generating semiconductor equipment
 * UX text following Wonik IPS guidelines.
 */
export async function generateIPSTextWithAI(params: {
  componentType: string;
  context: string;
  safetyLevel?: string;
  includeUnit?: string;
  value?: number | string;
  usageType?: string;
}): Promise<{
  text: string;
  textKo: string;
  textZh: string;
  textJa: string;
  explanation: string;
  explanationKo: string;
  explanationZh: string;
  explanationJa: string;
  appliedRules: string[];
}> {
  const systemPrompt = `You are an expert in semiconductor equipment UX writing following Wonik IPS guidelines.

Core Principles:
1. Accuracy (정확성) - Use precise values with proper units
2. Safety (안전성) - Prioritize safety with clear warnings
3. Immediate Comprehensibility (즉시 이해 가능성) - Use clear, unambiguous language
4. Consistency (일관성) - Follow standard terminology
5. Hierarchical Information Structure (계층적 정보 구조) - Structure information logically

Prohibited expressions: 적절한, 적당한, 조금, 약간, 잠시, 나중에, 가능하면, 대략, 정도, 쯤

Units to use:
- Temperature: °C
- Pressure: Torr
- Flow: sccm
- Power: W
- Voltage: V
- Current: A
- Time: s
- RPM: RPM

Safety icons:
- Critical: 🚨
- Danger: 🔴
- Warning: ⚠️
- Blocked: 🚫

For alerts:
- Include specific action verbs (Stop, Vent, Check, Close)
- Show current value and exceeded limit
- State immediate consequence

Generate text in 4 languages: English, Korean, Chinese, Japanese.`;

  const userPrompt = `Generate UX text for:
Component Type: ${params.componentType}
Context: ${params.context}
${params.safetyLevel ? `Safety Level: ${params.safetyLevel}` : ''}
${params.includeUnit ? `Unit: ${params.includeUnit}` : ''}
${params.value !== undefined ? `Value: ${params.value}` : ''}
${params.usageType ? `Usage Type: ${params.usageType}` : ''}

Please provide:
1. Text in English
2. Text in Korean (textKo)
3. Text in Chinese (textZh)
4. Text in Japanese (textJa)
5. Explanation in English
6. Explanation in Korean (explanationKo)
7. Explanation in Chinese (explanationZh)
8. Explanation in Japanese (explanationJa)
9. Applied rules list

Format your response as JSON:
{
  "text": "...",
  "textKo": "...",
  "textZh": "...",
  "textJa": "...",
  "explanation": "...",
  "explanationKo": "...",
  "explanationZh": "...",
  "explanationJa": "...",
  "appliedRules": ["rule1", "rule2", ...]
}`;

  try {
    const aiResponse = await generateTextWithAI(systemPrompt, userPrompt, {
      temperature: 0.3,
      maxTokens: 1000,
    });

    // Parse JSON response
    const parsed = JSON.parse(aiResponse);

    return {
      text: parsed.text || 'System',
      textKo: parsed.textKo || '시스템',
      textZh: parsed.textZh || '系统',
      textJa: parsed.textJa || 'システム',
      explanation: parsed.explanation || 'Generated with AI following IPS guidelines',
      explanationKo: parsed.explanationKo || 'AI로 IPS 가이드라인에 따라 생성됨',
      explanationZh: parsed.explanationZh || '使用AI按照IPS指南生成',
      explanationJa: parsed.explanationJa || 'AIでIPSガイドラインに従って生成',
      appliedRules: parsed.appliedRules || ['Principle: AI Generation'],
    };
  } catch (error) {
    console.error('[generateIPSTextWithAI] Failed to generate text with AI:', error);

    // Fallback to simple text if AI fails
    return {
      text: 'System',
      textKo: '시스템',
      textZh: '系统',
      textJa: 'システム',
      explanation: 'AI generation failed, using fallback',
      explanationKo: 'AI 생성 실패, 기본값 사용',
      explanationZh: 'AI生成失败，使用后备值',
      explanationJa: 'AI生成失敗、フォールバック使用',
      appliedRules: ['Fallback: AI Error'],
    };
  }
}
