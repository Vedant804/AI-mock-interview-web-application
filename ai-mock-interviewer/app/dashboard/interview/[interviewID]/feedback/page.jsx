"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { usePathname } from "next/navigation";
import { Trophy, Star, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const path = usePathname();
  const id = path.split("/")[3];

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, id));
    
    setFeedbackData(result);
    
    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => {
        const normalizedRating = Math.min(Math.max(Number(item.rating), 1), 10);
        return sum + normalizedRating;
      }, 0);
      
      const avgRating = (totalRating / result.length).toFixed(1);
      setAverageRating(avgRating);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-4'>
            <Trophy className='w-12 h-12 text-yellow-500' />
          </div>
          <h2 className='text-4xl font-bold text-green-600 mb-4'>Congratulations!</h2>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Here is your interview feedback</h2>
          
          <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100'>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <Star className='w-6 h-6 text-yellow-500' />
              <h2 className='text-2xl font-bold text-gray-800'>
                Overall Rating: <span className='text-green-600'>{averageRating}/10</span>
              </h2>
            </div>
            <p className='text-gray-600'>Based on {feedbackData.length} questions</p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className='max-w-4xl mx-auto space-y-6'>
        {feedbackData.map((item, index) => (
          <div key={index} className='bg-white rounded-xl shadow-md overflow-hidden'>
            {/* Question Header */}
            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold'>
                  Question {index + 1}
                </div>
                <div className='flex items-center gap-1 text-yellow-500'>
                  <Star className='w-4 h-4' />
                  <span className='font-semibold'>{Math.min(Math.max(Number(item.rating), 1), 10)}/10</span>
                </div>
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>{item.question}</h3>
            </div>

            {/* Answer Section */}
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Your Answer */}
                <div className='bg-green-50 rounded-lg p-4 border border-green-100'>
                  <div className='flex items-center gap-2 mb-3'>
                    <MessageSquare className='w-5 h-5 text-green-600' />
                    <h4 className='font-semibold text-green-700'>Your Answer</h4>
                  </div>
                  <p className='text-gray-700'>{item.userAns}</p>
                </div>

                {/* Correct Answer */}
                <div className='bg-blue-50 rounded-lg p-4 border border-blue-100'>
                  <div className='flex items-center gap-2 mb-3'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600' />
                    <h4 className='font-semibold text-blue-700'>Correct Answer</h4>
                  </div>
                  <p className='text-gray-700'>{item.correctAns}</p>
                </div>
              </div>

              {/* Feedback Section */}
              <div className='mt-6 bg-orange-50 rounded-lg p-4 border border-orange-100'>
                <div className='flex items-center gap-2 mb-3'>
                  <AlertCircle className='w-5 h-5 text-orange-600' />
                  <h4 className='font-semibold text-orange-700'>Feedback for Improvement</h4>
                </div>
                <p className='text-gray-700'>{item.feedback.split('\n\nFiller Words Analysis:')[0]}</p>
              </div>

              {/* Filler Words Analysis Section */}
              <div className='mt-6 bg-purple-50 rounded-lg p-4 border border-purple-100'>
                <div className='flex items-center gap-2 mb-3'>
                  <AlertCircle className='w-5 h-5 text-purple-600' />
                  <h4 className='font-semibold text-purple-700'>Filler Words Analysis</h4>
                </div>
                <div className='space-y-2'>
                  {item.feedback.split('\n\nFiller Words Analysis:')[1]?.split('\n').map((line, idx) => (
                    <p key={idx} className='text-gray-700'>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;