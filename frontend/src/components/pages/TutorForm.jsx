import React, { useState, useEffect, useRef } from 'react'
import './TutorForm.css'

const TutorForm = () => {
  const availableSubjects = [
    { label: 'Math', value: 'math' },
    { label: 'Science', value: 'science' },
    { label: 'Biology', value: 'biology' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Physics', value: 'physics' },
    { label: 'English', value: 'english' },
    { label: 'French', value: 'french' },
    { label: 'Computer Science', value: 'computer' },
    { label: 'Business', value: 'business' },
    { label: 'Accounting', value: 'accounting' },
    { label: 'Economics', value: 'economics' },
    { label: 'History', value: 'history' },
    { label: 'Geography', value: 'geography' },
    { label: 'Civics and Careers', value: 'civics' },
    { label: 'Law', value: 'law' },
    { label: 'Visual Arts', value: 'art' },
    { label: 'Music', value: 'music' },
    { label: 'Drama', value: 'drama' },
    { label: 'Technological Studies', value: 'tech' },
    { label: 'Health & Phys Ed', value: 'health' }
  ]

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  const [formData, setFormData] = useState({ subjects: [] })
  const [availabilities, setAvailabilities] = useState([
    { day: '', startTime: '', endTime: '' }
  ])

  const [subjectInput, setSubjectInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const autoCompleteRef = useRef()

  useEffect(() => {
    if (subjectInput.trim() !== '') {
      const filtered = availableSubjects.filter(
        subject =>
          subject.label.toLowerCase().includes(subjectInput.toLowerCase()) &&
          !formData.subjects.includes(subject.value)
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [subjectInput, formData.subjects])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (autoCompleteRef.current && !autoCompleteRef.current.contains(e.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addSubject = (subject) => {
    if (!formData.subjects.includes(subject.value)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject.value]
      }))
    }
    setSubjectInput('')
    setSuggestions([])
  }

  const handleSubjectKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (suggestions.length > 0) {
        addSubject(suggestions[0])
      } else {
        const exactMatch = availableSubjects.find(
          sub => sub.label.toLowerCase() === subjectInput.toLowerCase()
        )
        if (exactMatch) {
          addSubject(exactMatch)
        }
      }
    }
  }

  const removeSubject = (subjectValue) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(value => value !== subjectValue)
    }))
  }

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target
    const newAvailabilities = [...availabilities]
    newAvailabilities[index][name] = value
    setAvailabilities(newAvailabilities)
  }

  const addAvailability = () => {
    setAvailabilities([...availabilities, { day: '', startTime: '', endTime: '' }])
  }

  const removeAvailability = index => {
    const newAvailabilities = availabilities.filter((_, i) => i !== index)
    setAvailabilities(newAvailabilities)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const completeFormData = {
      ...formData,
      availabilities: availabilities
    }
    console.log('Form submitted:', completeFormData)
  }

  const selectedSubjects = formData.subjects
    .map(value => availableSubjects.find(sub => sub.value === value))
    .filter(Boolean)

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h1 className="form-title">Tutor Registration</h1>

        <div className="form-group">
          <h3>Select Subjects:</h3>
          <div className="multi-select-container" ref={autoCompleteRef}>
            <div className="selected-tokens">
              {selectedSubjects.map(subject => (
                <span key={subject.value} className="token">
                  {subject.label}
                  <button
                    type="button"
                    className="remove-token"
                    onClick={() => removeSubject(subject.value)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="subject-input"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={handleSubjectKeyDown}
              placeholder="Search subjects..."
            />
            {suggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {suggestions.map(subject => (
                  <li
                    key={subject.value}
                    className="suggestion-item"
                    onClick={() => addSubject(subject)}
                  >
                    {subject.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-group">
          <h3>Set Your Weekly Availability:</h3>
          {availabilities.map((availability, index) => (
            <div key={index} className="availability-row">
              <div className="select-wrapper">
                <select
                  name="day"
                  value={availability.day}
                  onChange={e => handleAvailabilityChange(index, e)}
                  required
                >
                  <option value="">Select day</option>
                  {weekDays.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="time"
                name="startTime"
                value={availability.startTime}
                onChange={e => handleAvailabilityChange(index, e)}
                required
                className="time-input"
              />
              <input
                type="time"
                name="endTime"
                value={availability.endTime}
                onChange={e => handleAvailabilityChange(index, e)}
                required
                className="time-input"
              />
              {availabilities.length > 1 && (
                <button
                  type="button"
                  className="btn remove-btn"
                  onClick={() => removeAvailability(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn add-btn"
            onClick={addAvailability}
          >
            Add Availability
          </button>
        </div>

        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default TutorForm
