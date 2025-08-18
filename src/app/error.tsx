'use client'
import { useEffect } from "react"
import { Button } from "./_global/components/Buttons"
export default function Error({
    error,
    reset
}) {
    useEffect(()=>{
        console.log('error', error)

    }, [error])

    return (
        <>
            <h2>{error?.message}</h2>
            <Button type="button" onClick={()=> reset()}>다시 입력     
            </Button>
        </>
    )
}
