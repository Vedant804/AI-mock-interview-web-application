"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/utils/db";
import { UserAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Clock, Star, Briefcase } from 'lucide-react';
import Link from 'next/link';

function PreviousInterviews() {
  const [interviews, setInterviews] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      // Get all mock interviews for the current user
      const mockInterviews = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress));

      // Get feedback data for each interview
      const interviewsWithFeedback = await Promise.all(
        mockInterviews.map(async (interview) => {
          const feedbackData = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interview.mockId));

          // Calculate average rating
          const averageRating = feedbackData.length > 0
            ? (feedbackData.reduce((sum, item) => {
                const normalizedRating = Math.min(Math.max(Number(item.rating), 1), 10);
                return sum + normalizedRating;
              }, 0) / feedbackData.length).toFixed(1)
            : 0;

          return {
            ...interview,
            feedbackData,
            averageRating,
            totalQuestions: feedbackData.length,
            date: new Date(interview.createdAt).toLocaleDateString()
          };
        })
      );

      setInterviews(interviewsWithFeedback);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  return (
    <div className="col-span-full">
      <h2 className="text-2xl font-bold mb-6">Previous Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <Link 
            href={`/dashboard/interview/${interview.mockId}/feedback`}
            key={interview.mockId}
            className="block"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">{interview.jobPosition}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    <span className="font-semibold">{interview.averageRating}/10</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{interview.date}</span>
                  </div>
                  <p>Experience Level: {interview.jobExperience}</p>
                  <p>Questions Answered: {interview.totalQuestions}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PreviousInterviews; 