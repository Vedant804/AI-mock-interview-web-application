"use client";
import useSpeechToText from "react-hook-speech-to-text";
import React, {useEffect,useState} from 'react'
import Webcam from "react-webcam"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";


function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const [userAnswer, setUserAnswer] = React.useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((result) =>
            setUserAnswer((prevAns) => prevAns + result?.transcript)
          );
      }, [results]);

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10)
        {
          UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording)
        {
          
          stopSpeechToText()
          
          
        }
        else{
          startSpeechToText();
        }
      }
      const UpdateUserAnswer=async()=>{

        console.log(userAnswer)
        setLoading(true);
        const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
          ",User Answer:"+userAnswer+",Analyze the user's answer and provide feedback in JSON format with the following fields: "+
          "1. rating: A number between 1-10 rating the overall answer quality "+
          "2. feedback: 3-5 lines of feedback about the answer content "+
          "3. fillerWords: A list of filler words detected (like 'um', 'uh', 'you know', 'like', 'okay', etc.) "+
          "4. fillerWordCount: The total count of filler words found "+
          "5. fillerWordFeedback: Specific feedback about the use of filler words and suggestions to reduce them";

          const result=await chatSession.sendMessage(feedbackPrompt);

          const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
          console.log(mockJsonResp);
          const JsonFeedbackResp=JSON.parse(mockJsonResp);
          const resp=await db.insert(UserAnswer)
          .values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback + "\n\nFiller Words Analysis:\n" + 
                    "Detected filler words: " + JsonFeedbackResp?.fillerWords?.join(", ") + "\n" +
                    "Total filler words: " + JsonFeedbackResp?.fillerWordCount + "\n" +
                    JsonFeedbackResp?.fillerWordFeedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
          })
          if(resp)
          {
            toast('User Answer recorded successfully')
            setUserAnswer('');
            setResults([]);
          }
          setResults([]);
          setLoading(false);
      }

  return (
    <div className="flex justify-cente items-center flex-col">
        <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Image src={'/webcam.png'} width={200} height={200} className="absolute" alt="webcam" priority/>
        <Webcam
        style={{ height: 250, width: "100%", zIndex: 10 }}
        mirrored={true}
        /> 
        </div> 
        <Button
        diasabled={loading}
        variant="outline" className="my-5"
        onClick={StartStopRecording}
        >
            {isRecording?
            <h2 className="text-red-600 flex gap-2">
                <Mic/>Stop Recording
            </h2>
            :
            'Record Answer'}</Button>
    </div>
    )
}

export default RecordAnswerSection