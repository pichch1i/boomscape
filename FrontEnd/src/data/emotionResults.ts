import type { Language } from '../i18n'

export type Emotion =
  | 'Hope'
  | 'Anxiety'
  | 'Serenity'
  | 'Sadness'
  | 'Frustration'

type EmotionResult = {
  flower: string
  reason: string
  resultTitle: string
  message: string
}

export const emotionResults: Record<Emotion, EmotionResult> = {
  Hope: {
    flower: 'ดอกทานตะวัน',
    reason: 'พลังบวก มองไปข้างหน้า และหันหาแสงสว่างเสมอ',
    resultTitle: 'ดอกไม้แห่งแสงวันใหม่',
    message: 'แสงของวันใหม่ยังรอให้คุณหันไปพบเสมอ',
  },
  Anxiety: {
    flower: 'กุหลาบสีพีช',
    reason: 'ความสงบ การปลอบประโลม และการคลายความกังวล',
    resultTitle: 'ดอกไม้แห่งการปลอบประโลม',
    message: 'ไม่จำเป็นต้องรู้ทุกคำตอบในตอนนี้',
  },
  Serenity: {
    flower: 'ดอกเดซี',
    reason: 'ความสงบ การฟื้นฟู และความหวังในช่วงที่หัวใจต้องเยียวยา',
    resultTitle: 'ดอกไม้แห่งลมหายใจ',
    message: 'ค่อย ๆ หายใจ และเติบโตในจังหวะของตัวเองได้เสมอ',
  },
  Sadness: {
    flower: 'คาร์เนชั่นลายริ้ว',
    reason: 'สื่อถึงความเสียใจ การปฏิเสธ การขอโทษ และความเศร้า',
    resultTitle: 'ดอกไม้แห่งความรู้สึกลึกซึ้ง',
    message: 'ความรู้สึกของคุณมีที่ทาง และไม่จำเป็นต้องรีบจางหาย',
  },
  Frustration: {
    flower: 'โกลบ ธีสเซิล',
    reason: 'ความเข้มแข็ง ความแน่วแน่ และการเผชิญความท้าทาย',
    resultTitle: 'ดอกไม้แห่งแรงผลักดัน',
    message: 'แรงที่อยู่ข้างในคุณ ค่อย ๆ เปลี่ยนเป็นการเติบโตได้',
  },
}

const englishEmotionResults: Record<Emotion, EmotionResult> = {
  Hope: {
    flower: 'Sunflower',
    reason: 'Positive energy, looking ahead, and always turning toward the light.',
    resultTitle: 'The flower of a new dawn',
    message: 'The light of a new day is always waiting for you to turn toward it.',
  },
  Anxiety: {
    flower: 'Peach Rose',
    reason: 'Calm, comfort, and the gentle easing of worry.',
    resultTitle: 'The flower of comfort',
    message: 'You do not need to know every answer right now.',
  },
  Serenity: {
    flower: 'Daisy',
    reason: 'Peace, renewal, and hope when the heart needs time to heal.',
    resultTitle: 'The flower of breath',
    message: 'Breathe slowly and grow at your own pace.',
  },
  Sadness: {
    flower: 'Striped carnation',
    reason: 'A symbol of regret, rejection, apology, and sorrow.',
    resultTitle: 'The flower of deep feeling',
    message: 'Your feelings have a place, and they do not need to fade in a hurry.',
  },
  Frustration: {
    flower: 'Globe Thistle',
    reason: 'Strength, determination, and the courage to face challenges.',
    resultTitle: 'The flower of inner drive',
    message: 'The energy within you can gradually turn into growth.',
  },
}

export function getEmotionResult(emotion: Emotion, language: Language) {
  return language === 'th'
    ? emotionResults[emotion]
    : englishEmotionResults[emotion]
}

const emotions: Emotion[] = [
  'Hope',
  'Anxiety',
  'Serenity',
  'Sadness',
  'Frustration',
]

export function detectDominantEmotion(answers: Emotion[]): Emotion {
  if (answers.length === 0) {
    return 'Anxiety'
  }

  const scores = emotions.reduce<Record<Emotion, number>>(
    (currentScores, emotion) => {
      currentScores[emotion] = 0
      return currentScores
    },
    {} as Record<Emotion, number>,
  )

  answers.forEach((emotion) => {
    scores[emotion] += 1
  })

  const highestScore = Math.max(...Object.values(scores))
  const highestEmotions = emotions.filter(
    (emotion) => scores[emotion] === highestScore,
  )

  if (highestEmotions.length === 1) {
    return highestEmotions[0]
  }

  const q7Answer = answers[6]

  if (q7Answer && highestEmotions.includes(q7Answer)) {
    return q7Answer
  }

  return highestEmotions[0] ?? 'Anxiety'
}
