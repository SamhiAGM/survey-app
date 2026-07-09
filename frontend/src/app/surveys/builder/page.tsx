'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SurveyBuilder() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', type: 'Text', required: false }]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', type: 'Text', required: false }]);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const saveSurvey = async () => {
    try {
      await api.post('/surveys', { title, category, questions });
      alert('Survey saved successfully!');
      router.push('/dashboard');
    } catch (err) {
      alert('Failed to save survey');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Survey Builder</h1>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Survey Title</label>
            <input 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Dengue Field Inspection"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              placeholder="e.g. Public Health"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Questions</h2>
        {questions.map((q, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-md border mb-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Question {i + 1}</span>
            </div>
            <input 
              className="block w-full rounded-md border-gray-300 shadow-sm p-2 border" 
              value={q.questionText} 
              onChange={e => handleQuestionChange(i, 'questionText', e.target.value)}
              placeholder="Enter question text..."
            />
            <div className="flex gap-4">
              <select 
                className="block rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                value={q.type}
                onChange={e => handleQuestionChange(i, 'type', e.target.value)}
              >
                <option value="Text">Text</option>
                <option value="Number">Number</option>
                <option value="Radio">Radio Button</option>
                <option value="Checkbox">Checkbox</option>
                <option value="GPS">GPS Location</option>
                <option value="FileUpload">File Upload</option>
              </select>
              <label className="flex items-center text-sm text-gray-700">
                <input 
                  type="checkbox" 
                  className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={q.required}
                  onChange={e => handleQuestionChange(i, 'required', e.target.checked)}
                />
                Required
              </label>
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <button 
            onClick={addQuestion}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300 transition-colors"
          >
            + Add Question
          </button>
          <button 
            onClick={saveSurvey}
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition-colors"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
