"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/utils/GeminiAiModel' // Ensure this file now contains Groq logic
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Precise Prompt for Groq: Forces a clean JSON array response
        const InputPrompt = `Job position: ${jobPosition}, Years of Experience: ${jobExperience}. Generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions and answers in JSON format. Return ONLY a JSON array of objects with "question" and "answer" fields. Do not include markdown backticks or extra text.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const rawText = result.response.text();

            // 2. Robust JSON Extraction: Handles both raw strings and markdown wraps
            let cleanJson = rawText
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            const startIndex = cleanJson.indexOf('[');
            const endIndex = cleanJson.lastIndexOf(']') + 1;
            
            if (startIndex !== -1 && endIndex !== -1) {
                cleanJson = cleanJson.slice(startIndex, endIndex);
            }

            // 3. Validation: Verify it's a valid JSON array before saving to DB
            const parsedData = JSON.parse(cleanJson);

            if (Array.isArray(parsedData)) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: cleanJson,
                        jobPosition: jobPosition,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY')
                    }).returning({ mockId: MockInterview.mockId });

                if (resp) {
                    setOpenDailog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
            alert("AI service is busy. Please try again in 10 seconds.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDailog(true)}
            >
                <h2 className='text-lg text-center'>Add New</h2>
            </div>
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about the Job Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2 className="mb-4">Add details about your Job position, and years of experience</h2>
                                    <div className='my-3'>
                                        <label className="block mb-2">Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label className="block mb-2">Years of experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="50" required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end mt-6'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <><LoaderCircle className='animate-spin mr-2' /> Generating</> 
                                            : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
