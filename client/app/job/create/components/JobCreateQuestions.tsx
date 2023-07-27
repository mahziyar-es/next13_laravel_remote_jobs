'use client'
import { InputBasic, Sheet } from 'gamon-react'
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import { FaTrash } from "react-icons/fa";


export default function JobCreateQuestions(
    {questions, addQuestionHandler, removeQuestionsHandler}: {questions?:(Question)[], addQuestionHandler:(question:string)=>void, removeQuestionsHandler:(index:number)=>void}
) {
    


    const [sheetDisplay, setSheetDisplay] = useState(false)
    const [question, setQuestion] = useState('')
    const [mounted, setMounted] = useState(false);


    useEffect(()=>{
        setMounted(true)
    },[])

    const addQuestion = (e:FormEvent)=>{
        e.preventDefault();
        addQuestionHandler(question)
        setQuestion('')
    }

    const removeQuestion = (index:number)=>{
        removeQuestionsHandler(index)
    }

    return (
        <>
            <p className='mt-2 mb-2'> Add some questions that users should answer during apply </p>
            <button className='w-full mt-4 md:mt-0 md:w-2/5 bg-theme-4 p-2 rounded-md text-sm md:text-md flex items-center gap-1 text-center justify-center h-[45px]' onClick={()=>setSheetDisplay(true)}>
                <span>Add questions</span>
                <span className='p-1 text-theme-2'>{questions?.length}</span>
            </button>
            {mounted && createPortal(
                <Sheet displayModel={[sheetDisplay, setSheetDisplay]} title="Add questions">
                    <form onSubmit={addQuestion} className='flex gap-2'>
                        <InputBasic placeholder='Question' model={[question, setQuestion]} />
                        <button className='p-2 rounded bg-theme-4 text-sm'>Add</button>
                    </form>
                    <div className='mt-4'>
                        {questions?.map((question, index)=> (
                            <div key={index} className='border-b p-2 cursor-pointer flex items-center justify-between' onClick={()=>removeQuestion(index)}>
                                <span className='flex-1'>{question.text}</span>
                                <FaTrash className='text-red-400 ' onClick={()=>removeQuestion(index)} />
                            </div>
                        ) )}
                    </div>
                </Sheet>
            , document.body)}
        </>
    )
}
