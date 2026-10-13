import { useState, type FormEvent } from 'react'
import {
  getEmotionResult,
  type Emotion,
} from '../data/emotionResults'
import type { Language } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'
import daisyImage from '../assets/pict/daisy-transparent.webp'
import dandelionImage from '../assets/pict/dandelion-transparent.webp'
import lavenderImage from '../assets/pict/lavender-transparent.webp'
import stripedCarnationImage from '../assets/pict/striped-carnation-transparent.webp'
import sunflowerImage from '../assets/pict/sunflower-transparent.webp'
import {
  submitFlowerNickname,
  submitResultFeedback,
} from '../services/backendApi'
import './ResultPage.css'

type ResultPageProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  emotion: Emotion
  submissionId: string
  onLog?: (
    eventType: 'button_click' | 'form_submit',
    target: string,
    details?: Record<string, string | number | boolean | null>,
  ) => void
}

const flowerImages: Record<Emotion, string> = {
  Hope: sunflowerImage,
  Anxiety: lavenderImage,
  Serenity: daisyImage,
  Sadness: stripedCarnationImage,
  Frustration: dandelionImage,
}

const FLOWER_NICKNAME_MAX_LENGTH = 7

function ResultPage({
  language,
  onLanguageChange,
  emotion,
  submissionId,
  onLog,
}: ResultPageProps) {
  const isThai = language === 'th'
  const result = getEmotionResult(emotion, language)
  const [flowerNickname, setFlowerNickname] = useState('')
  const [nicknameStatus, setNicknameStatus] = useState<
    'idle' | 'submitting' | 'submitted' | 'error'
  >('idle')
  const [feedback, setFeedback] = useState('')
  const [feedbackStatus, setFeedbackStatus] = useState<
    'idle' | 'submitting' | 'submitted' | 'error'
  >('idle')

  const submitNickname = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedNickname = flowerNickname.trim()

    if (!normalizedNickname || nicknameStatus === 'submitting') {
      return
    }

    setNicknameStatus('submitting')
    onLog?.('button_click', 'nickname-submit', {
      nicknameLength: normalizedNickname.length,
    })

    try {
      const status = await submitFlowerNickname({
        action: 'nickname',
        submissionId,
        flowerNickname: normalizedNickname,
        nicknameSubmittedAt: new Date().toISOString(),
      })

      setNicknameStatus(status === 'submitted' ? 'submitted' : 'error')
      onLog?.('form_submit', 'nickname-submitted', {
        status,
        nicknameLength: normalizedNickname.length,
      })
    } catch {
      setNicknameStatus('error')
      onLog?.('form_submit', 'nickname-error', {
        nicknameLength: normalizedNickname.length,
      })
    }
  }

  const submitFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedFeedback = feedback.trim()

    if (!normalizedFeedback || feedbackStatus === 'submitting') {
      return
    }

    setFeedbackStatus('submitting')
    onLog?.('button_click', 'feedback-submit', {
      feedbackLength: normalizedFeedback.length,
    })

    try {
      const status = await submitResultFeedback({
        action: 'feedback',
        submissionId,
        feedback: normalizedFeedback,
        feedbackSubmittedAt: new Date().toISOString(),
      })

      setFeedbackStatus(status === 'submitted' ? 'submitted' : 'error')
      onLog?.('form_submit', 'feedback-submitted', {
        status,
        feedbackLength: normalizedFeedback.length,
      })
    } catch {
      setFeedbackStatus('error')
      onLog?.('form_submit', 'feedback-error', {
        feedbackLength: normalizedFeedback.length,
      })
    }
  }

  return (
    <main className="result-page">
      <div className="result-hero">
        <section
          className="result-card"
          aria-labelledby="result-title"
          data-emotion={emotion.toLowerCase()}
        >
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
          <img
            className="result-flower-image"
            src={flowerImages[emotion]}
            alt={result.flower}
          />

          <p className="result-eyebrow">
            {isThai ? 'ดอกไม้ของคุณกำลังบาน' : 'Your flower is blooming'}
          </p>
          <p className="result-flower-name">{result.flower}</p>
          <h1 id="result-title">“{result.resultTitle}”</h1>

          <p className="result-description">{result.reason}</p>

          <div className="result-message">
            <p>
              {isThai
                ? 'วันนี้ดอกไม้ของคุณมีบางอย่างอยากบอกว่า...'
                : 'Today, your flower has something to tell you…'}
            </p>
            <blockquote>“{result.message}”</blockquote>
          </div>

          <div className="result-emotion">
            <span>Emotional State</span>
            <strong>{emotion}</strong>
          </div>

          <form className="result-flower-nickname" onSubmit={submitNickname}>
            <label htmlFor="flower-nickname">
              {isThai ? 'ตั้งชื่อเล่นให้ดอกไม้ของคุณ' : 'Give your flower a nickname'}
            </label>
            <input
              id="flower-nickname"
              name="flowerNickname"
              type="text"
              value={flowerNickname}
              onChange={(event) => {
                setFlowerNickname(event.target.value)
                if (nicknameStatus === 'error') {
                  setNicknameStatus('idle')
                }
              }}
              placeholder={isThai ? 'พิมพ์ชื่อเล่นของดอกไม้...' : 'Type a flower nickname…'}
              maxLength={FLOWER_NICKNAME_MAX_LENGTH}
              autoComplete="off"
              disabled={nicknameStatus === 'submitted'}
            />
            <div className="result-flower-nickname__footer">
              <span>
                {flowerNickname.length}/{FLOWER_NICKNAME_MAX_LENGTH}
              </span>
              <button
                type="submit"
                disabled={
                  !flowerNickname.trim() ||
                  nicknameStatus === 'submitting' ||
                  nicknameStatus === 'submitted'
                }
              >
                {nicknameStatus === 'submitting'
                  ? isThai ? 'กำลังส่ง' : 'Sending'
                  : nicknameStatus === 'submitted'
                    ? isThai ? 'ส่งแล้ว' : 'Sent'
                    : isThai ? 'ส่งข้อความ' : 'Submit'}
              </button>
            </div>
            <p className="result-flower-nickname__status" aria-live="polite">
              {nicknameStatus === 'submitted' &&
                (isThai ? 'ขอบคุณสำหรับชื่อเล่นของดอกไม้' : 'Thank you for naming your flower.')}
              {nicknameStatus === 'error' &&
                (isThai ? 'ยังบันทึกชื่อเล่นไม่ได้ กรุณาลองใหม่อีกครั้ง' : 'We could not save the nickname. Please try again.')}
            </p>
          </form>

          <div className="result-sparkles" aria-hidden="true">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </section>
      </div>

      <section
        id="result-feedback"
        className="result-feedback"
        aria-labelledby="result-feedback-title"
      >
        <h2 id="result-feedback-title">
          {isThai ? 'ข้อความนี้ตรงกับคุณไหม?' : 'Does this message resonate with you?'}
        </h2>
        <p>
          {isThai
            ? 'บอกเราได้ว่าความหมายและข้อความของดอกไม้นี้สะท้อนความรู้สึกของคุณมากน้อยแค่ไหน'
            : 'Tell us how closely this flower and its message reflect the way you feel.'}
        </p>

        <form onSubmit={submitFeedback}>
          <label htmlFor="result-feedback-message">
            {isThai ? 'ความคิดเห็นของคุณ' : 'Your feedback'}
          </label>
          <textarea
            id="result-feedback-message"
            name="resultFeedback"
            value={feedback}
            onChange={(event) => {
              setFeedback(event.target.value)
              if (feedbackStatus === 'error') {
                setFeedbackStatus('idle')
              }
            }}
            placeholder={isThai ? 'พิมพ์ความคิดเห็นของคุณ...' : 'Type your feedback…'}
            maxLength={500}
            rows={4}
            disabled={feedbackStatus === 'submitted'}
          />

          <div className="result-feedback__footer">
            <span>{feedback.length}/500</span>
            <button
              type="submit"
              disabled={
                !feedback.trim() ||
                feedbackStatus === 'submitting' ||
                feedbackStatus === 'submitted'
              }
            >
              {feedbackStatus === 'submitting'
                ? isThai ? 'กำลังส่ง' : 'Sending'
                : feedbackStatus === 'submitted'
                  ? isThai ? 'ส่งแล้ว' : 'Sent'
                  : isThai ? 'ส่งข้อความ' : 'Submit'}
            </button>
          </div>
        </form>

        <p className="result-feedback__status" aria-live="polite">
          {feedbackStatus === 'submitted' &&
            (isThai ? 'ขอบคุณสำหรับความคิดเห็นของคุณ' : 'Thank you for your feedback.')}
          {feedbackStatus === 'error' &&
            (isThai ? 'ยังส่งความคิดเห็นไม่ได้ กรุณาลองใหม่อีกครั้ง' : 'We could not send your feedback. Please try again.')}
        </p>
      </section>
    </main>
  )
}

export default ResultPage
