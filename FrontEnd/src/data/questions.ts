import type { Emotion } from './emotionResults'
import type { Language } from '../i18n'

export type QuestionOption = {
  id: 'A' | 'B' | 'C' | 'D' | 'E'
  emotion: Emotion
  text: Record<Language, string>
}

export type QuestionContent = {
  eyebrow: Record<Language, string>
  situation: Record<Language, string[]>
  title: Record<Language, string>
  quote?: Record<Language, string>
  options: QuestionOption[]
}

export const questions: Record<number, QuestionContent> = {
  1: {
    eyebrow: { th: '“ก่อนที่ดอกไม้จะบาน”', en: '“Before the flower blooms”' },
    situation: {
      th: ['คุณกำลังเดินอยู่ในสวน', 'แล้วเห็นเมล็ดเล็ก ๆ เมล็ดหนึ่งอยู่บนพื้น', 'คุณไม่รู้ว่ามันจะกลายเป็นดอกอะไร'],
      en: ['You are walking through a garden', 'when you notice a tiny seed on the ground.', 'You have no idea what kind of flower it might become.'],
    },
    title: { th: 'คุณจะทำอะไร?', en: 'What would you do?' },
    options: [
      { id: 'A', emotion: 'Anxiety', text: { th: 'ถ้ามันโตขึ้นมา จะกลายเป็นอะไรนะ?', en: 'What will it become if it grows?' } },
      { id: 'B', emotion: 'Serenity', text: { th: 'เอาไว้ก่อนก็ได้ เดี๋ยวมันคงโตเอง', en: 'I can leave it for now. It will probably grow on its own.' } },
      { id: 'C', emotion: 'Hope', text: { th: 'อยากรู้จังว่ามันจะโตเป็นอะไร', en: 'I would love to see what it grows into.' } },
      { id: 'D', emotion: 'Sadness', text: { th: 'ถ้ามันโตแล้วไม่สวยอย่างที่คิด คงเสียดายน่าดู', en: 'I would be disappointed if it grows but is not as beautiful as I imagined.' } },
      { id: 'E', emotion: 'Frustration', text: { th: 'ทำไมมันถึงมาอยู่ตรงนี้นะ?', en: 'Why is it here in the first place?' } },
    ],
  },
  2: {
    eyebrow: { th: '“ฝนกำลังมา”', en: '“The rain is coming”' },
    situation: {
      th: ['คุณกำลังจะไปดูสวนดอกไม้ที่รอมานาน', 'แต่จู่ ๆ ฝนเริ่มตกหนักขึ้น', 'คุณยังไม่รู้ว่าฝนจะหยุดเมื่อไหร่'],
      en: ['You are finally going to visit a garden you have waited a long time to see.', 'Suddenly, the rain starts pouring.', 'You do not know when it will stop.'],
    },
    title: { th: 'คุณจะทำอย่างไร?', en: 'What would you do?' },
    options: [
      { id: 'A', emotion: 'Serenity', text: { th: 'หาที่หลบก่อน แล้วค่อยคิดว่าจะไปต่อยังไง', en: 'Find shelter first, then decide what to do next.' } },
      { id: 'B', emotion: 'Sadness', text: { th: 'เสียดายจัง อุตส่าห์เดินมาตั้งไกล', en: 'What a shame. I came all this way.' } },
      { id: 'C', emotion: 'Anxiety', text: { th: 'แล้วถ้าฝนไม่หยุดเลยล่ะ?', en: 'What if the rain never stops?' } },
      { id: 'D', emotion: 'Frustration', text: { th: 'เตรียมตัวมาตั้งเยอะ ทำไมต้องมาตกวันนี้ด้วยนะ', en: 'I prepared so much. Why did it have to rain today?' } },
      { id: 'E', emotion: 'Hope', text: { th: 'บางทีฝนอาจหยุด แล้วสวนหลังฝนอาจสวยกว่าเดิมก็ได้', en: 'The rain may stop, and the garden might look even more beautiful afterwards.' } },
    ],
  },
  3: {
    eyebrow: { th: '“กิ่งที่หัก”', en: '“The broken branch”' },
    situation: {
      th: ['คุณกำลังดูแลต้นไม้ต้นหนึ่ง', 'แล้วเผลอทำกิ่งเล็ก ๆ หัก'],
      en: ['You are caring for a plant', 'when you accidentally break one of its small branches.'],
    },
    title: { th: 'คุณจะคิดอะไรเป็นอย่างแรก?', en: 'What is your first thought?' },
    options: [
      { id: 'A', emotion: 'Anxiety', text: { th: 'คราวหน้าคงต้องระวังให้มากกว่านี้', en: 'I need to be more careful next time.' } },
      { id: 'B', emotion: 'Hope', text: { th: 'ไม่เป็นไร ลองดูว่ามันยังโตต่อได้ไหม', en: 'It is okay. Let us see whether it can keep growing.' } },
      { id: 'C', emotion: 'Sadness', text: { th: 'เสียใจจัง เราตั้งใจดูแลมันมากเลย', en: 'I feel awful. I tried so hard to care for it.' } },
      { id: 'D', emotion: 'Serenity', text: { th: 'เอาล่ะ ค่อย ๆ จัดการไปทีละอย่างแล้วกัน', en: 'All right. I will handle this one step at a time.' } },
      { id: 'E', emotion: 'Frustration', text: { th: 'โอ๊ย ทำไมต้องมาเกิดเรื่องตอนนี้ด้วยนะ', en: 'Why did this have to happen now?' } },
    ],
  },
  4: {
    eyebrow: { th: '“ทางแยก”', en: '“The crossroads”' },
    situation: {
      th: ['คุณเดินมาเจอทางแยก', 'ไม่มีป้ายบอกว่าทางไหนจะพาไปถึงสวนดอกไม้', 'และไม่มีใครอยู่แถวนี้'],
      en: ['You reach a fork in the path.', 'There is no sign showing which way leads to the flower garden,', 'and no one else is around.'],
    },
    title: { th: 'คุณจะเลือกอย่างไร?', en: 'How would you choose?' },
    options: [
      { id: 'A', emotion: 'Hope', text: { th: 'เลือกทางหนึ่งก่อน แล้วค่อยดูว่าจะเจออะไร', en: 'Choose one path and see where it leads.' } },
      { id: 'B', emotion: 'Serenity', text: { th: 'ขอดูรอบ ๆ ก่อน แล้วค่อยตัดสินใจ', en: 'Look around first, then make a decision.' } },
      { id: 'C', emotion: 'Anxiety', text: { th: 'เลือกทางที่ดูปลอดภัยที่สุดไว้ก่อน', en: 'Take the path that looks safest.' } },
      { id: 'D', emotion: 'Frustration', text: { th: 'ขอหยุดคิดสักพัก ยังไม่อยากรีบเลือก', en: 'Stop and think for a while. I do not want to rush.' } },
      { id: 'E', emotion: 'Sadness', text: { th: 'ไม่รู้ว่าจะเจออะไรข้างหน้า เลยไม่แน่ใจว่าจะไปต่อดีไหม', en: 'I do not know what lies ahead, so I am not sure I should continue.' } },
    ],
  },
  5: {
    eyebrow: { th: '“ดอกไม้ที่ยังไม่บาน”', en: '“The flower yet to bloom”' },
    situation: {
      th: ['คุณเจอดอกไม้ดอกหนึ่ง แต่มันยังไม่บาน', 'คุณไม่รู้ว่าต้องรออีกนานแค่ไหน', 'แต่มีคนบอกว่า'],
      en: ['You find a flower that has not bloomed yet.', 'You do not know how much longer it will take,', 'but someone tells you:'],
    },
    quote: { th: '“ถ้าดูแลมันดี ๆ สักวันมันจะบาน”', en: '“If you care for it well, one day it will bloom.”' },
    title: { th: 'คุณจะทำอย่างไร?', en: 'What would you do?' },
    options: [
      { id: 'A', emotion: 'Hope', text: { th: 'ดูแลมันต่อไป แล้วรอดูว่ามันจะเป็นยังไง', en: 'Keep caring for it and see what happens.' } },
      { id: 'B', emotion: 'Anxiety', text: { th: 'แล้วถ้ามันไม่บานขึ้นมาล่ะ?', en: 'But what if it never blooms?' } },
      { id: 'C', emotion: 'Serenity', text: { th: 'ค่อย ๆ ดูแลไป ไม่ต้องรีบก็ได้', en: 'Care for it gently. There is no need to rush.' } },
      { id: 'D', emotion: 'Frustration', text: { th: 'รอมาตั้งนานแล้ว ทำไมมันยังไม่บานอีกนะ', en: 'I have waited so long. Why has it not bloomed yet?' } },
      { id: 'E', emotion: 'Sadness', text: { th: 'รู้สึกกังวล ไม่รู้ว่าควรทำอะไรต่อดี', en: 'I feel uneasy and do not know what to do next.' } },
    ],
  },
  6: {
    eyebrow: { th: '“วันที่เหนื่อย”', en: '“A tiring day”' },
    situation: {
      th: ['หลังจากเดินในสวนมาทั้งวัน', 'คุณเจอม้านั่งตัวหนึ่งใต้ต้นไม้', 'ไม่มีใครอยู่ตรงนั้น และตอนนี้คุณไม่มีอะไรต้องรีบทำ'],
      en: ['After walking through the garden all day,', 'you find a bench beneath a tree.', 'No one else is there, and nothing needs your attention right now.'],
    },
    title: { th: 'คุณจะ...', en: 'You would…' },
    options: [
      { id: 'A', emotion: 'Serenity', text: { th: 'นั่งพักก่อน แล้วปล่อยตัวเองอยู่กับช่วงเวลานี้', en: 'Sit down, rest, and let yourself be in this moment.' } },
      { id: 'B', emotion: 'Anxiety', text: { th: 'คิดว่าพรุ่งนี้จะมีอะไรให้ทำอีกเยอะเลย', en: 'Think about how much there will be to do tomorrow.' } },
      { id: 'C', emotion: 'Hope', text: { th: 'รู้สึกว่าได้พักแล้ว พรุ่งนี้น่าจะเริ่มใหม่ได้', en: 'Feel rested and ready to begin again tomorrow.' } },
      { id: 'D', emotion: 'Sadness', text: { th: 'วันนี้เหนื่อยจนไม่อยากทำอะไรเลย', en: 'Feel too tired to do anything after today.' } },
      { id: 'E', emotion: 'Frustration', text: { th: 'นั่งเฉย ๆ แต่ก็ยังคิดถึงเรื่องที่เกิดขึ้นมาตลอดทั้งวัน', en: 'Sit still, but keep replaying everything that happened today.' } },
    ],
  },
  7: {
    eyebrow: { th: '“ก่อนที่คุณจะกลับ”', en: '“Before you leave”' },
    situation: {
      th: ['ก่อนที่คุณจะออกจากสวน', 'คุณหันกลับไปมองดอกไม้ของตัวเอง', 'คุณยังไม่รู้ว่าพรุ่งนี้มันจะเปลี่ยนไปอย่างไร', 'แต่ตอนนี้...'],
      en: ['Before leaving the garden,', 'you turn back to look at your flower.', 'You do not know how it will change tomorrow,', 'but for now…'],
    },
    title: { th: 'คุณอยากทิ้งอะไรไว้ให้ดอกไม้นี้?', en: 'What would you like to leave with this flower?' },
    options: [
      { id: 'A', emotion: 'Hope', text: { th: '“ไว้เจอกันพรุ่งนี้นะ”', en: '“I will see you tomorrow.”' } },
      { id: 'B', emotion: 'Anxiety', text: { th: '“หวังว่าทุกอย่างจะเป็นไปด้วยดี”', en: '“I hope everything will be all right.”' } },
      { id: 'C', emotion: 'Serenity', text: { th: '“ไม่ต้องรีบ ค่อย ๆ โตไปก็ได้”', en: '“There is no need to rush. Grow at your own pace.”' } },
      { id: 'D', emotion: 'Sadness', text: { th: '“เสียดายที่วันนี้ยังไม่เห็นอะไรเปลี่ยนแปลง”', en: '“I wish I could have seen something change today.”' } },
      { id: 'E', emotion: 'Frustration', text: { th: '“ถ้ามีอะไรเกิดขึ้น ฉันจะกลับมาดูอีกครั้ง”', en: '“If anything happens, I will come back and check again.”' } },
    ],
  },
}

